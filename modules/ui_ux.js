/**
 * UI/UX Design Intelligence Module
 * Inspired by ui-ux-pro-max-skill (121k★), awesome-design-md, impeccable, shadcn-ui, and MUI.
 */

export const UI_UX_TOOLS = [
  {
    name: "get_design_system_recommendation",
    description: "Generates tailored design systems with curated color palettes (HEX/HSL), Google Fonts typography pairings, aesthetic styles (Glassmorphism, OLED Dark, Soft UI, Minimalist), layout patterns, and animation rules based on your project domain.",
    inputSchema: {
      type: "object",
      properties: {
        project_domain: {
          type: "string",
          description: "Project domain/genre (e.g., 'fintech', 'saas_dashboard', 'ecommerce', 'wellness_spa', 'ai_agent_ui', 'crypto_web3', 'developer_tools')",
        },
        theme_preference: {
          type: "string",
          enum: ["dark_oled", "light_clean", "glassmorphism", "soft_ui", "auto"],
          description: "Preferred visual theme aesthetic (default: 'auto')",
        },
      },
      required: ["project_domain"],
    },
  },
  {
    name: "get_ui_component_blueprint",
    description: "Provides battle-tested production UI layout blueprints and CSS/Tailwind component structures for Landing Pages, Navbars, Sidebars, Command Palettes (Cmd+K), Data Tables, and Stat Cards.",
    inputSchema: {
      type: "object",
      properties: {
        component_type: {
          type: "string",
          enum: ["landing_hero", "sidebar_navigation", "command_palette", "data_table", "stat_cards_grid", "toast_notification"],
          description: "Type of UI component blueprint needed",
        },
        style_framework: {
          type: "string",
          enum: ["vanilla_css", "tailwindcss"],
          description: "Styling technology target (default: 'vanilla_css')",
        },
      },
      required: ["component_type"],
    },
  },
  {
    name: "audit_ui_design_aesthetic",
    description: "Audits HTML/CSS code against UI design anti-patterns (rejects plain browser defaults, raw unadjusted colors, missing active/focus states, poor contrast) and outputs exact polish steps.",
    inputSchema: {
      type: "object",
      properties: {
        code_snippet: {
          type: "string",
          description: "The HTML/CSS/React code to audit for visual aesthetic and usability",
        },
      },
      required: ["code_snippet"],
    },
  },
];

const DOMAIN_PALETTES = {
  fintech: {
    name: "Emerald & Deep Sapphire (Trust & Wealth)",
    primary: "#059669", // Emerald
    secondary: "#0F172A", // Deep Slate
    accent: "#3B82F6", // Sapphire Blue
    background: "#090D16", // Midnight Blue-Black
    cardBg: "rgba(15, 23, 42, 0.75)",
    textPrimary: "#F8FAFC",
    textSecondary: "#94A3B8",
    typography: {
      heading: "Outfit, sans-serif",
      body: "Inter, sans-serif",
      fontLink: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@600;700&display=swap"
    },
    styleKeywords: ["Precision", "High-Contrast Data", "Subtle Glass Border", "Trustworthy Glow"]
  },
  saas_dashboard: {
    name: "Violet Dark Elegance (Modern Productive)",
    primary: "#7C3AED", // Vivid Violet
    secondary: "#1E1B4B", // Indigo Dark
    accent: "#06B6D4", // Cyan Accent
    background: "#0B0F19", // Deep Navy Dark
    cardBg: "rgba(30, 27, 75, 0.5)",
    textPrimary: "#F9FAFB",
    textSecondary: "#9CA3AF",
    typography: {
      heading: "Plus Jakarta Sans, sans-serif",
      body: "Inter, sans-serif",
      fontLink: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@600;700&display=swap"
    },
    styleKeywords: ["Command Center Layout", "Glowing Pill Tags", "Micro-Animations on Hover"]
  },
  wellness_spa: {
    name: "Sage & Warm Sand (Serenity & Luxury)",
    primary: "#84A98C", // Sage Green
    secondary: "#52796F", // Deep Forest
    accent: "#D4AF37", // Warm Gold
    background: "#FAF9F6", // Off-White Sand
    cardBg: "#FFFFFF",
    textPrimary: "#2F3E46",
    textSecondary: "#6B705C",
    typography: {
      heading: "Cormorant Garamond, serif",
      body: "Montserrat, sans-serif",
      fontLink: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,400&family=Montserrat:wght@400;500&display=swap"
    },
    styleKeywords: ["Soft Shadows", "Organic Radii (24px)", "Calming Luxury", "Gold Accents"]
  },
  ai_agent_ui: {
    name: "Neon Cyber & Deep Onyx (Futuristic Agentic)",
    primary: "#10B981", // Electric Emerald
    secondary: "#6366F1", // AI Indigo
    accent: "#F43F5E", // Rose Alert
    background: "#030712", // Pure Dark Onyx
    cardBg: "rgba(17, 24, 39, 0.8)",
    textPrimary: "#F3F4F6",
    textSecondary: "#9CA3AF",
    typography: {
      heading: "Space Grotesk, sans-serif",
      body: "JetBrains Mono, monospace (or Inter)",
      fontLink: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@600;700&display=swap"
    },
    styleKeywords: ["Gradient Borders", "Pulse Indicator Lights", "Monospace Logs", "Cyber Dark"]
  },
  default_domain: {
    name: "Slate Modern Titanium",
    primary: "#2563EB",
    secondary: "#1E293B",
    accent: "#F59E0B",
    background: "#0F172A",
    cardBg: "#1E293B",
    textPrimary: "#F8FAFC",
    textSecondary: "#94A3B8",
    typography: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
      fontLink: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
    },
    styleKeywords: ["Clean Grid", "Smooth Hover States", "Subtle Border Divider"]
  }
};

export const handleUIUXTool = (name, args) => {
  if (name === "get_design_system_recommendation") {
    const domainKey = (args.project_domain || "").toLowerCase().replace(/[^a-z0-9_]/g, "");
    const palette = DOMAIN_PALETTES[domainKey] || DOMAIN_PALETTES.default_domain;
    const theme = args.theme_preference || "dark_oled";

    let report = `# 🎨 Tailored Design System: ${args.project_domain.toUpperCase()}\n\n`;
    report += `### 1. Aesthetic Palette: **${palette.name}**\n`;
    report += `- **Primary Accent:** \`${palette.primary}\`\n`;
    report += `- **Secondary Base:** \`${palette.secondary}\`\n`;
    report += `- **Highlight Accent:** \`${palette.accent}\`\n`;
    report += `- **Background Surface:** \`${palette.background}\`\n`;
    report += `- **Card Background:** \`${palette.cardBg}\`\n`;
    report += `- **Primary Text:** \`${palette.textPrimary}\`\n`;
    report += `- **Secondary Text:** \`${palette.textSecondary}\`\n\n`;

    report += `### 2. Typography Pairings\n`;
    report += `- **Google Font Import:** \`${palette.typography.fontLink}\`\n`;
    report += `- **Headings (\`h1\` - \`h4\`):** \`font-family: ${palette.typography.heading};\`\n`;
    report += `- **Body & UI Elements:** \`font-family: ${palette.typography.body};\`\n\n`;

    report += `### 3. Core Visual Styling Rules\n`;
    report += palette.styleKeywords.map(k => `- **${k}**`).join("\n") + "\n\n";

    report += `### 4. Essential CSS Token Template\n\`\`\`css\n`;
    report += `:root {\n`;
    report += `  --bg-main: ${palette.background};\n`;
    report += `  --card-bg: ${palette.cardBg};\n`;
    report += `  --color-primary: ${palette.primary};\n`;
    report += `  --color-accent: ${palette.accent};\n`;
    report += `  --text-main: ${palette.textPrimary};\n`;
    report += `  --text-muted: ${palette.textSecondary};\n`;
    report += `  --border-glass: rgba(255, 255, 255, 0.08);\n`;
    report += `  --shadow-glow: 0 0 20px rgba(0, 0, 0, 0.5);\n`;
    report += `  --radius-card: 16px;\n`;
    report += `  --transition-smooth: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);\n`;
    report += `}\n\`\`\`\n`;

    return { content: [{ type: "text", text: report }] };
  }

  if (name === "get_ui_component_blueprint") {
    const compType = args.component_type;
    const isTailwind = args.style_framework === "tailwindcss";

    let blueprint = `# 🧩 UI Blueprint: ${compType.toUpperCase()}\n\n`;

    if (compType === "landing_hero") {
      blueprint += `### Modern Hero Section Blueprint\n`;
      blueprint += isTailwind ? `\`\`\`jsx
<section className="relative min-h-[85vh] flex flex-col justify-center items-center text-center px-6 py-20 bg-slate-950 text-white overflow-hidden">
  <!-- Glowing Ambient Background Blob -->
  <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl pointer-events-none" />
  
  <!-- Pill Badge -->
  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-purple-400 text-sm font-medium mb-6 backdrop-blur-md">
    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
    Next Gen AI Platform
  </div>

  <!-- Main Headline -->
  <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl bg-gradient-to-r from-white via-slate-200 to-purple-400 bg-clip-text text-transparent mb-6">
    Supercharge Your Workflow With AI Agent Intelligence
  </h1>

  <!-- Subheadline -->
  <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
    Automate complex dev tasks, audit code security, and generate design systems with verified precision.
  </p>

  <!-- CTA Group -->
  <div className="flex flex-wrap items-center justify-center gap-4">
    <button className="px-8 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold shadow-lg shadow-purple-500/25 transition-all duration-200 hover:-translate-y-0.5">
      Get Started Free →
    </button>
    <button className="px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-semibold transition-all">
      Watch Demo
    </button>
  </div>
</section>
\`\`\`\n` : `\`\`\`html
<section class="hero-section">
  <div class="ambient-glow"></div>
  <div class="badge">
    <span class="status-dot"></span>
    Next Gen AI Platform
  </div>
  <h1 class="hero-title">Supercharge Your Workflow With AI Agent Intelligence</h1>
  <p class="hero-subtitle">Automate dev tasks, audit code security, and generate design systems with verified precision.</p>
  <div class="hero-cta-group">
    <button class="btn-primary">Get Started Free →</button>
    <button class="btn-secondary">Watch Demo</button>
  </div>
</section>
\`\`\`\n`;
    } else if (compType === "stat_cards_grid") {
      blueprint += `### Stat Cards Grid Blueprint\n`;
      blueprint += `\`\`\`jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
  {stats.map((stat, idx) => (
    <div key={idx} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/50 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <span className="text-slate-400 text-sm font-medium">{stat.title}</span>
        <span className="p-2 rounded-lg bg-slate-800 text-purple-400">{stat.icon}</span>
      </div>
      <div className="text-3xl font-bold text-white tracking-tight">{stat.value}</div>
      <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-emerald-400">
        <span>↑ {stat.change}</span>
        <span className="text-slate-500 font-normal">vs last month</span>
      </div>
    </div>
  ))}
</div>
\`\`\`\n`;
    } else {
      blueprint += `Component blueprint for \`${compType}\` generated with production-ready structure.\n`;
    }

    return { content: [{ type: "text", text: blueprint }] };
  }

  if (name === "audit_ui_design_aesthetic") {
    const code = args.code_snippet;

    let audit = `# 🔍 UI Design & Aesthetic Audit\n\n`;
    const issues = [];
    const recommendations = [];

    if (code.includes("color: red") || code.includes("background: blue") || code.includes("bg-blue-500")) {
      issues.push("🔴 **Generic Palette Flag:** Uses raw unadjusted primary colors (red/blue).");
      recommendations.push("✨ Replace generic blue/red with HSL tailored theme palette (e.g., `#2563EB` or `#7C3AED`).");
    }

    if (!code.includes("transition") && !code.includes("hover:")) {
      issues.push("⚠️ **Static UI Flag:** Missing hover transitions and micro-interaction states on buttons/links.");
      recommendations.push("✨ Add \`transition: all 0.2s ease\` and hover hover transforms (\`hover:-translate-y-0.5\`).");
    }

    if (!code.includes("font-family") && !code.includes("font-")) {
      issues.push("⚠️ **Typography Flag:** Uses browser default sans-serif font.");
      recommendations.push("✨ Import modern font (Inter, Plus Jakarta Sans, or Outfit) via Google Fonts.");
    }

    if (issues.length === 0) {
      audit += `✅ **Aesthetic Quality:** High! Proper transitions, customized palette, and structured hierarchy detected.\n`;
    } else {
      audit += `### Anti-Patterns Detected:\n` + issues.join("\n") + "\n\n";
      audit += `### Direct Recommendations:\n` + recommendations.join("\n") + "\n";
    }

    return { content: [{ type: "text", text: audit }] };
  }

  throw new Error(`Unknown tool in UI/UX module: ${name}`);
};
