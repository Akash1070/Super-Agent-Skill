/**
 * Growth Funnel & Product Analytics Telemetry Module
 */

export const ANALYTICS_TOOLS = [
  {
    name: "generate_telemetry_funnel_blueprint",
    description: "Generates product event telemetry schemas (PostHog, Mixpanel, Plausible) for tracking signup conversion, onboarding milestones, feature usage, and churn signals.",
    inputSchema: {
      type: "object",
      properties: {
        app_name: {
          type: "string",
          description: "Name of application",
        },
        analytics_provider: {
          type: "string",
          enum: ["posthog", "mixpanel", "plausible_privacy"],
          description: "Target analytics provider",
        },
      },
      required: ["app_name"],
    },
  },
];

export const handleAnalyticsTool = (name, args) => {
  if (name === "generate_telemetry_funnel_blueprint") {
    const nameStr = args.app_name;
    const provider = args.analytics_provider || "posthog";

    let funnel = `# 📊 Product Telemetry & Funnel Blueprint (${provider.toUpperCase()})\n\n`;
    funnel += `### Core Conversion Funnel Events:\n\n`;
    funnel += `\`\`\`json
{
  "events": [
    { "name": "landing_page_viewed", "properties": ["source", "campaign", "device"] },
    { "name": "signup_started", "properties": ["auth_method"] },
    { "name": "signup_completed", "properties": ["user_id", "email_domain"] },
    { "name": "onboarding_step_completed", "properties": ["step_number"] },
    { "name": "first_core_action_completed", "properties": ["feature_used", "time_to_first_value_seconds"] },
    { "name": "subscription_upgraded", "properties": ["plan_tier", "arpu"] }
  ]
}
\`\`\`\n`;

    return { content: [{ type: "text", text: funnel }] };
  }

  throw new Error(`Unknown tool in Analytics module: ${name}`);
};
