/**
 * Marketing, Copywriting & Visual Asset Generation Engine Module
 * Inspired by high-converting SaaS landing pages, Product Hunt launches, and Show HN copy.
 */

export const MARKETING_TOOLS = [
  {
    name: "generate_marketing_copy_blueprint",
    description: "Generates high-converting SaaS hero headlines, feature value propositions, microcopy CTAs, and Product Hunt / Show HN launch copy.",
    inputSchema: {
      type: "object",
      properties: {
        product_name: {
          type: "string",
          description: "Name of the product or application",
        },
        product_description: {
          type: "string",
          description: "Brief description of what the product does and who it's for",
        },
        target_audience: {
          type: "string",
          description: "Target audience (e.g. 'Developers', 'Founders', 'Designers', 'E-commerce')",
        },
        copy_type: {
          type: "string",
          enum: ["hero_headline_and_sub", "product_hunt_launch", "show_hn_post", "feature_value_props"],
          description: "Type of marketing copywriting needed",
        },
      },
      required: ["product_name", "product_description", "copy_type"],
    },
  },
  {
    name: "generate_ai_image_prompt_blueprint",
    description: "Generates tailored prompts for Midjourney / DALL-E / Flux to create stunning visual assets (hero visual backgrounds, 3D app mockups, glassmorphic icons) for web and mobile apps.",
    inputSchema: {
      type: "object",
      properties: {
        asset_type: {
          type: "string",
          enum: ["hero_background_glow", "3d_app_mockup", "glassmorphism_icon", "social_preview_banner"],
          description: "Type of visual asset prompt to generate",
        },
        visual_style: {
          type: "string",
          description: "Visual aesthetic style (e.g. 'OLED Dark Cyberpunk', 'Minimalist Glassmorphism', 'Warm Luxury')",
        },
      },
      required: ["asset_type"],
    },
  },
];

export const handleMarketingTool = (name, args) => {
  if (name === "generate_marketing_copy_blueprint") {
    const nameStr = args.product_name;
    const descStr = args.product_description;
    const copyType = args.copy_type;

    let copy = `# 📣 High-Converting Marketing Copy: ${nameStr.toUpperCase()}\n\n`;

    if (copyType === "hero_headline_and_sub") {
      copy += `### 💥 Hero Section Copy Blueprint\n\n`;
      copy += `- **Badge Tagline:** \`✨ Powered by AI Agent Intelligence\`\n`;
      copy += `- **H1 Main Headline Option 1:** \`Build Production-Ready ${nameStr} 10x Faster with Super Agent Skills\`\n`;
      copy += `- **H1 Main Headline Option 2:** \`The Ultimate AI Coding Engine for ${nameStr}\`\n`;
      copy += `- **Subheadline:** \`${descStr}. Automated security, design systems, and live GitHub scouting in one unified workflow.\`\n`;
      copy += `- **Primary CTA Button:** \`Get Started Free →\`\n`;
      copy += `- **Secondary CTA Button:** \`Explore Documentation\`\n`;
      copy += `- **Social Proof Microcopy:** \`⭐⭐⭐⭐⭐ Loved by over 10,000+ developers worldwide\`\n`;
    } else if (copyType === "product_hunt_launch") {
      copy += `### 🚀 Product Hunt Launch Copy\n\n`;
      copy += `**Tagline:** \`${nameStr} — ${descStr}\` \n\n`;
      copy += `**Maker's Comment:**\n`;
      copy += `Hey Product Hunt community! 👋\n\nI built **${nameStr}** because ${descStr}.\n\nKey Highlights:\n- ⚡ **Zero-Config Setup:** Install in 5 seconds with 1 click\n- 🛡️ **Production Grade:** Built-in security hardening & performance auditing\n- 🎨 **Visual Excellence:** Curated Google Fonts & Glassmorphism themes\n\nWe'd love your feedback! Try it out today.\n`;
    } else {
      copy += `### 💡 Feature Value Propositions\n\n`;
      copy += `- **Headline:** \`Zero Over-Engineering, Maximum Velocity\`\n`;
      copy += `- **Description:** \`${nameStr} enforces surgical code changes and Karpathy guidelines so your codebase stays lean and maintainable.\`\n`;
    }

    return { content: [{ type: "text", text: copy }] };
  }

  if (name === "generate_ai_image_prompt_blueprint") {
    const assetType = args.asset_type;
    const style = args.visual_style || "Dark OLED Glassmorphism";

    let promptReport = `# 🎨 AI Visual Asset Prompt Blueprint: ${assetType.toUpperCase()}\n\n`;

    if (assetType === "hero_background_glow") {
      promptReport += `### Midjourney / DALL-E Prompt:\n`;
      promptReport += `\`\`\`text
Abstract futuristic ambient glow background, deep midnight blue and obsidian dark surface, subtle violet and emerald neon gradient light rays, sleek glassmorphic blur, 8k resolution, cinematic lighting, ultra-clean UI background, --ar 16:9 --v 6.0
\`\`\`\n`;
    } else if (assetType === "glassmorphism_icon") {
      promptReport += `### Midjourney / DALL-E Prompt:\n`;
      promptReport += `\`\`\`text
3D glassmorphic app icon floating in dark space, frosted glass texture with neon purple edge lighting, translucent refraction, minimal luxury design, octanerender, 8k --ar 1:1
\`\`\`\n`;
    } else {
      promptReport += `### Midjourney / DALL-E Prompt:\n`;
      promptReport += `\`\`\`text
High-end 3D laptop mockup showing sleek dark mode code editor UI dashboard, ambient purple ambient glow background, photorealistic 8k studio render --ar 16:9
\`\`\`\n`;
    }

    return { content: [{ type: "text", text: promptReport }] };
  }

  throw new Error(`Unknown tool in Marketing module: ${name}`);
};
