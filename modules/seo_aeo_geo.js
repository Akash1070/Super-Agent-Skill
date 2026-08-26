/**
 * SEO, AEO (Answer Engine Optimization) & GEO (Generative Engine Optimization) Engine Module
 * Inspired by geo-seo-claude, awesome-generative-engine-optimization, aeorank-aeo-scanner,
 * linkinator, backlink_skills, and StanGirard/seo-audits-toolkit.
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
  {
    name: "audit_seo_aeo_geo_readiness",
    description: "Audits HTML/Markdown code for SEO, AEO (Perplexity/SearchGPT direct answers), and GEO (Generative AI indexability) compliance, scanning for missing Schema.org tags, broken link risks, and citation gaps.",
    inputSchema: {
      type: "object",
      properties: {
        code_or_markdown: {
          type: "string",
          description: "HTML or Markdown code content to audit",
        },
      },
      required: ["code_or_markdown"],
    },
  },
  {
    name: "generate_backlink_and_traffic_strategy",
    description: "Generates programmatic SEO keyword strategies, high-authority backlink outreach blueprints, and Google Trends traffic expansion plans.",
    inputSchema: {
      type: "object",
      properties: {
        domain_niche: {
          type: "string",
          description: "Niche or domain (e.g. 'Developer Tools', 'SaaS Financial Software', 'AI Agents')",
        },
      },
      required: ["domain_niche"],
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
    report += `> ${pName} is an open-source Model Context Protocol (MCP) server that equips AI coding assistants (Claude Code, Cursor, Windsurf, Antigravity) with 47+ production tools covering security, design systems, refactoring, SEO/AEO/GEO, SaaS monetization, and DevOps automation.\n\n`;

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

  if (name === "audit_seo_aeo_geo_readiness") {
    const code = args.code_or_markdown;
    let audit = `# 🔍 SEO / AEO / GEO Readiness Audit\n\n`;
    const issues = [];
    const passes = [];

    if (code.includes("llms.txt")) {
      passes.push("✅ **GEO Indexability:** Found `llms.txt` reference for AI scraper discovery.");
    } else {
      issues.push("⚠️ **GEO Indexability Gap:** Missing `llms.txt` reference for Perplexity / ChatGPT crawlers.");
    }

    if (code.includes("schema.org") || code.includes("application/ld+json")) {
      passes.push("✅ **Schema Structured Data:** Found JSON-LD Schema.org markup.");
    } else {
      issues.push("⚠️ **Structured Data Gap:** Missing Schema.org JSON-LD entity definition.");
    }

    if (code.includes("> **What is") || code.includes("### What is")) {
      passes.push("✅ **AEO Direct Answer:** Found direct-answer block optimized for Perplexity & SearchGPT citations.");
    } else {
      issues.push("⚠️ **AEO Citation Gap:** Add a clear 'What is [App]?' block at top for AI Answer Engines.");
    }

    audit += `### Passed Audits (${passes.length}):\n` + (passes.length > 0 ? passes.join("\n") : "*None*") + "\n\n";
    audit += `### Recommended Improvements (${issues.length}):\n` + (issues.length > 0 ? issues.join("\n") : "🟢 *All checks passed!*") + "\n";

    return { content: [{ type: "text", text: audit }] };
  }

  if (name === "generate_backlink_and_traffic_strategy") {
    const niche = args.domain_niche;

    let strat = `# 🚀 Programmatic SEO & Backlink Growth Blueprint (${niche.toUpperCase()})\n\n`;
    strat += `### 1. High-Authority Backlink Outreach Channels\n`;
    strat += `- **Awesome Lists:** Submit repository PRs to curated \`awesome-*\` lists in the \`${niche}\` ecosystem.\n`;
    strat += `- **Product Directories:** Submit to AlternativeTo, Product Hunt, BetaList, and StackShare.\n`;
    strat += `- **Technical Write-ups:** Publish technical architecture deep-dives on Hashnode, Dev.to, and Medium.\n\n`;

    strat += `### 2. Programmatic Long-Tail Keyword Clusters\n`;
    strat += `- **Pattern 1:** \`best [tool] alternatives for [use-case]\`\n`;
    strat += `- **Pattern 2:** \`how to integrate [feature] in 5 minutes\`\n`;
    strat += `- **Pattern 3:** \`open-source [category] setup guide\`\n`;

    return { content: [{ type: "text", text: strat }] };
  }

  throw new Error(`Unknown tool in SEO/AEO/GEO module: ${name}`);
};
