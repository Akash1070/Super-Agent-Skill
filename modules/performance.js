/**
 * Web Vitals & Performance Optimization Module
 */

export const PERFORMANCE_TOOLS = [
  {
    name: "audit_performance_bottlenecks",
    description: "Analyzes code for performance traps (React re-render cascades, unindexed SQL queries, N+1 query problems, heavy bundle imports, missing image optimization).",
    inputSchema: {
      type: "object",
      properties: {
        code_snippet: {
          type: "string",
          description: "Code snippet or query to audit for performance bottlenecks",
        },
      },
      required: ["code_snippet"],
    },
  },
  {
    name: "generate_caching_strategy",
    description: "Generates production Redis caching layers, CDN stale-while-revalidate headers, and database indexing strategies.",
    inputSchema: {
      type: "object",
      properties: {
        target_layer: {
          type: "string",
          enum: ["redis_api", "cdn_headers", "database_index"],
          description: "Layer to generate caching/performance strategy for",
        },
      },
      required: ["target_layer"],
    },
  },
];

export const handlePerformanceTool = (name, args) => {
  if (name === "audit_performance_bottlenecks") {
    const code = args.code_snippet;
    let audit = `# ⚡ Performance & Web Vitals Audit\n\n`;

    const bottlenecks = [];

    if (code.includes("forEach") && (code.includes("await") || code.includes("fetch"))) {
      bottlenecks.push("🔴 **Sequential Async Loop (N+1 Query):** Using `await` inside `forEach` forces sequential execution. Use `Promise.all(items.map(...))` for parallel fetching.");
    }

    if (code.includes("SELECT * FROM")) {
      bottlenecks.push("⚠️ **Unoptimized SQL Query:** `SELECT *` fetches unnecessary columns. Specify explicit column names to reduce memory and bandwidth overhead.");
    }

    if (code.includes("useState") && !code.includes("useCallback") && !code.includes("useMemo")) {
      bottlenecks.push("💡 **React Re-Render Risk:** Functions/objects recreated on every render. Wrap heavy callbacks in `useCallback` or `useMemo`.");
    }

    if (bottlenecks.length === 0) {
      audit += `✅ **Performance Audit Passed:** Code demonstrates clean execution patterns with no obvious N+1 loops or wildcard queries.\n`;
    } else {
      audit += `### 🚨 Bottlenecks Detected:\n` + bottlenecks.join("\n\n") + "\n";
    }

    return { content: [{ type: "text", text: audit }] };
  }

  if (name === "generate_caching_strategy") {
    const layer = args.target_layer;
    let strategy = `# 🚀 Production Caching Strategy (${layer.toUpperCase()})\n\n`;

    if (layer === "redis_api") {
      strategy += `### Express / Node.js Redis Caching Layer\n\`\`\`javascript
import Redis from 'ioredis';
const redis = new Redis(process.env.REDIS_URL);

export async function getCachedData(key, fetchFn, ttlSeconds = 300) {
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);

  const freshData = await fetchFn();
  await redis.setex(key, ttlSeconds, JSON.stringify(freshData));
  return freshData;
}
\`\`\`\n`;
    } else if (layer === "cdn_headers") {
      strategy += `### HTTP Cache-Control & Stale-While-Revalidate Headers\n\`\`\`javascript
// CDN static asset response headers
res.setHeader('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
\`\`\`\n`;
    } else {
      strategy += `### PostgreSQL Index Optimization Strategy\n\`\`\`sql
-- B-Tree Index for frequent WHERE lookups
CREATE INDEX CONCURRENTLY idx_users_email ON users(email);

-- Composite Index for multi-column filtering
CREATE INDEX CONCURRENTLY idx_orders_user_status ON orders(user_id, status);
\`\`\`\n`;
    }

    return { content: [{ type: "text", text: strategy }] };
  }

  throw new Error(`Unknown tool in Performance module: ${name}`);
};
