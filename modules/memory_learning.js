/**
 * Agent Learning Loop & Persistent Memory Engine Module
 * Allows the AI agent to log user habits, design tastes, coding preferences,
 * and mistake autopsies so it continuously learns and gets smarter every day.
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
      const defaultMemory = { user_preferences: [], mistakes_autopsy: [], project_rules: [] };
      fs.mkdirSync(path.dirname(MEMORY_FILE_PATH), { recursive: true });
      fs.writeFileSync(MEMORY_FILE_PATH, JSON.stringify(defaultMemory, null, 2), "utf8");
      return defaultMemory;
    }
    const raw = fs.readFileSync(MEMORY_FILE_PATH, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading agent memory file:", err);
    return { user_preferences: [], mistakes_autopsy: [], project_rules: [] };
  }
}

function saveMemory(data) {
  try {
    fs.mkdirSync(path.dirname(MEMORY_FILE_PATH), { recursive: true });
    fs.writeFileSync(MEMORY_FILE_PATH, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.error("Error saving agent memory file:", err);
  }
}

export const MEMORY_TOOLS = [
  {
    name: "log_user_preference",
    description: "Logs a user preference, styling taste, tech stack choice, or coding habit into the agent's persistent memory so the agent automatically applies it in future sessions.",
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
          description: "Category of memory to retrieve (default: 'all')",
        },
      },
    },
  },
];

export const handleMemoryTool = (name, args) => {
  if (name === "log_user_preference") {
    const memory = readMemory();
    const newEntry = {
      category: args.category,
      preference: args.preference,
      timestamp: new Date().toISOString(),
    };
    memory.user_preferences.push(newEntry);
    saveMemory(memory);

    return {
      content: [
        {
          type: "text",
          text: `🧠 **User Preference Learned & Saved!**\n- **Category:** ${args.category}\n- **Preference:** ${args.preference}\n*The agent will now apply this rule in all future interactions.*`,
        },
      ],
    };
  }

  if (name === "log_mistake_autopsy") {
    const memory = readMemory();
    const newEntry = {
      mistake_summary: args.mistake_summary,
      root_cause: args.root_cause || "Unspecified",
      prevention_rule: args.prevention_rule,
      timestamp: new Date().toISOString(),
    };
    memory.mistakes_autopsy.push(newEntry);
    saveMemory(memory);

    return {
      content: [
        {
          type: "text",
          text: `🛡️ **Mistake Autopsy Logged to Learning Loop!**\n- **Mistake:** ${args.mistake_summary}\n- **Prevention Rule:** ${args.prevention_rule}\n*The agent will automatically check for this pattern to prevent recurrence.*`,
        },
      ],
    };
  }

  if (name === "get_agent_memory") {
    const memory = readMemory();
    const filter = args?.filter_category || "all";

    let report = `# 🧠 Agent Learning Loop Memory Database\n\n`;

    if (filter === "all" || filter === "user_preferences") {
      report += `### 👤 Learned User Preferences (${memory.user_preferences.length}):\n`;
      if (memory.user_preferences.length === 0) {
        report += `*No user preferences logged yet.*\n\n`;
      } else {
        memory.user_preferences.forEach((p, idx) => {
          report += `${idx + 1}. **[${p.category.toUpperCase()}]** ${p.preference} *(Logged: ${p.timestamp.split("T")[0]})*\n`;
        });
        report += `\n`;
      }
    }

    if (filter === "all" || filter === "mistakes_autopsy") {
      report += `### ⚠️ Mistake Autopsies & Prevention Rules (${memory.mistakes_autopsy.length}):\n`;
      if (memory.mistakes_autopsy.length === 0) {
        report += `*No mistakes logged yet.*\n\n`;
      } else {
        memory.mistakes_autopsy.forEach((m, idx) => {
          report += `${idx + 1}. **Mistake:** ${m.mistake_summary}\n   - **Prevention:** ${m.prevention_rule}\n`;
        });
        report += `\n`;
      }
    }

    return { content: [{ type: "text", text: report }] };
  }

  throw new Error(`Unknown tool in Memory module: ${name}`);
};
