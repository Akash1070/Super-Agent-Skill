/**
 * Andrej Karpathy Coding Guidelines & Audit Module
 */

export const KARPATHY_TOOLS = [
  {
    name: "get_karpathy_rules",
    description: "Returns Andrej Karpathy's core AI coding rules and guidelines to prevent over-engineering, bad assumptions, and collateral edits.",
    inputSchema: {
      type: "object",
      properties: {
        category: {
          type: "string",
          enum: ["all", "think_before_coding", "simplicity_first", "surgical_changes", "goal_driven_execution"],
          description: "Filter category (default: 'all')",
        },
      },
    },
  },
  {
    name: "evaluate_coding_plan",
    description: "Evaluates a proposed technical implementation plan against Karpathy's principles (Simplicity, Surgical Scope, Goal Verification).",
    inputSchema: {
      type: "object",
      properties: {
        plan_description: {
          type: "string",
          description: "Proposed implementation plan text",
        },
        task_scope: {
          type: "string",
          description: "Task request summary",
        },
      },
      required: ["plan_description"],
    },
  },
  {
    name: "generate_verification_checklist",
    description: "Converts a coding task into a goal-driven Karpathy verification checklist with explicit test criteria.",
    inputSchema: {
      type: "object",
      properties: {
        task_description: {
          type: "string",
          description: "Coding task to create checklist for",
        },
      },
      required: ["task_description"],
    },
  },
];

const RULES = {
  think_before_coding: {
    title: "1. Think Before Coding",
    tagline: "Don't assume. Don't hide confusion. Surface tradeoffs.",
    rules: [
      "State assumptions explicitly — If uncertain, ask rather than guess.",
      "Present multiple interpretations — Don't pick silently when ambiguity exists.",
      "Push back when warranted — If a simpler approach exists, suggest it explicitly.",
      "Stop when confused — Name what is unclear before editing code."
    ]
  },
  simplicity_first: {
    title: "2. Simplicity First",
    tagline: "Minimum code that solves the problem. Nothing speculative.",
    rules: [
      "No features beyond what was explicitly asked.",
      "No abstractions for single-use code.",
      "No speculative flexibility or configurability.",
      "If 200 lines could be 50, rewrite it."
    ]
  },
  surgical_changes: {
    title: "3. Surgical Changes",
    tagline: "Touch only what you must. Clean up only your own mess.",
    rules: [
      "Don't improve adjacent code or refactor unbroken things.",
      "Match existing codebase style strictly.",
      "Remove imports/variables that YOUR changes made unused."
    ]
  },
  goal_driven_execution: {
    title: "4. Goal-Driven Execution",
    tagline: "Define success criteria. Loop until verified.",
    rules: [
      "Transform imperative tasks into verifiable goals.",
      "Write tests or reproduction steps first, then make them pass.",
      "Loop until specific success criteria are met."
    ]
  }
};

export const handleKarpathyTool = (name, args) => {
  if (name === "get_karpathy_rules") {
    const category = args?.category || "all";
    let output = `# 🧠 Karpathy AI Coding Guidelines\n\n`;

    if (category === "all") {
      for (const [key, val] of Object.entries(RULES)) {
        output += `## ${val.title}\n*${val.tagline}*\n\n`;
        output += "**Rules:**\n" + val.rules.map(r => `- ${r}`).join("\n") + "\n\n";
      }
    } else if (RULES[category]) {
      const val = RULES[category];
      output += `## ${val.title}\n*${val.tagline}*\n\n`;
      output += "**Rules:**\n" + val.rules.map(r => `- ${r}`).join("\n") + "\n\n";
    }

    return { content: [{ type: "text", text: output }] };
  }

  if (name === "evaluate_coding_plan") {
    const plan = args.plan_description;
    const scope = args.task_scope || "Unspecified task";

    let audit = `# 🔍 Karpathy Code Plan Audit\n\n`;
    audit += `**Task Scope:** ${scope}\n\n`;
    audit += `### Criteria Audited:\n`;
    audit += `1. **Simplicity First:** Minimal lines, no speculative abstractions.\n`;
    audit += `2. **Surgical Scope:** Modifies only necessary files without drive-by refactoring.\n`;
    audit += `3. **Goal-Driven:** Explicit verification steps defined.\n\n`;
    audit += `\`\`\`text\n${plan}\n\`\`\`\n`;

    return { content: [{ type: "text", text: audit }] };
  }

  if (name === "generate_verification_checklist") {
    const task = args.task_description;

    let checklist = `# 🎯 Karpathy Goal Checklist\n\n`;
    checklist += `**Task:** ${task}\n\n`;
    checklist += `1. **Baseline Reproduction** -> verify baseline state\n`;
    checklist += `2. **Surgical Implementation** -> modify targeted files only\n`;
    checklist += `3. **Verification Loop** -> run tests/checks until passing\n`;

    return { content: [{ type: "text", text: checklist }] };
  }

  throw new Error(`Unknown tool in Karpathy module: ${name}`);
};
