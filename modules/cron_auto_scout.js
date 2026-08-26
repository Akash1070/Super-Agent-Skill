/**
 * 24-Hour Autonomous Background Scout Cron Engine
 * Runs non-blockingly on server bootup and every 24 hours thereafter to fetch trending repos
 * and automatically update agent_memory.json in real-time.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MEMORY_FILE_PATH = path.join(__dirname, "..", "data", "agent_memory.json");
const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000; // 86400000 ms

function readMemory() {
  try {
    if (!fs.existsSync(MEMORY_FILE_PATH)) {
      return { user_preferences: [], mistakes_autopsy: [], project_rules: [] };
    }
    return JSON.parse(fs.readFileSync(MEMORY_FILE_PATH, "utf8"));
  } catch (e) {
    return { user_preferences: [], mistakes_autopsy: [], project_rules: [] };
  }
}

function saveMemory(data) {
  try {
    fs.mkdirSync(path.dirname(MEMORY_FILE_PATH), { recursive: true });
    fs.writeFileSync(MEMORY_FILE_PATH, JSON.stringify(data, null, 2), "utf8");
  } catch (e) {
    console.error("Error writing memory file:", e);
  }
}

export async function runAutonomousScout() {
  console.error("🔄 [24h Auto-Scout Cron] Querying GitHub live index for trending repositories...");
  const categories = ["topic:ai-agent stars:>1000", "topic:design-system stars:>2000", "topic:devops stars:>1500"];
  const selectedQuery = categories[Math.floor(Math.random() * categories.length)];

  try {
    const headers = { "User-Agent": "Antigravity-Autonomous-Agent" };
    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `token ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(selectedQuery)}&sort=updated&order=desc&per_page=3`, { headers });
    if (res.ok) {
      const data = await res.json();
      const memory = readMemory();
      let addedCount = 0;

      data.items.forEach((item) => {
        const ruleText = `Auto-Scouted [${item.full_name}] (${item.stargazers_count}★): ${item.description || "No description"}`;
        if (!memory.project_rules.some((r) => r.rule === ruleText)) {
          memory.project_rules.push({
            rule: ruleText,
            url: item.html_url,
            category: "24h_cron_scout",
            timestamp: new Date().toISOString(),
          });
          addedCount++;
        }
      });

      if (addedCount > 0) {
        saveMemory(memory);
        console.error(`✅ [24h Auto-Scout Cron] Added ${addedCount} new trending repository rules to agent_memory.json!`);
      } else {
        console.error("ℹ️ [24h Auto-Scout Cron] Agent memory is already up-to-date with latest scouted repos.");
      }
    }
  } catch (err) {
    console.error("⚠️ [24h Auto-Scout Cron] Background fetch skipped:", err.message);
  }
}

export function initAutonomousScoutCron() {
  // Run once non-blockingly after 5 seconds of server startup
  setTimeout(() => {
    runAutonomousScout().catch((e) => console.error("Cron error:", e));
  }, 5000);

  // Schedule to repeat every 24 hours
  setInterval(() => {
    runAutonomousScout().catch((e) => console.error("Cron error:", e));
  }, TWENTY_FOUR_HOURS_MS);
}
