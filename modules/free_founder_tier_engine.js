/**
 * Free Founder Tier & Public APIs Engine Module
 * Inspired by ripienaar/free-for-dev (87k+ stars), public-apis/public-apis (300k+ stars),
 * wdhdev/free-for-life, and PullJosh/best-free-things.
 * Provides founders and builders with 100% free-tier infrastructure, free APIs, and $0 stack blueprints.
 */

export const FREE_TIER_TOOLS = [
  {
    name: "get_free_developer_stack_recommendation",
    description: "Recommends a production-grade $0/month full-stack infrastructure blueprint (Hosting, DB, Auth, AI Inference, Email, Vector DB, Analytics, Object Storage) using generous free tiers.",
    inputSchema: {
      type: "object",
      properties: {
        app_type: {
          type: "string",
          enum: ["saas_mvp", "ai_agent_app", "e_commerce", "content_blog", "quant_fintech"],
          description: "Type of application being built",
        },
        primary_language: {
          type: "string",
          enum: ["typescript_nextjs", "python_fastapi", "node_express"],
          description: "Primary backend / framework",
        },
      },
      required: ["app_type"],
    },
  },
  {
    name: "get_free_apis_and_services_directory",
    description: "Provides a searchable catalog of top 100% free public APIs and developer services (Finance, Geolocation, Weather, AI Audio/Vision, IP Lookup, Scraping, Email) with zero credit card required.",
    inputSchema: {
      type: "object",
      properties: {
        category: {
          type: "string",
          enum: ["all", "ai_llm_vision", "finance_crypto", "geolocation_ip", "weather_environment", "email_communication", "data_scraping"],
          description: "API category filter",
        },
      },
    },
  },
];

export const handleFreeTierTool = (name, args) => {
  if (name === "get_free_developer_stack_recommendation") {
    const appType = args.app_type;
    const lang = args.primary_language || "typescript_nextjs";

    let res = `# 🎁 $0/Month Production Stack Blueprint (${appType.toUpperCase()})\n\n`;
    res += `> **Goal:** Run your startup at **$0/month infrastructure cost** using battle-tested free tiers.\n\n`;

    res += `### 🧱 Free Infrastructure Stack Matrix:\n\n`;

    res += `| Domain | Recommended $0 Provider | Free Tier Allocation | Setup Command / Link |\n`;
    res += `| :--- | :--- | :--- | :--- |\n`;
    res += `| **Hosting & Edge** | **Vercel** / **Render** / **Fly.io** | 100GB Bandwidth, 3 free web services | \`npx create-next-app@latest\` |\n`;
    res += `| **Database (PostgreSQL)** | **Neon** / **Supabase** | 0.5 GiB storage, unlimited branch copies | \`npx supabase init\` |\n`;
    res += `| **Cache / Key-Value** | **Upstash Redis** | 10,000 commands/day free | \`npm install @upstash/redis\` |\n`;
    res += `| **Vector DB (AI/RAG)** | **Qdrant Cloud** / **ChromaDB Local** | 1GB free cluster / unlimited local | \`npm install @qdrant/js-client-rest\` |\n`;
    res += `| **Auth & Users** | **Better-Auth** / **Supabase Auth** | 50,000 monthly active users (MAU) free | \`npm install better-auth\` |\n`;
    res += `| **AI LLM Inference** | **Groq Cloud** / **Ollama (Local)** | Llama 3 70B @ 300 tokens/sec (Free API) | \`npm install groq-sdk\` |\n`;
    res += `| **Transactional Email** | **Resend** / **Brevo** | 3,000 emails/month free | \`npm install resend\` |\n`;
    res += `| **Object Storage** | **Cloudflare R2** | 10 GB/month, $0 egress fees | \`npm install @aws-sdk/client-s3\` |\n`;
    res += `| **Product Analytics** | **PostHog Cloud** / **Umami** | 1,000,000 events/month free | \`npm install posthog-js\` |\n`;
    res += `| **Error Tracking** | **Sentry** | 5,000 errors/month free | \`npm install @sentry/nextjs\` |\n\n`;

    res += `> [!TIP]\n`;
    res += `> Combining **Vercel + Neon + Upstash + Groq + Resend + PostHog** gives you a enterprise-grade stack capable of scaling to your first 5,000 active users at **$0 total cost**.\n`;

    return { content: [{ type: "text", text: res }] };
  }

  if (name === "get_free_apis_and_services_directory") {
    const cat = args.category || "all";

    let out = `# 🌐 100% Free Public APIs & Developer Services Directory\n`;
    out += `> Scouted from \`free-for-dev\`, \`public-apis\`, \`free-for-life\`, and \`best-free-things\`.\n\n`;

    if (cat === "all" || cat === "ai_llm_vision") {
      out += `### 🤖 AI, LLM & Computer Vision APIs ($0 Tier):\n`;
      out += `- **Groq Cloud API:** Free ultra-fast Llama-3 70B & Mixtral inference (https://console.groq.com)\n`;
      out += `- **Hugging Face Inference API:** 100,000+ open-source AI models free (https://huggingface.co)\n`;
      out += `- **Cloudflare Workers AI:** 10,000 free AI neuron requests per day (https://ai.cloudflare.com)\n`;
      out += `- **OpenRouter Free Tier:** Access to free open-source models with zero credit card (https://openrouter.ai)\n\n`;
    }

    if (cat === "all" || cat === "finance_crypto") {
      out += `### 📈 Finance, Stocks & Crypto APIs ($0 Tier):\n`;
      out += `- **CoinGecko API:** Free crypto prices, market cap & volume (10-30 calls/min free)\n`;
      out += `- **Alpha Vantage:** Free stock market time-series & FX data (25 calls/day free)\n`;
      out += `- **Frankfurter API:** Free open-source currency exchange rate API (No key required)\n\n`;
    }

    if (cat === "all" || cat === "geolocation_ip") {
      out += `### 🌍 Geolocation, Maps & IP APIs ($0 Tier):\n`;
      out += `- **ipapi.co:** Free IP geolocation lookup (30,000 requests/month free)\n`;
      out += `- **OpenStreetMap / Nominatim:** Free global geocoding & reverse geocoding\n`;
      out += `- **Mapbox:** 50,000 free web map loads per month\n\n`;
    }

    if (cat === "all" || cat === "email_communication") {
      out += `### ✉️ Email, SMS & Messaging APIs ($0 Tier):\n`;
      out += `- **Resend:** 3,000 emails/month free with React Email support (https://resend.com)\n`;
      out += `- **Brevo (Sendinblue):** 300 emails/day free forever\n`;
      out += `- **Telegram Bot API:** 100% free unlimited bot messages & push notifications\n\n`;
    }

    out += `> [!IMPORTANT]\n`;
    out += `> All APIs listed require **$0 upfront cost** and zero minimum spend commitments.\n`;

    return { content: [{ type: "text", text: out }] };
  }

  throw new Error(`Unknown tool in Free Tier module: ${name}`);
};
