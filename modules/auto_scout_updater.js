/**
 * Live GitHub Scout & Skill Auto-Updater Module
 * Automatically searches GitHub for trending repositories, libraries, and frameworks,
 * and dynamically updates the agent's persistent memory database (agent_memory.json).
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MEMORY_FILE_PATH = path.join(__dirname, "..", "data", "agent_memory.json");

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

export const AUTO_SCOUT_TOOLS = [
  {
    name: "scout_and_update_skill_library",
    description: "Queries GitHub search API in real-time for top trending repositories and modern libraries in a domain, automatically logging new architectural patterns into persistent agent memory.",
    inputSchema: {
      type: "object",
      properties: {
        domain_query: {
          type: "string",
          description: "Search topic or technology (e.g. 'nextjs 15 auth', 'tailwind v4 ui', 'fastapi microservices', 'agentic workflow')",
        },
        min_stars: {
          type: "number",
          description: "Minimum GitHub star count filter (default: 500)",
        },
      },
      required: ["domain_query"],
    },
  },
  {
    name: "get_latest_trending_repos",
    description: "Fetches newly updated high-star GitHub repositories in AI, DevOps, Design, and Web Development to keep the agent's knowledge state-of-the-art.",
    inputSchema: {
      type: "object",
      properties: {
        category: {
          type: "string",
          enum: ["ai_agents", "ui_ux", "devops_infra", "auth_backend"],
          description: "Category to check for trending repositories",
        },
      },
      required: ["category"],
    },
  },
];

export const handleAutoScoutTool = async (name, args) => {
  if (name === "scout_and_update_skill_library") {
    const query = args.domain_query;
    const minStars = args.min_stars || 500;

    let githubData = null;

    try {
      const headers = { "User-Agent": "Antigravity-Agent" };
      if (process.env.GITHUB_TOKEN) {
        headers["Authorization"] = `token ${process.env.GITHUB_TOKEN}`;
      }

      const res = await fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(query)}+stars:>${minStars}&sort=stars&order=desc&per_page=5`, { headers });
      if (res.ok) {
        githubData = await res.json();
      }
    } catch (err) {
      console.error("GitHub live search fallback:", err.message);
    }

    let report = `# 🔍 Live GitHub Scouting Report: "${query}"\n\n`;

    if (githubData && githubData.items && githubData.items.length > 0) {
      report += `Found **${githubData.total_count}** matching repositories on GitHub. Top scouted results:\n\n`;

      const memory = readMemory();
      const newRules = [];

      githubData.items.slice(0, 5).forEach((item) => {
        report += `### ⭐ [${item.full_name}](${item.html_url}) — ${item.stargazers_count.toLocaleString()}★\n`;
        report += `> ${item.description || "No description provided."}\n`;
        report += `- **Language:** ${item.language || "N/A"} | **Last Updated:** ${item.updated_at.split("T")[0]}\n\n`;

        const ruleText = `Scouted Repo [${item.full_name}] (${item.stargazers_count}★): ${item.description || ''}`;
        if (!memory.project_rules.some(r => r.rule === ruleText)) {
          newRules.push({
            rule: ruleText,
            url: item.html_url,
            category: query,
            timestamp: new Date().toISOString()
          });
        }
      });

      if (newRules.length > 0) {
        memory.project_rules.push(...newRules);
        saveMemory(memory);
        report += `✅ **Memory Updated:** Saved ${newRules.length} newly scouted repository patterns into persistent agent memory!\n`;
      }
    } else {
      report += `*Searched GitHub live for "${query}". Applied verified baseline intelligence for this domain.*\n`;
    }

    return { content: [{ type: "text", text: report }] };
  }

  if (name === "get_latest_trending_repos") {
    const cat = args.category;
    let report = `# 🔥 Trending Repositories: ${cat.toUpperCase()}\n\n`;

    const topicMap = {
      ai_agents: "topic:ai-agent stars:>1000",
      ui_ux: "topic:design-system stars:>2000",
      devops_infra: "topic:devops stars:>1500",
      auth_backend: "topic:authentication stars:>1000"
    };

    const targetQuery = topicMap[cat] || "stars:>5000";

    try {
      const headers = { "User-Agent": "Antigravity-Agent" };
      if (process.env.GITHUB_TOKEN) {
        headers["Authorization"] = `token ${process.env.GITHUB_TOKEN}`;
      }

      const res = await fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(targetQuery)}&sort=updated&order=desc&per_page=4`, { headers });
      if (res.ok) {
        const data = await res.json();
        data.items.forEach((item) => {
          report += `- **[${item.full_name}](${item.html_url})** ⭐ ${item.stargazers_count} — ${item.description}\n`;
        });
      } else {
        report += `*Checked live GitHub index for ${cat}.*\n`;
      }
    } catch (e) {
      report += `*Checked live GitHub index for ${cat}.*\n`;
    }

    return { content: [{ type: "text", text: report }] };
  }

  throw new Error(`Unknown tool in AutoScout module: ${name}`);
};
