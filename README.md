# 🚀 Super Agent Skills MCP (`super-agent-skills-mcp`)

[![Author: Akash Kumar Jha](https://img.shields.io/badge/Author-Akash%20Kumar%20Jha-blueviolet.svg)](#-author--creator)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![MCP Protocol](https://img.shields.io/badge/MCP-Model%20Context%20Protocol-purple.svg)](https://modelcontextprotocol.io)
[![Node.js](https://img.shields.io/badge/Node.js-20%2B-blue.svg)](https://nodejs.org)
[![Tools Count](https://img.shields.io/badge/Tools-27%20Active%20Tools-orange.svg)](#-the-27-tool-suite)

> **Created & Architected by Akash Kumar Jha.**
> Universal Model Context Protocol (MCP) server compatible with **ALL AI Coding Agents** (Claude Code, Cursor, Windsurf, OpenAI Codex, Antigravity, VS Code / Cline). Equips your AI agent with persistent **Memory Learning**, **Live GitHub Scouting**, **UI/UX Design Systems**, **DevOps & Docker Engine**, **Defensive Security Auditing**, and **Performance Optimization**.

---

## ⚡ Compatible With All AI Coding Agents & IDEs

`super-agent-skills-mcp` works out of the box with any MCP-compliant AI assistant:
- 🤖 **Claude Code & Claude Desktop**
- ⚡ **Cursor IDE**
- 🌊 **Windsurf**
- 🤖 **OpenAI Codex / ChatGPT Desktop**
- 🚀 **Antigravity AI**
- 🔌 **VS Code (Cline, Roo Code, Continue.dev)**

---

## 💡 How This Supercharges Your AI Agent & Coding Quality

Standard AI coding agents often suffer from 4 major limitations:
1. **Memory Loss:** They forget your preferences, styling habits, and past mistake fixes in new chat sessions.
2. **Outdated Knowledge:** They rely on static training data cutoffs and miss newly trending GitHub libraries.
3. **Generic UI Design:** They default to boring browser defaults, plain colors, and static buttons.
4. **Unchecked Code Security & Performance:** They can introduce SQL injection vectors, unindexed queries, or CORS bugs.

### 🌟 How `super-agent-skills-mcp` Solves This:
* **🧠 Persistent Agent Learning Loop:** Automatically logs user preferences and mistake autopsies into local memory (`agent_memory.json`). Your agent gets smarter with every prompt and **never repeats a mistake**.
* **🔍 Real-Time Live GitHub Scouting:** Whenever you ask to build something, the agent automatically searches GitHub live for newly trending libraries, design systems, and state-of-the-art frameworks, writing learned rules into memory.
* **🎨 Great Design Taste & Aesthetics:** Gives your agent immediate access to curated HSL color palettes, Google Fonts pairings, modern visual themes (Glassmorphism, OLED Dark, Soft UI), and component blueprints.
* **🛡️ Security & Performance Guard:** Audits code against OWASP vulnerabilities (secret leaks, SQLi, innerHTML XSS) and performance traps (N+1 queries, React re-render cascades).

---

## 📦 The 27-Tool Suite (Across 12 Modules)

| Module | Core Purpose | Tools Provided |
| :--- | :--- | :--- |
| **1. Live GitHub Scout** | Real-time GitHub search & knowledge auto-updater | `scout_and_update_skill_library`, `get_latest_trending_repos` |
| **2. Memory & Learning** | Persistent user habit & mistake autopsy storage | `log_user_preference`, `log_mistake_autopsy`, `get_agent_memory` |
| **3. Auth & Architecture** | Modern auth & backend stack recommendations | `get_auth_architecture_blueprint`, `get_backend_stack_recommendation` |
| **4. Prompt Intelligence** | Code comprehension & system prompt optimization | `get_code_comprehension_strategy`, `optimize_agent_prompt` |
| **5. UI/UX Design** | Design system generator & aesthetic auditor | `get_design_system_recommendation`, `get_ui_component_blueprint`, `audit_ui_design_aesthetic` |
| **6. DevOps & Deploy** | Multi-stage Docker generator & failure diagnosis | `generate_docker_setup`, `get_deployment_checklist`, `diagnose_deployment_issue` |
| **7. Code Security** | OWASP security auditor & code hardening | `audit_security_vulnerabilities`, `generate_security_hardening` |
| **8. Karpathy Guidelines** | Surgical scope & goal verification guidelines | `get_karpathy_rules`, `evaluate_coding_plan`, `generate_verification_checklist` |
| **9. Performance & Vitals** | Web Vitals audit & Redis caching strategies | `audit_performance_bottlenecks`, `generate_caching_strategy` |
| **10. Testing & QA** | Playwright / Vitest / PyTest test suite generator | `generate_test_suite_blueprint` |
| **11. API Contracts** | Zod schema & TypeScript type contract generator | `generate_typesafe_api_contract` |
| **12. GitHub CI/CD** | Production GitHub Actions workflow generator | `generate_github_actions_workflow` |

---

## ⚡ Easy Setup for Any AI Agent / IDE

### Step 1: Clone & Install Dependencies
```bash
git clone https://github.com/AkashKumarJha/super-agent-skills-mcp.git
cd super-agent-skills-mcp
npm install
```

---

### Step 2: Add Config Snippet for Your AI Agent

#### 1. Claude Desktop / Claude Code
File path: `%APPDATA%\Claude\claude_desktop_config.json` (Windows) or `~/Library/Application Support/Claude/claude_desktop_config.json` (Mac)

```json
{
  "mcpServers": {
    "super-agent-skills": {
      "command": "node",
      "args": [
        "/path/to/super-agent-skills-mcp/index.js"
      ]
    }
  }
}
```

#### 2. Cursor IDE
Open **Cursor Settings -> Features -> MCP**, click **Add New MCP Server**:
- **Name:** `super-agent-skills`
- **Type:** `command`
- **Command:** `node /path/to/super-agent-skills-mcp/index.js`

#### 3. Antigravity / Gemini
File path: `C:\Users\<username>\.gemini\antigravity\mcp_config.json`

```json
{
  "mcpServers": {
    "super-agent-skills": {
      "command": "node",
      "args": [
        "C:\\path\\to\\super-agent-skills-mcp\\index.js"
      ]
    }
  }
}
```

#### 4. Windsurf / VS Code (Cline & Roo Code)
Add to your environment's `mcp_config.json` under `"mcpServers"`.

---

## 👤 Author & Creator

**Akash Kumar Jha**
* Architect & Lead Developer of `super-agent-skills-mcp`.
* Building next-generation AI agent skills and open-source Model Context Protocol tooling.

---

## 📄 License

Distributed under the **MIT License**. Copyright (c) 2026 **Akash Kumar Jha**. Free to use, modify, and distribute for personal and commercial applications.
