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
import { MARKETING_TOOLS, handleMarketingTool } from "./modules/marketing_copywriting.js";
import { MONETIZATION_TOOLS, handleMonetizationTool } from "./modules/monetization_pricing.js";
import { LEGAL_TOOLS, handleLegalTool } from "./modules/legal_compliance.js";
import { ANALYTICS_TOOLS, handleAnalyticsTool } from "./modules/analytics_growth.js";
import { SEO_AEO_GEO_TOOLS, handleSeoAeoGeoTool } from "./modules/seo_aeo_geo.js";
import { RAG_VECTOR_TOOLS, handleRagVectorTool } from "./modules/rag_vector_engine.js";
import { SCRAPING_TOOLS, handleScrapingTool } from "./modules/scraping_automation.js";
import { DATAVIZ_TOOLS, handleDataVizTool } from "./modules/data_viz_engine.js";
import { AI_MEDIA_TOOLS, handleAiMediaTool } from "./modules/ai_media_engine.js";
import { WEB_DOMAIN_TOOLS, handleWebDomainTool } from "./modules/web_domain_engine.js";
import { FINTECH_TOOLS, handleFintechTool } from "./modules/fintech_crypto.js";
import { STAGE_ADVISOR_TOOLS, handleStageAdvisorTool } from "./modules/developer_stage_advisor.js";
import { FEDERATED_MEMORY_TOOLS, handleFederatedMemoryTool } from "./modules/federated_memory_sync.js";
import { AI_WORKFLOW_TOOLS, handleAiWorkflowTool } from "./modules/ai_workflow_orchestration.js";
import { FREE_TIER_TOOLS, handleFreeTierTool } from "./modules/free_founder_tier_engine.js";
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
  ...MARKETING_TOOLS,
  ...MONETIZATION_TOOLS,
  ...LEGAL_TOOLS,
  ...ANALYTICS_TOOLS,
  ...SEO_AEO_GEO_TOOLS,
  ...RAG_VECTOR_TOOLS,
  ...SCRAPING_TOOLS,
  ...DATAVIZ_TOOLS,
  ...AI_MEDIA_TOOLS,
  ...WEB_DOMAIN_TOOLS,
  ...FINTECH_TOOLS,
  ...STAGE_ADVISOR_TOOLS,
  ...FEDERATED_MEMORY_TOOLS,
  ...AI_WORKFLOW_TOOLS,
  ...FREE_TIER_TOOLS,
];

const server = new Server(
  {
    name: "super-agent-skills-mcp",
    version: "16.0.0",
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
    if (FREE_TIER_TOOLS.some((t) => t.name === name)) return handleFreeTierTool(name, args);
    if (AI_WORKFLOW_TOOLS.some((t) => t.name === name)) return handleAiWorkflowTool(name, args);
    if (FEDERATED_MEMORY_TOOLS.some((t) => t.name === name)) return handleFederatedMemoryTool(name, args);
    if (STAGE_ADVISOR_TOOLS.some((t) => t.name === name)) return handleStageAdvisorTool(name, args);
    if (AI_MEDIA_TOOLS.some((t) => t.name === name)) return handleAiMediaTool(name, args);
    if (WEB_DOMAIN_TOOLS.some((t) => t.name === name)) return handleWebDomainTool(name, args);
    if (FINTECH_TOOLS.some((t) => t.name === name)) return handleFintechTool(name, args);
    if (RAG_VECTOR_TOOLS.some((t) => t.name === name)) return handleRagVectorTool(name, args);
    if (SCRAPING_TOOLS.some((t) => t.name === name)) return handleScrapingTool(name, args);
    if (DATAVIZ_TOOLS.some((t) => t.name === name)) return handleDataVizTool(name, args);
    if (MEMORY_TOOLS.some((t) => t.name === name)) return handleMemoryTool(name, args);
    if (SEO_AEO_GEO_TOOLS.some((t) => t.name === name)) return handleSeoAeoGeoTool(name, args);
    if (MONETIZATION_TOOLS.some((t) => t.name === name)) return handleMonetizationTool(name, args);
    if (LEGAL_TOOLS.some((t) => t.name === name)) return handleLegalTool(name, args);
    if (ANALYTICS_TOOLS.some((t) => t.name === name)) return handleAnalyticsTool(name, args);
    if (MARKETING_TOOLS.some((t) => t.name === name)) return handleMarketingTool(name, args);
    if (REFACTOR_TOOLS.some((t) => t.name === name)) return handleRefactorTool(name, args);
    if (SEO_TOOLS.some((t) => t.name === name)) return handleSeoTool(name, args);
    if (AUTO_SCOUT_TOOLS.some((t) => t.name === name)) return await handleAutoScoutTool(name, args);
    if (PERFORMANCE_TOOLS.some((t) => t.name === name)) return handlePerformanceTool(name, args);
    if (TESTING_TOOLS.some((t) => t.name === name)) return handleTestingTool(name, args);
    if (API_CONTRACTS_TOOLS.some((t) => t.name === name)) return handleApiContractsTool(name, args);
    if (CICD_TOOLS.some((t) => t.name === name)) return handleCicdTool(name, args);
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
  console.error("🚀 Super Agent Skill MCP Server v16.0 (64 Tools / 29 Modules) running on stdio");

  // Start 24-hour background cron scouting loop
  initAutonomousScoutCron();
}

run().catch((error) => {
  console.error("Fatal error running Super Agent Skill MCP server:", error);
  process.exit(1);
});
