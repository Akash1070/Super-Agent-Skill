/**
 * 24-Hour Autonomous Background Scout Cron Engine
 * Runs non-blockingly on server bootup and every 24 hours thereafter to fetch trending repos
 * across Web, Mobile Apps (React Native, Expo, Flutter, iOS/Android), SaaS, AI Agents, UI/UX, Databases, Auth, DevOps, Performance, SEO/AEO/GEO, Monetization & Copywriting.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MEMORY_FILE_PATH = path.join(__dirname, "..", "data", "agent_memory.json");
const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;

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
  console.error("🔄 [24h Auto-Scout Cron] Querying GitHub live index for Mobile, Web, SEO/AEO/GEO & SaaS building blocks...");
  
  const productionCategories = [
    "topic:react-native stars:>1000",
    "topic:flutter stars:>2000",
    "topic:expo stars:>1000",
    "topic:saas-boilerplate stars:>500",
    "topic:fullstack-framework stars:>1000",
    "topic:ai-agent stars:>1000",
    "topic:design-system stars:>2000",
    "topic:devops stars:>1500",
    "topic:database-orm stars:>1500",
    "topic:authentication stars:>1000",
    "topic:web-vitals stars:>500",
    "topic:generative-engine-optimization stars:>50",
    "topic:answer-engine-optimization stars:>50",
    "topic:seo-audits stars:>100",
    "topic:copywriting-prompts stars:>100",
    "topic:monetization-pricing stars:>50",
    "topic:product-analytics stars:>500",
    "topic:free-for-dev stars:>50",
    "topic:public-apis stars:>500",
    "free-for-life stars:>50",
    "best-free-things stars:>50"
  ];

  const selectedQuery = productionCategories[Math.floor(Math.random() * productionCategories.length)];

  try {
    const headers = { "User-Agent": "Antigravity-Autonomous-Agent" };
    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `token ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(selectedQuery)}&sort=updated&order=desc&per_page=4`, { headers });
    if (res.ok) {
      const data = await res.json();
      const memory = readMemory();
      let addedCount = 0;

      data.items.forEach((item) => {
        const ruleText = `Auto-Scouted Production Tool [${item.full_name}] (${item.stargazers_count}★): ${item.description || "No description"}`;
        if (!memory.project_rules.some((r) => r.rule === ruleText)) {
          memory.project_rules.push({
            rule: ruleText,
            url: item.html_url,
            category: "24h_production_scout",
            timestamp: new Date().toISOString(),
          });
          addedCount++;
        }
      });

      if (addedCount > 0) {
        saveMemory(memory);
        console.error(`✅ [24h Auto-Scout Cron] Added ${addedCount} new mobile/web/SEO production tool rules to agent_memory.json!`);
      } else {
        console.error("ℹ️ [24h Auto-Scout Cron] Agent memory is up-to-date with latest scouted tools.");
      }
    }
  } catch (err) {
    console.error("⚠️ [24h Auto-Scout Cron] Background fetch skipped:", err.message);
  }
}

export function initAutonomousScoutCron() {
  setTimeout(() => {
    runAutonomousScout().catch((e) => console.error("Cron error:", e));
  }, 5000);

  setInterval(() => {
    runAutonomousScout().catch((e) => console.error("Cron error:", e));
  }, TWENTY_FOUR_HOURS_MS);
}
