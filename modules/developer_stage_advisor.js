/**
 * Autonomous Developer Stage Diagnostic & Action Blueprint Module
 * Automatically inspects a developer's codebase, identifies their exact project stage
 * (Idea -> MVP -> Pre-Launch -> Growth -> Enterprise), and outputs prioritized action steps.
 */

export const STAGE_ADVISOR_TOOLS = [
  {
    name: "identify_project_stage_and_roadmap",
    description: "Inspects the project state/dependencies and determines the exact developer stage with a prioritized list of recommended tools and action steps.",
    inputSchema: {
      type: "object",
      properties: {
        has_package_json: {
          type: "boolean",
          description: "Whether project has a package.json / requirements.txt",
        },
        has_auth: {
          type: "boolean",
          description: "Whether authentication is already configured",
        },
        has_docker: {
          type: "boolean",
          description: "Whether containerization or deployment configs exist",
        },
        has_seo_llm: {
          type: "boolean",
          description: "Whether llms.txt, AEO snippets, or meta tags exist",
        },
      },
    },
  },
  {
    name: "generate_developer_value_walkthrough",
    description: "Generates a zero-BS, step-by-step execution roadmap giving maximum value to a developer at any stage of building.",
    inputSchema: {
      type: "object",
      properties: {
        project_name: {
          type: "string",
          description: "Name of the developer's project",
        },
        current_stage: {
          type: "string",
          enum: ["ideation", "mvp_prototype", "pre_launch_polish", "growth_scale", "legacy_refactor"],
          description: "Current stage of the project",
        },
      },
      required: ["project_name", "current_stage"],
    },
  },
];

export const handleStageAdvisorTool = (name, args) => {
  if (name === "identify_project_stage_and_roadmap") {
    const hasPkg = args.has_package_json ?? true;
    const hasAuth = args.has_auth ?? false;
    const hasDocker = args.has_docker ?? false;
    const hasSeo = args.has_seo_llm ?? false;

    let stage = "Stage 1: Ideation & Setup";
    if (hasPkg && !hasAuth) stage = "Stage 2: Core MVP Development";
    if (hasPkg && hasAuth && !hasDocker) stage = "Stage 3: Production Security & Deployment Polish";
    if (hasPkg && hasAuth && hasDocker && !hasSeo) stage = "Stage 4: SEO / AEO / GEO Discovery & Growth";
    if (hasPkg && hasAuth && hasDocker && hasSeo) stage = "Stage 5: High-Scale Refactor & Monetization";

    let res = `# 🗺️ Developer Stage Diagnostic & Action Blueprint\n\n`;
    res += `> **Detected Stage:** \`${stage}\`\n\n`;

    res += `### ⚡ Recommended Next Actions & Recommended MCP Tools:\n\n`;

    if (!hasAuth) {
      res += `1. **Setup Production Auth:** Call \`get_auth_architecture_blueprint\` to implement session-based auth with OAuth2 & password hashing.\n`;
    }
    if (!hasDocker) {
      res += `2. **Containerize Application:** Call \`generate_docker_setup\` to create a multi-stage Dockerfile & Nginx reverse proxy.\n`;
    }
    if (!hasSeo) {
      res += `3. **Maximize AI Discovery:** Call \`generate_llms_txt_blueprint\` and \`audit_seo_aeo_geo_readiness\` to ensure Perplexity, SearchGPT, and Claude cite your app.\n`;
    }
    res += `4. **Hormozi Offer & Copy:** Call \`generate_hormozi_offer_blueprint\` to write a high-converting hero headline and pricing breakdown.\n`;

    return { content: [{ type: "text", text: res }] };
  }

  if (name === "generate_developer_value_walkthrough") {
    const pname = args.project_name;
    const stage = args.current_stage;

    let walk = `# 🚀 Action Blueprint for **${pname}** [${stage.toUpperCase()}]\n\n`;

    walk += `### 🎯 Primary Objective:\n`;
    walk += `Transition ${pname} from **${stage}** to market readiness with zero wasted time and maximum developer ROI.\n\n`;

    walk += `### 📋 Step-by-Step Execution Plan:\n`;
    walk += `1. **UI/UX Polish:** Apply OLED Dark design tokens using \`get_design_system_recommendation\`.\n`;
    walk += `2. **Security Audit:** Scan code using \`audit_security_vulnerabilities\` for OWASP compliance.\n`;
    walk += `3. **Discovery Setup:** Generate \`llms.txt\` and Schema.org using \`generate_seo_aeo_geo_blueprint\`.\n`;
    walk += `4. **Monetization Tiering:** Structure SaaS pricing using \`generate_pricing_tier_blueprint\`.\n\n`;

    walk += `> [!TIP]\n`;
    walk += `> Running these 4 steps elevates ${pname} to top 1% developer quality instantly.\n`;

    return { content: [{ type: "text", text: walk }] };
  }

  throw new Error(`Unknown tool in Stage Advisor module: ${name}`);
};
