/**
 * Auth & Backend Architecture Intelligence Module
 * Inspired by better-auth, pocketbase, appwrite, sahat/hackathon-starter, and garrytan/gstack.
 */

export const ARCHITECTURE_AUTH_TOOLS = [
  {
    name: "get_auth_architecture_blueprint",
    description: "Generates production authentication blueprints (using better-auth, NextAuth, OAuth2, JWT rotation, session tokens, rate-limiting, and password hashing strategies).",
    inputSchema: {
      type: "object",
      properties: {
        auth_type: {
          type: "string",
          enum: ["better_auth_next", "express_jwt_session", "oauth2_social", "pocketbase_auth"],
          description: "Authentication stack strategy",
        },
        features: {
          type: "array",
          items: { type: "string" },
          description: "Features needed (e.g. ['email_password', 'google_oauth', 'two_factor', 'session_revoke'])",
        },
      },
      required: ["auth_type"],
    },
  },
  {
    name: "get_backend_stack_recommendation",
    description: "Recommends high-performance backend architecture (PocketBase, Appwrite, Express, FastAPI, PostgreSQL + Prisma/Drizzle) based on project scale, speed, and database requirements.",
    inputSchema: {
      type: "object",
      properties: {
        project_type: {
          type: "string",
          description: "Type of application being built (e.g., 'realtime_chat', 'saas_mvp', 'high_scale_api', 'local_first_app')",
        },
        expected_scale: {
          type: "string",
          enum: ["prototype", "growth", "enterprise"],
          description: "Expected scale of the application",
        },
      },
      required: ["project_type"],
    },
  },
];

export const handleArchitectureAuthTool = (name, args) => {
  if (name === "get_auth_architecture_blueprint") {
    const authType = args.auth_type;
    let report = `# 🔐 Authentication Blueprint: ${authType.toUpperCase()}\n\n`;

    if (authType === "better_auth_next") {
      report += `### Modern \`better-auth\` Setup for Next.js\n\`\`\`typescript
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },
});
\`\`\`\n`;
    } else if (authType === "express_jwt_session") {
      report += `### Express.js Secure JWT + HttpOnly Refresh Cookie Setup\n\`\`\`javascript
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Password Hashing
export async function hashPassword(password) {
  return await bcrypt.hash(password, 12);
}

// Token Generation
export function generateTokens(user) {
  const accessToken = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
  return { accessToken, refreshToken };
}

// Secure HttpOnly Cookie Attachment
export function sendAuthCookies(res, accessToken, refreshToken) {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
  res.json({ accessToken });
}
\`\`\`\n`;
    } else {
      report += `### PocketBase Auth Blueprint\n\`\`\`javascript
import PocketBase from 'pocketbase';
const pb = new PocketBase('http://127.0.0.1:8090');

// Authenticate with email/password
const authData = await pb.collection('users').authWithPassword('user@example.com', 'password123');

// Auto refresh auth state
pb.authStore.onChange((token, model) => {
  console.log('User auth state changed:', model?.email);
});
\`\`\`\n`;
    }

    return { content: [{ type: "text", text: report }] };
  }

  if (name === "get_backend_stack_recommendation") {
    const pType = args.project_type.toLowerCase();
    let rec = `# 🏗️ Backend Stack Recommendation\n\n`;

    if (pType.includes("saas") || pType.includes("mvp")) {
      rec += `### Recommended Architecture: **PocketBase / Supabase + Next.js**\n`;
      rec += `- **Speed:** Ultra-fast launch (Built-in Auth, Admin UI, Realtime Subscriptions).\n`;
      rec += `- **Database:** SQLite / PostgreSQL with automatic migrations.\n`;
      rec += `- **ORM:** Drizzle ORM or Prisma for type-safe queries.\n`;
    } else if (pType.includes("realtime") || pType.includes("chat")) {
      rec += `### Recommended Architecture: **Node.js + WebSockets / Socket.io + Redis + PostgreSQL**\n`;
      rec += `- **Realtime Engine:** Node.js event-loop with Redis Pub/Sub adapter for scaling across instances.\n`;
      rec += `- **Message Persistence:** PostgreSQL with partitioned tables for message history.\n`;
    } else {
      rec += `### Recommended Architecture: **Node.js (Express/Fastify) + PostgreSQL + Redis**\n`;
      rec += `- **API Layer:** Fastify / Express with Zod input validation schemas.\n`;
      rec += `- **Security:** Helmet headers, express-rate-limit, CORS restriction.\n`;
    }

    return { content: [{ type: "text", text: rec }] };
  }

  throw new Error(`Unknown tool in Architecture/Auth module: ${name}`);
};
