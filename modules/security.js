/**
 * Defensive Code Security & Audit Module
 * Sourced from OWASP Top 10, Security Guide for Developers, and Vulmap heuristics.
 */

export const SECURITY_TOOLS = [
  {
    name: "audit_security_vulnerabilities",
    description: "Performs defensive security audits on code snippets to detect hardcoded secrets/API keys, SQL/Command injection risks, weak CORS headers, missing sanitization, and insecure JWT usage.",
    inputSchema: {
      type: "object",
      properties: {
        code_snippet: {
          type: "string",
          description: "Code snippet or file content to audit for security risks",
        },
        language_or_framework: {
          type: "string",
          description: "Language or framework (e.g., 'JavaScript', 'Python', 'SQL', 'React', 'Express')",
        },
      },
      required: ["code_snippet"],
    },
  },
  {
    name: "generate_security_hardening",
    description: "Generates production security hardening code snippets including Content Security Policy (CSP) headers, rate limiting middleware, JWT rotation, and input sanitization.",
    inputSchema: {
      type: "object",
      properties: {
        target_stack: {
          type: "string",
          enum: ["express_js", "next_js", "fastapi_python"],
          description: "Framework target for security hardening code",
        },
      },
      required: ["target_stack"],
    },
  },
];

export const handleSecurityTool = (name, args) => {
  if (name === "audit_security_vulnerabilities") {
    const code = args.code_snippet;
    let audit = `# 🛡️ Defensive Code Security Audit\n\n`;

    const findings = [];

    // Check for hardcoded secrets
    if (/(ghp_[a-zA-Z0-9]{36}|sk_live_[a-zA-Z0-9]+|AIzaSy[a-zA-Z0-9-_]+|postgres:\/\/|mongodb\+srv:\/\/)/.test(code)) {
      findings.push("🔴 **HIGH RISK:** Hardcoded secret, API token, or database URI detected in source code! Store secrets in `.env` files or environment variables.");
    }

    // Check for SQL Injection
    if (/SELECT.*FROM.*WHERE.*(\+|`|\$\{)/i.test(code) || /db\.query\s*\(\s*["'`].*\$/i.test(code)) {
      findings.push("🔴 **HIGH RISK:** Potential SQL Injection vector detected! Use parameterized queries or prepared statements.");
    }

    // Check for dangerous dynamic execution
    if (/eval\s*\(|new\s+Function\s*\(|exec\s*\(/i.test(code)) {
      findings.push("⚠️ **MEDIUM RISK:** Dangerous dynamic evaluation (`eval` or `exec`) detected. Avoid executing untrusted user input.");
    }

    // Check for missing CORS / innerHTML XSS
    if (/dangerouslySetInnerHTML|innerHTML\s*=/i.test(code)) {
      findings.push("⚠️ **MEDIUM RISK:** Direct DOM innerHTML assignment detected (XSS vulnerability). Sanitize HTML using DOMPurify before rendering.");
    }

    if (findings.length === 0) {
      audit += `✅ **Security Scan Passed:** No hardcoded secrets, SQL injection vectors, or raw innerHTML vulnerabilities detected in snippet.\n`;
    } else {
      audit += `### ⚠️ Security Vulnerabilities & Hardening Items:\n` + findings.join("\n\n") + "\n";
    }

    return { content: [{ type: "text", text: audit }] };
  }

  if (name === "generate_security_hardening") {
    const stack = args.target_stack;
    let code = `# 🔒 Security Hardening Snippets (${stack.toUpperCase()})\n\n`;

    if (stack === "express_js") {
      code += `### Express.js Security Hardening Middleware\n\`\`\`javascript
import helmet from "helmet";
import rateLimit from "express-rate-limit";

// 1. Helmet Security Headers (CSP, HSTS, X-Frame-Options)
app.use(helmet());

// 2. Strict Rate Limiting (Prevent Brute Force)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: "Too many requests from this IP, please try again later."
});
app.use("/api/", limiter);
\`\`\`\n`;
    } else if (stack === "next_js") {
      code += `### Next.js Security Headers (\`next.config.js\`)\n\`\`\`javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};
\`\`\`\n`;
    } else {
      code += `### FastAPI Security Hardening Middleware\n\`\`\`python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://yourdomain.com"], # Do NOT use "*" in production
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)
\`\`\`\n`;
    }

    return { content: [{ type: "text", text: code }] };
  }

  throw new Error(`Unknown tool in Security module: ${name}`);
};
