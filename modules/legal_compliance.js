/**
 * Legal, Privacy & Compliance Engine Module
 * Generates privacy policy outlines, Terms of Service templates, GDPR/CCPA disclosure checklists,
 * and AI data privacy disclaimers for founders.
 */

export const LEGAL_TOOLS = [
  {
    name: "generate_privacy_terms_blueprint",
    description: "Generates GDPR / CCPA compliant Privacy Policy outline, Terms of Service template, AI data usage disclaimers, and cookie consent configurations.",
    inputSchema: {
      type: "object",
      properties: {
        company_or_app_name: {
          type: "string",
          description: "Name of application or operating company",
        },
        collects_user_data: {
          type: "boolean",
          description: "Whether app collects emails, payment data, or usage metrics",
        },
        uses_ai_models: {
          type: "boolean",
          description: "Whether app passes user prompts to LLM provider APIs (e.g. OpenAI, Anthropic)",
        },
      },
      required: ["company_or_app_name"],
    },
  },
];

export const handleLegalTool = (name, args) => {
  if (name === "generate_privacy_terms_blueprint") {
    const nameStr = args.company_or_app_name;
    const collects = args.collects_user_data ?? true;
    const usesAi = args.uses_ai_models ?? true;

    let legal = `# ⚖️ Privacy Policy & Terms of Service Blueprint: ${nameStr.toUpperCase()}\n\n`;

    legal += `### 1. Privacy Policy Essentials (GDPR / CCPA Compliant)\n`;
    legal += `- **Data Controllers:** Information collected by \`${nameStr}\` is stored securely.\n`;
    if (collects) {
      legal += `- **Personal Data Collected:** Account email, payment transaction logs via Stripe, device telemetry.\n`;
    }
    if (usesAi) {
      legal += `- **AI Third-Party Data Processing:** Data sent to AI provider APIs is processed under zero-data-retention agreements for model training exclusion.\n`;
    }
    legal += `- **User Rights:** Right to access, export, or request deletion of data at any time.\n\n`;

    legal += `### 2. Terms of Service & Liability Shield\n`;
    legal += `- **Acceptable Use:** Users agree not to reverse engineer or overload API endpoints.\n`;
    legal += `- **Limitation of Liability:** \`${nameStr}\` is provided "AS IS" without warranties of 100% uninterrupted availability.\n`;

    return { content: [{ type: "text", text: legal }] };
  }

  throw new Error(`Unknown tool in Legal module: ${name}`);
};
