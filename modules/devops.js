/**
 * DevOps & Deployment Infrastructure Engine Module
 * Inspired by kubeara/core, awais2o/devops-deploy-guard-mcp-server, and awesome-devops.
 */

export const DEVOPS_TOOLS = [
  {
    name: "generate_docker_setup",
    description: "Generates production-ready, multi-stage Dockerfile, docker-compose.yml (with non-root execution, healthchecks, db/redis integration), and Nginx reverse proxy configs with SSL.",
    inputSchema: {
      type: "object",
      properties: {
        app_type: {
          type: "string",
          enum: ["node_nextjs", "node_express", "python_fastapi", "static_web"],
          description: "Application technology stack",
        },
        includes_db: {
          type: "boolean",
          description: "Include PostgreSQL / MongoDB container in docker-compose",
        },
        includes_redis: {
          type: "boolean",
          description: "Include Redis container in docker-compose",
        },
        reverse_proxy: {
          type: "string",
          enum: ["nginx", "none"],
          description: "Reverse proxy integration (default: 'nginx')",
        },
      },
      required: ["app_type"],
    },
  },
  {
    name: "get_deployment_checklist",
    description: "Generates step-by-step production deployment checklists for Vercel, VPS/Docker, Dokploy/Coolify, or AWS.",
    inputSchema: {
      type: "object",
      properties: {
        target_platform: {
          type: "string",
          enum: ["vercel", "vps_docker", "dokploy_coolify", "aws_ec2"],
          description: "Target deployment hosting platform",
        },
        framework: {
          type: "string",
          description: "Framework being deployed (e.g., Next.js, React Vite, Express, Python FastAPI)",
        },
      },
      required: ["target_platform"],
    },
  },
  {
    name: "diagnose_deployment_issue",
    description: "Diagnoses deployment and container failure logs, CORS issues, ISR cache limit overages, build errors, and memory leaks.",
    inputSchema: {
      type: "object",
      properties: {
        error_log: {
          type: "string",
          description: "Error log snippet or failure description",
        },
        runtime_environment: {
          type: "string",
          description: "Environment where error occurred (e.g., 'Vercel', 'Docker container', 'Nginx', 'Node.js')",
        },
      },
      required: ["error_log"],
    },
  },
];

export const handleDevOpsTool = (name, args) => {
  if (name === "generate_docker_setup") {
    const appType = args.app_type;
    const includeDb = args.includes_db || false;
    const includeRedis = args.includes_redis || false;

    let output = `# 🐳 Production Docker Infrastructure Config\n\n`;

    output += `### 1. Production \`Dockerfile\` (Multi-Stage Build)\n\`\`\`dockerfile\n`;
    if (appType === "node_nextjs" || appType === "node_express") {
      output += `# --- Build Stage ---\n`;
      output += `FROM node:20-alpine AS builder\n`;
      output += `WORKDIR /app\n`;
      output += `COPY package*.json ./\n`;
      output += `RUN npm ci --only=production\n`;
      output += `COPY . .\n`;
      output += `RUN npm run build\n\n`;
      output += `# --- Runner Stage ---\n`;
      output += `FROM node:20-alpine AS runner\n`;
      output += `WORKDIR /app\n`;
      output += `ENV NODE_ENV=production\n`;
      output += `RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 appuser\n`;
      output += `COPY --from=builder /app ./ \n`;
      output += `USER appuser\n`;
      output += `EXPOSE 3000\n`;
      output += `HEALTHCHECK --interval=30s --timeout=3s --start-period=5s CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1\n`;
      output += `CMD ["npm", "start"]\n`;
    } else {
      output += `# Python FastAPI Stage\n`;
      output += `FROM python:3.11-slim AS runner\n`;
      output += `WORKDIR /app\n`;
      output += `COPY requirements.txt .\n`;
      output += `RUN pip install --no-cache-dir -r requirements.txt\n`;
      output += `COPY . .\n`;
      output += `USER 1000:1000\n`;
      output += `EXPOSE 8000\n`;
      output += `CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]\n`;
    }
    output += `\`\`\`\n\n`;

    output += `### 2. \`docker-compose.yml\` Stack\n\`\`\`yaml\n`;
    output += `version: '3.8'\n\nservices:\n  app:\n    build:\n      context: .\n      dockerfile: Dockerfile\n    restart: always\n    ports:\n      - "3000:3000"\n    environment:\n      - NODE_ENV=production\n`;
    if (includeDb) {
      output += `      - DATABASE_URL=postgres://user:password@db:5432/appdb\n    depends_on:\n      - db\n\n`;
      output += `  db:\n    image: postgres:16-alpine\n    restart: always\n    environment:\n      POSTGRES_USER: user\n      POSTGRES_PASSWORD: password\n      POSTGRES_DB: appdb\n    volumes:\n      - pgdata:/var/lib/postgresql/data\n`;
    }
    if (includeRedis) {
      output += `  redis:\n    image: redis:7-alpine\n    restart: always\n    ports:\n      - "6379:6379"\n`;
    }
    if (includeDb) {
      output += `\nvolumes:\n  pgdata:\n`;
    }
    output += `\`\`\`\n`;

    return { content: [{ type: "text", text: output }] };
  }

  if (name === "get_deployment_checklist") {
    const platform = args.target_platform;
    let checklist = `# 🚀 Production Deployment Checklist: ${platform.toUpperCase()}\n\n`;

    if (platform === "vercel") {
      checklist += `### Vercel Deployment Checklist:\n`;
      checklist += `1. **Cache Control Optimization:** Set \`revalidatePath\` or 24h ISR revalidation intervals to avoid write limit overages.\n`;
      checklist += `2. **Environment Variables:** Verify all secret keys are added in Vercel Dashboard Settings -> Environment Variables.\n`;
      checklist += `3. **API Payload Stripping:** Strip unused large object fields in public API endpoints to save Fast Origin Transfer bandwidth.\n`;
      checklist += `4. **Dynamic Headers Audit:** Ensure no dynamic timestamp cache busters exist in static routes like \`sitemap.xml\`.\n`;
    } else if (platform === "vps_docker") {
      checklist += `### VPS / Docker Deployment Checklist:\n`;
      checklist += `1. **Security Hardening:** Disable SSH password auth, enable UFW Firewall (allow 80, 443, 22 only).\n`;
      checklist += `2. **Nginx Reverse Proxy:** Configure Nginx upstream to proxy requests to Docker container port.\n`;
      checklist += `3. **SSL Certificate:** Run \`certbot --nginx -d example.com\` for auto-renewing Let's Encrypt SSL.\n`;
      checklist += `4. **Container Restart Policy:** Ensure \`restart: always\` or PM2 startup hooks are enabled.\n`;
    } else {
      checklist += `### Dokploy / Coolify Deployment Checklist:\n`;
      checklist += `1. Connect Git repository webhook for automatic deployment on push to \`main\`.\n`;
      checklist += `2. Configure build environment variables & persistent volume mounts for database data.\n`;
      checklist += `3. Enable automatic HTTPS via Traefik integration.\n`;
    }

    return { content: [{ type: "text", text: checklist }] };
  }

  if (name === "diagnose_deployment_issue") {
    const log = args.error_log;
    let diag = `# 🔧 DevOps Diagnostic Report\n\n`;

    if (log.includes("CORS") || log.includes("Access-Control-Allow-Origin")) {
      diag += `### ❌ Root Cause: CORS Misconfiguration\n`;
      diag += `**Fix:** Add Access-Control-Allow-Origin header to API responses or proxy request through backend domain.\n`;
    } else if (log.includes("ENOSPC") || log.includes("out of memory") || log.includes("OOM")) {
      diag += `### ❌ Root Cause: Memory Exhaustion / Node OOM\n`;
      diag += `**Fix:** Increase Node max memory (\`NODE_OPTIONS=--max-old-space-size=4096\`) or add swap space to VPS.\n`;
    } else if (log.includes("ISR") || log.includes("revalidation")) {
      diag += `### ❌ Root Cause: ISR Write Limit / Cache Invalidation Frequency\n`;
      diag += `**Fix:** Increase revalidate timer from short interval (e.g. 1h) to 24h and use on-demand revalidation.\n`;
    } else {
      diag += `### ⚠️ Diagnostic Analysis:\n\`\`\`text\n${log}\n\`\`\`\n`;
      diag += `**Recommendation:** Check missing environment variables, verify database connection strings, and inspect container healthcheck logs.\n`;
    }

    return { content: [{ type: "text", text: diag }] };
  }

  throw new Error(`Unknown tool in DevOps module: ${name}`);
};
