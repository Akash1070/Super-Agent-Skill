#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

import { UI_UX_TOOLS, handleUIUXTool } from "./modules/ui_ux.js";
import { DEVOPS_TOOLS, handleDevOpsTool } from "./modules/devops.js";
import { SECURITY_TOOLS, handleSecurityTool } from "./modules/security.js";
import { KARPATHY_TOOLS, handleKarpathyTool } from "./modules/karpathy.js";
import { MEMORY_TOOLS, handleMemoryTool } from "./modules/memory_learning.js";
import { ARCHITECTURE_AUTH_TOOLS, handleArchitectureAuthTool } from "./modules/architecture_auth.js";
import { PROMPT_ENGINEERING_TOOLS, handlePromptEngineeringTool } from "./modules/prompt_engineering.js";
import { PERFORMANCE_TOOLS, handlePerformanceTool } from "./modules/performance.js";
import { TESTING_TOOLS, handleTestingTool } from "./modules/testing.js";
import { API_CONTRACTS_TOOLS, handleApiContractsTool } from "./modules/api_contracts.js";
import { CICD_TOOLS, handleCicdTool } from "./modules/cicd_automation.js";
import { AUTO_SCOUT_TOOLS, handleAutoScoutTool } from "./modules/auto_scout_updater.js";
import { REFACTOR_TOOLS, handleRefactorTool } from "./modules/code_refactor.js";
import { SEO_TOOLS, handleSeoTool } from "./modules/seo_marketing.js";
import { initAutonomousScoutCron } from "./modules/cron_auto_scout.js";

const ALL_TOOLS = [
  ...UI_UX_TOOLS,
  ...DEVOPS_TOOLS,
  ...SECURITY_TOOLS,
  ...KARPATHY_TOOLS,
  ...MEMORY_TOOLS,
  ...ARCHITECTURE_AUTH_TOOLS,
  ...PROMPT_ENGINEERING_TOOLS,
  ...PERFORMANCE_TOOLS,
  ...TESTING_TOOLS,
  ...API_CONTRACTS_TOOLS,
  ...CICD_TOOLS,
  ...AUTO_SCOUT_TOOLS,
  ...REFACTOR_TOOLS,
  ...SEO_TOOLS,
];

const server = new Server(
  {
    name: "super-agent-skills-mcp",
    version: "5.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: ALL_TOOLS,
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    if (REFACTOR_TOOLS.some((t) => t.name === name)) return handleRefactorTool(name, args);
    if (SEO_TOOLS.some((t) => t.name === name)) return handleSeoTool(name, args);
    if (AUTO_SCOUT_TOOLS.some((t) => t.name === name)) return await handleAutoScoutTool(name, args);
    if (PERFORMANCE_TOOLS.some((t) => t.name === name)) return handlePerformanceTool(name, args);
    if (TESTING_TOOLS.some((t) => t.name === name)) return handleTestingTool(name, args);
    if (API_CONTRACTS_TOOLS.some((t) => t.name === name)) return handleApiContractsTool(name, args);
    if (CICD_TOOLS.some((t) => t.name === name)) return handleCicdTool(name, args);
    if (MEMORY_TOOLS.some((t) => t.name === name)) return handleMemoryTool(name, args);
    if (ARCHITECTURE_AUTH_TOOLS.some((t) => t.name === name)) return handleArchitectureAuthTool(name, args);
    if (PROMPT_ENGINEERING_TOOLS.some((t) => t.name === name)) return handlePromptEngineeringTool(name, args);
    if (UI_UX_TOOLS.some((t) => t.name === name)) return handleUIUXTool(name, args);
    if (DEVOPS_TOOLS.some((t) => t.name === name)) return handleDevOpsTool(name, args);
    if (SECURITY_TOOLS.some((t) => t.name === name)) return handleSecurityTool(name, args);
    if (KARPATHY_TOOLS.some((t) => t.name === name)) return handleKarpathyTool(name, args);

    throw new Error(`Tool implementation not found: ${name}`);
  } catch (error) {
    return {
      content: [{ type: "text", text: `❌ MCP Error [${name}]: ${error.message}` }],
      isError: true,
    };
  }
});

async function run() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("🚀 Super Agent Skill MCP Server v5.0 (33 Tools / 14 Modules) running on stdio");

  // Start 24-hour background cron scouting loop
  initAutonomousScoutCron();
}

run().catch((error) => {
  console.error("Fatal error running Super Agent Skill MCP server:", error);
  process.exit(1);
});
