#!/usr/bin/env node

import { handleAutoScoutTool } from "../modules/auto_scout_updater.js";
import { handleMemoryTool } from "../modules/memory_learning.js";

const args = process.argv.slice(2);
const command = args[0];

if (!command || command === "help" || command === "--help") {
  console.log(`
🚀 Super Agent Skill CLI — Created by Akash Kumar Jha

Usage:
  npx super-agent-skill scout <query>     Run a live GitHub scout scan for any topic
  npx super-agent-skill memory            Print agent memory statistics and rules
  npx super-agent-skill start             Start stdio MCP server

Examples:
  npx super-agent-skill scout "nextjs 15 auth"
  npx super-agent-skill scout "react native UI"
  npx super-agent-skill memory
`);
  process.exit(0);
}

if (command === "scout") {
  const query = args.slice(1).join(" ") || "ai agent";
  console.log(`🔍 Executing live GitHub scout for "${query}"...\n`);
  handleAutoScoutTool("scout_and_update_skill_library", { domain_query: query })
    .then((res) => {
      console.log(res.content[0].text);
      process.exit(0);
    })
    .catch((err) => {
      console.error("Scout failed:", err);
      process.exit(1);
    });
} else if (command === "memory") {
  const memoryRes = handleMemoryTool("get_agent_memory", { filter_category: "all" });
  console.log(memoryRes.content[0].text);
  process.exit(0);
} else {
  // Default to starting standard MCP stdio server
  import("../index.js");
}
