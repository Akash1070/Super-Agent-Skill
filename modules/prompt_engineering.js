/**
 * Code Comprehension & Prompt Intelligence Module
 * Inspired by Prompt-Engineering-Guide, Understand-Anything, codegraph, awesome-claude-code, and agent-skills.
 */

export const PROMPT_ENGINEERING_TOOLS = [
  {
    name: "get_code_comprehension_strategy",
    description: "Generates step-by-step strategies for reading, mapping, and understanding complex codebases without hallucinations using dependency trees and key entry-point mapping.",
    inputSchema: {
      type: "object",
      properties: {
        repo_size: {
          type: "string",
          enum: ["small_mono", "medium_project", "large_enterprise"],
          description: "Scale of the target codebase",
        },
        primary_language: {
          type: "string",
          description: "Primary programming language of the codebase",
        },
      },
      required: ["repo_size"],
    },
  },
  {
    name: "optimize_agent_prompt",
    description: "Formulates structured, highly effective system prompts and prompt templates for complex AI agent tasks (e.g. Code Refactoring, RAG Search, Multi-Agent Orchestration, Bug Fixes).",
    inputSchema: {
      type: "object",
      properties: {
        task_type: {
          type: "string",
          enum: ["code_refactoring", "system_prompt_builder", "rag_retrieval", "bug_investigation"],
          description: "Task type to generate optimal prompt for",
        },
        context_details: {
          type: "string",
          description: "Target details or goals for the prompt",
        },
      },
      required: ["task_type"],
    },
  },
];

export const handlePromptEngineeringTool = (name, args) => {
  if (name === "get_code_comprehension_strategy") {
    const scale = args.repo_size;
    let strategy = `# 🧠 Code Comprehension Strategy: ${scale.toUpperCase()}\n\n`;

    strategy += `### 1. Entry Point Identification Phase\n`;
    strategy += `- Locate main configuration files (\`package.json\`, \`docker-compose.yml\`, \`tsconfig.json\`, \`pyproject.toml\`).\n`;
    strategy += `- Identify application entry point (\`index.js\`, \`main.py\`, \`src/app.tsx\`, \`server.js\`).\n\n`;

    strategy += `### 2. Dependency Graph & State Map\n`;
    strategy += `- Map routing layer -> service layer -> database ORM models.\n`;
    strategy += `- Search for global context / state stores (Redux, Zustand, React Context, Pinia).\n\n`;

    strategy += `### 3. Surgical Code Reading Rules\n`;
    strategy += `- Read imports first to understand component dependencies.\n`;
    strategy += `- Trace function executions top-down before diving into utility helper implementations.\n`;

    return { content: [{ type: "text", text: strategy }] };
  }

  if (name === "optimize_agent_prompt") {
    const tType = args.task_type;
    let promptDoc = `# 📑 Optimal System Prompt Template: ${tType.toUpperCase()}\n\n`;

    if (tType === "code_refactoring") {
      promptDoc += `\`\`\`markdown
<role>
You are an expert Principal Engineer specializing in clean, surgical code refactoring.
</role>

<rules>
1. Preserve 100% of existing behavior and test contracts.
2. Reduce code lines and complexity without adding unrequested abstractions.
3. Match existing naming conventions and import styles.
</rules>

<instruction>
Refactor the provided code block below. Output only the diff and a 2-sentence summary of rationale.
</instruction>
\`\`\`\n`;
    } else {
      promptDoc += `\`\`\`markdown
<role>
You are an AI Debugging Agent analyzing execution logs and stack traces.
</role>

<workflow>
1. Identify exact line of failure and error code.
2. Determine root cause (null pointer, race condition, syntax error, missing environment variable).
3. Propose minimal fix with verification step.
</workflow>
\`\`\`\n`;
    }

    return { content: [{ type: "text", text: promptDoc }] };
  }

  throw new Error(`Unknown tool in Prompt Engineering module: ${name}`);
};
