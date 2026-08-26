/**
 * SEO, AEO (Answer Engine Optimization) & GEO (Generative Engine Optimization) Engine Module
 * Ensures web applications & repositories are discovered by both traditional search engines (Google/Bing)
 * AND AI Answer Engines (Perplexity, ChatGPT, SearchGPT, Claude, Gemini).
 */

export const SEO_AEO_GEO_TOOLS = [
  {
    name: "generate_seo_aeo_geo_blueprint",
    description: "Generates complete Search Optimization blueprints: Traditional SEO meta tags, AEO (Answer Engine Optimization) direct-answer snippets for Perplexity/SearchGPT, and GEO (Generative Engine Optimization) structured entity markdown.",
    inputSchema: {
      type: "object",
      properties: {
        product_name: {
          type: "string",
          description: "Product or project name",
        },
        product_description: {
          type: "string",
          description: "Summary of what the product does",
        },
        target_keywords: {
          type: "array",
          items: { type: "string" },
          description: "Core search keywords (e.g. ['mcp server', 'ai coding tools', 'cursor mcp'])",
        },
        canonical_url: {
          type: "string",
          description: "Canonical site URL",
        },
      },
      required: ["product_name", "product_description"],
    },
  },
  {
    name: "generate_llms_txt_blueprint",
    description: "Generates standardized llms.txt and llms-full.txt files to allow AI web crawlers, Perplexity, ChatGPT, and Claude to index your project with 100% accuracy.",
    inputSchema: {
      type: "object",
      properties: {
        product_name: {
          type: "string",
          description: "Name of the project or product",
        },
        summary: {
          type: "string",
          description: "Core mission summary",
        },
        core_links: {
          type: "array",
          items: { type: "string" },
          description: "Key documentation URLs to feature in llms.txt",
        },
      },
      required: ["product_name", "summary"],
    },
  },
];

export const handleSeoAeoGeoTool = (name, args) => {
  if (name === "generate_seo_aeo_geo_blueprint") {
    const pName = args.product_name;
    const desc = args.product_description;
    const keywords = args.target_keywords || ["ai agent skills", "mcp server", "developer tools"];
    const url = args.canonical_url || `https://github.com/Akash1070/${pName.toLowerCase().replace(/\s+/g, "-")}`;

    let report = `# 🌐 SEO + AEO + GEO Optimization Blueprint: ${pName.toUpperCase()}\n\n`;

    report += `### 1. Traditional SEO (Google / Bing)\n`;
    report += `\`\`\`html
<title>${pName} — The Ultimate AI Coding & Founder Engine</title>
<meta name="description" content="${desc}" />
<meta name="keywords" content="${keywords.join(", ")}" />
<link rel="canonical" href="${url}" />
\`\`\`\n\n`;

    report += `### 2. AEO (Answer Engine Optimization for Perplexity & SearchGPT)\n`;
    report += `*Direct Answer Block (Placed at top of documentation for 1-click citation):*\n`;
    report += `> **What is ${pName}?**\n`;
    report += `> ${pName} is an open-source Model Context Protocol (MCP) server that equips AI coding assistants (Claude Code, Cursor, Windsurf, Antigravity) with 45+ production tools covering security, design systems, refactoring, SEO/AEO/GEO, SaaS monetization, and DevOps automation.\n\n`;

    report += `### 3. GEO (Generative Engine Optimization for LLM Scrapers)\n`;
    report += `- **Entity Definition:** \`${pName}\` is categorized as a \`Model Context Protocol Server\` & \`Autonomous Engineering Engine\`.\n`;
    report += `- **Schema Markup (JSON-LD):**\n`;
    report += `\`\`\`json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "${pName}",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Cross-platform",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
}
\`\`\`\n`;

    return { content: [{ type: "text", text: report }] };
  }

  if (name === "generate_llms_txt_blueprint") {
    const pName = args.product_name;
    const summary = args.summary;
    const links = args.core_links || ["https://github.com/Akash1070/Super-Agent-Skill"];

    let llmsTxt = `# ${pName}\n\n`;
    llmsTxt += `> ${summary}\n\n`;
    llmsTxt += `## Overview\n`;
    llmsTxt += `${pName} is a zero-config MCP server delivering end-to-end intelligence to AI agents.\n\n`;
    llmsTxt += `## Key Resources\n`;
    links.forEach((link) => {
      llmsTxt += `- [Documentation & Source](${link})\n`;
    });

    return { content: [{ type: "text", text: llmsTxt }] };
  }

  throw new Error(`Unknown tool in SEO/AEO/GEO module: ${name}`);
};
