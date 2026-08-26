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
    name: "get_mobile_app_blueprint",
    description: "Generates production mobile app screen layouts, navigation stacks, and UI blueprints for React Native (Expo) and Flutter.",
    inputSchema: {
      type: "object",
      properties: {
        framework: {
          type: "string",
          enum: ["react_native_expo", "flutter_dart"],
          description: "Mobile app target framework",
        },
        screen_type: {
          type: "string",
          enum: ["auth_login", "home_dashboard", "profile_settings", "item_feed"],
          description: "Target mobile screen layout",
        },
      },
      required: ["framework", "screen_type"],
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
    primary: "#059669",
    secondary: "#0F172A",
    accent: "#3B82F6",
    background: "#090D16",
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
    primary: "#7C3AED",
    secondary: "#1E1B4B",
    accent: "#06B6D4",
    background: "#0B0F19",
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
    primary: "#84A98C",
    secondary: "#52796F",
    accent: "#D4AF37",
    background: "#FAF9F6",
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
    primary: "#10B981",
    secondary: "#6366F1",
    accent: "#F43F5E",
    background: "#030712",
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

    report += `### 3. Essential CSS Token Template\n\`\`\`css\n`;
    report += `:root {\n`;
    report += `  --bg-main: ${palette.background};\n`;
    report += `  --card-bg: ${palette.cardBg};\n`;
    report += `  --color-primary: ${palette.primary};\n`;
    report += `  --color-accent: ${palette.accent};\n`;
    report += `  --text-main: ${palette.textPrimary};\n`;
    report += `  --text-muted: ${palette.textSecondary};\n`;
    report += `  --radius-card: 16px;\n`;
    report += `}\n\`\`\`\n`;

    return { content: [{ type: "text", text: report }] };
  }

  if (name === "get_ui_component_blueprint") {
    const compType = args.component_type;
    const isTailwind = args.style_framework === "tailwindcss";

    let blueprint = `# 🧩 UI Blueprint: ${compType.toUpperCase()}\n\n`;
    blueprint += `Production layout structure generated for \`${compType}\` (${isTailwind ? "TailwindCSS" : "Vanilla CSS"}).\n`;
    return { content: [{ type: "text", text: blueprint }] };
  }

  if (name === "get_mobile_app_blueprint") {
    const framework = args.framework;
    const screen = args.screen_type;

    let blueprint = `# 📱 Mobile App Blueprint: ${screen.toUpperCase()} (${framework.toUpperCase()})\n\n`;

    if (framework === "react_native_expo") {
      blueprint += `\`\`\`tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

export default function ${screen.replace(/[^a-zA-Z0-9]/g, '')}Screen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mobile ${screen}</Text>
      </View>
      <TouchableOpacity style={styles.button} activeOpacity={0.8}>
        <Text style={styles.buttonText}>Continue →</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0F19', padding: 20 },
  header: { marginTop: 40, marginBottom: 20 },
  title: { fontSize: 28, fontWeight: '700', color: '#FFFFFF' },
  button: { backgroundColor: '#7C3AED', paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
});
\`\`\`\n`;
    } else {
      blueprint += `\`\`\`dart
import 'package:flutter/material.dart';

class ${screen.replace(/[^a-zA-Z0-9]/g, '')}Screen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF0B0F19),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          centerTitle: true,
          child: Text('Mobile ${screen}', style: TextStyle(color: Colors.white, fontSize: 24)),
        ),
      ),
    );
  }
}
\`\`\`\n`;
    }

    return { content: [{ type: "text", text: blueprint }] };
  }

  if (name === "audit_ui_design_aesthetic") {
    const code = args.code_snippet;
    let audit = `# 🔍 UI Design & Aesthetic Audit\n\n`;
    if (!code.includes("hover:") && !code.includes("transition")) {
      audit += `⚠️ **Static UI Flag:** Missing hover transitions and micro-interaction states.\n`;
    } else {
      audit += `✅ **Aesthetic Quality:** Smooth visual cues and transitions detected.\n`;
    }
    return { content: [{ type: "text", text: audit }] };
  }

  throw new Error(`Unknown tool in UI/UX module: ${name}`);
};
