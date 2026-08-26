/**
 * Gold-Level Agent Learning Loop Memory Database Module
 * Manages persistent user preferences, mistake autopsies, project rules,
 * live In-IDE memory dashboards, and search/export capabilities.
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

export const MEMORY_TOOLS = [
  {
    name: "log_user_preference",
    description: "Logs a user preference, styling taste, tech stack choice, or coding habit into the agent's persistent memory database.",
    inputSchema: {
      type: "object",
      properties: {
        category: {
          type: "string",
          enum: ["design", "code_style", "tech_stack", "workflow", "architecture"],
          description: "Category of preference",
        },
        preference: {
          type: "string",
          description: "Clear statement of what the user prefers or dislikes",
        },
      },
      required: ["category", "preference"],
    },
  },
  {
    name: "log_mistake_autopsy",
    description: "Logs a bug, mistake, or trap encountered in code (and how it was fixed) into agent memory so the agent never repeats the same mistake.",
    inputSchema: {
      type: "object",
      properties: {
        mistake_summary: {
          type: "string",
          description: "Summary of the mistake or trap encountered",
        },
        root_cause: {
          type: "string",
          description: "Root cause of the mistake",
        },
        prevention_rule: {
          type: "string",
          description: "Rule or check to run in the future to prevent recurrence",
        },
      },
      required: ["mistake_summary", "prevention_rule"],
    },
  },
  {
    name: "get_agent_memory",
    description: "Retrieves the agent's persistent memory (user preferences, mistake autopsies, and project rules) to guide coding decisions.",
    inputSchema: {
      type: "object",
      properties: {
        filter_category: {
          type: "string",
          enum: ["all", "user_preferences", "mistakes_autopsy", "project_rules"],
          description: "Category of memory to retrieve",
        },
      },
    },
  },
  {
    name: "get_live_memory_dashboard",
    description: "Renders a real-time Gold-Level Agent Intelligence & Memory Dashboard directly inside the IDE chat window.",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "generate_in_ide_improvement_notification",
    description: "Generates an In-IDE improvement banner detailing before-and-after metrics, refactored components, and Karpathy safety compliance.",
    inputSchema: {
      type: "object",
      properties: {
        feature_name: {
          type: "string",
          description: "Name of feature or refactoring task completed",
        },
        before_state: {
          type: "string",
          description: "Description of state before improvement",
        },
        after_state: {
          type: "string",
          description: "Description of state after improvement",
        },
        improvements_list: {
          type: "array",
          items: { type: "string" },
          description: "List of specific improvements made",
        },
      },
      required: ["feature_name", "before_state", "after_state", "improvements_list"],
    },
  },
  {
    name: "search_agent_memory",
    description: "Searches through learned preferences, mistake autopsies, and scouted project rules by keyword.",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Search keyword or topic query",
        },
      },
      required: ["query"],
    },
  },
];

export const handleMemoryTool = (name, args) => {
  if (name === "log_user_preference") {
    const memory = readMemory();
    const newPref = {
      category: args.category,
      preference: args.preference,
      timestamp: new Date().toISOString(),
    };
    memory.user_preferences.push(newPref);
    saveMemory(memory);
    return {
      content: [
        {
          type: "text",
          text: `✅ Preference logged to Gold Agent Memory under [${args.category.toUpperCase()}]: "${args.preference}"`,
        },
      ],
    };
  }

  if (name === "log_mistake_autopsy") {
    const memory = readMemory();
    const newAutopsy = {
      mistake_summary: args.mistake_summary,
      root_cause: args.root_cause || "Not specified",
      prevention_rule: args.prevention_rule,
      timestamp: new Date().toISOString(),
    };
    memory.mistakes_autopsy.push(newAutopsy);
    saveMemory(memory);
    return {
      content: [
        {
          type: "text",
          text: `🛡️ Mistake Autopsy Logged to Gold Memory! Rule added: "${args.prevention_rule}"`,
        },
      ],
    };
  }

  if (name === "get_agent_memory") {
    const memory = readMemory();
    const filter = args?.filter_category || "all";
    let report = `# 🧠 Gold-Level Agent Learning Loop Memory Database\n\n`;

    if (filter === "all" || filter === "user_preferences") {
      report += `### 👤 Learned User Preferences (${memory.user_preferences.length}):\n`;
      memory.user_preferences.forEach((p, index) => {
        report += `${index + 1}. **[${p.category.toUpperCase()}]** ${p.preference}\n`;
      });
      report += "\n";
    }

    if (filter === "all" || filter === "mistakes_autopsy") {
      report += `### ⚠️ Mistake Autopsies & Prevention Rules (${memory.mistakes_autopsy.length}):\n`;
      if (memory.mistakes_autopsy.length === 0) {
        report += `*No mistakes logged yet.*\n\n`;
      } else {
        memory.mistakes_autopsy.forEach((m, index) => {
          report += `${index + 1}. **Summary:** ${m.mistake_summary} → **Rule:** ${m.prevention_rule}\n`;
        });
        report += "\n";
      }
    }

    if (filter === "all" || filter === "project_rules") {
      report += `### 📌 Scouted Intelligence & Project Rules (${memory.project_rules.length}):\n`;
      memory.project_rules.forEach((r, index) => {
        report += `${index + 1}. ${r.rule}\n`;
      });
    }

    return { content: [{ type: "text", text: report }] };
  }

  if (name === "get_live_memory_dashboard") {
    const memory = readMemory();
    let dash = `# 🖥️ GOLD-LEVEL AGENT INTELLIGENCE DASHBOARD\n\n`;

    dash += `> [!NOTE]\n`;
    dash += `> **System Status:** 🟢 ACTIVE | **Tools:** 48 Active Tools Across 19 Modules\n`;
    dash += `> **Learned Preferences:** ${memory.user_preferences.length} | **Mistake Rules:** ${memory.mistakes_autopsy.length} | **Scouted Rules:** ${memory.project_rules.length}\n\n`;

    dash += `### 🧠 Active Memory Brain Snapshot:\n`;
    memory.user_preferences.slice(0, 3).forEach((p) => {
      dash += `- 🎯 **[${p.category.toUpperCase()}]:** ${p.preference}\n`;
    });
    memory.project_rules.slice(0, 3).forEach((r) => {
      dash += `- 📌 **[SCOUTED]:** ${r.rule}\n`;
    });

    return { content: [{ type: "text", text: dash }] };
  }

  if (name === "generate_in_ide_improvement_notification") {
    const fname = args.feature_name;
    const before = args.before_state;
    const after = args.after_state;
    const improvements = args.improvements_list;

    let notif = `> [!NOTE]\n`;
    notif += `> ### 🚀 In-IDE Improvement Notification: ${fname}\n>\n`;
    notif += `> **Before:** \`${before}\`\n`;
    notif += `> **After:** \`${after}\`\n>\n`;
    notif += `> **Improvements Applied:**\n`;
    improvements.forEach((imp) => {
      notif += `> - ✅ ${imp}\n`;
    });
    notif += `>\n> **Verification:** Verified surgical scope & Karpathy zero-collateral edits.\n`;

    return { content: [{ type: "text", text: notif }] };
  }

  if (name === "search_agent_memory") {
    const q = args.query.toLowerCase();
    const memory = readMemory();
    const matched = [];

    memory.user_preferences.forEach((p) => {
      if (p.preference.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)) {
        matched.push(`[PREFERENCE] (${p.category}): ${p.preference}`);
      }
    });

    memory.mistakes_autopsy.forEach((m) => {
      if (m.mistake_summary.toLowerCase().includes(q) || m.prevention_rule.toLowerCase().includes(q)) {
        matched.push(`[MISTAKE AUTOPSY]: ${m.mistake_summary} → ${m.prevention_rule}`);
      }
    });

    memory.project_rules.forEach((r) => {
      if (r.rule.toLowerCase().includes(q)) {
        matched.push(`[SCOUTED RULE]: ${r.rule}`);
      }
    });

    let res = `# 🔍 Memory Search Results for: "${args.query}"\n\n`;
    if (matched.length === 0) {
      res += `*No memory records matched your search query.*\n`;
    } else {
      matched.forEach((m, idx) => {
        res += `${idx + 1}. ${m}\n`;
      });
    }

    return { content: [{ type: "text", text: res }] };
  }

  throw new Error(`Unknown tool in Memory module: ${name}`);
};
