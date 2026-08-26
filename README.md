<div align="center">

# 🚀 Super Agent Skill (`super-agent-skill`)

### *The Universal Model Context Protocol (MCP) Super-Intelligence Engine for AI Coding Agents*

[![Author: Akash Kumar Jha](https://img.shields.io/badge/Author-Akash%20Kumar%20Jha-blueviolet.svg?style=for-the-badge)](https://github.com/Akash1070)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg?style=for-the-badge)](LICENSE)
[![MCP Protocol](https://img.shields.io/badge/MCP-Model%20Context%20Protocol-purple.svg?style=for-the-badge)](https://modelcontextprotocol.io)
[![Tools Count](https://img.shields.io/badge/Tools-28%20Active%20Tools-orange.svg?style=for-the-badge)](#-the-28-tool-suite-across-12-modules)
[![Auto Scout](https://img.shields.io/badge/Auto--Scout-24h%20Cron-cyan.svg?style=for-the-badge)](#-24-hour-autonomous-live-scouting)

---

**Equips AI Assistants (Claude Code, Cursor, Windsurf, OpenAI Codex, Antigravity, VS Code / Cline) with End-to-End Production Capabilities.**

[⚡ Quick 1-Click Setup](#-1-click-setup-for-any-ai-agent--ide) • [🗺️ 5-Phase Roadmap](#️-the-5-phase-production-roadmap) • [📦 Tool Matrix](#-the-28-tool-suite-across-12-modules) • [👤 Author](#-author--creator)

</div>

---

## ⚡ 1-Click Setup for ANY AI Agent & IDE

No complex terminal installation required! Simply copy and paste the JSON block below into your IDE's `mcp_config.json`:

```json
{
  "mcpServers": {
    "super-agent-skill": {
      "command": "npx",
      "args": [
        "-y",
        "github:Akash1070/Super-Agent-Skill"
      ]
    }
  }
}
```

<details>
<summary><b>📂 Click to view Config File Locations for your IDE</b></summary>

| IDE / AI Agent | Configuration File Location |
| :--- | :--- |
| **🤖 Claude Code / Claude Desktop** | `%APPDATA%\Claude\claude_desktop_config.json` (Windows)<br>`~/Library/Application Support/Claude/claude_desktop_config.json` (Mac) |
| **⚡ Cursor IDE** | **Cursor Settings** ➔ **Features** ➔ **MCP** ➔ Add `npx -y github:Akash1070/Super-Agent-Skill` |
| **🌊 Windsurf IDE** | `~/.codeium/windsurf/mcp_config.json` |
| **🚀 Antigravity / Gemini** | `~/.gemini/antigravity/mcp_config.json` |
| **🔌 VS Code (Cline / Roo Code)** | Extension MCP settings panel |

</details>

---

## 💡 Why Every Developer Needs `super-agent-skill`

Standard AI coding assistants suffer from **3 major bottlenecks**:
1. 🧠 **Memory Loss:** They forget your preferences, styling habits, and past mistake fixes in new chat sessions.
2. 🎨 **Generic UI Taste:** They default to plain colors, standard HTML buttons, and unstyled typography.
3. 📉 **Static Cutoff Data:** They rely on old training data and miss newly trending open-source tools.

> ### ✨ How Super Agent Skill Solves This:
> `super-agent-skill` injects **persistent JSON memory**, **curated design systems (Google Fonts, HSL palettes, Glassmorphism)**, and a **24-hour live GitHub scouting engine** directly into your AI assistant's brain!

---

## 🗺️ The 5-Phase Production Roadmap

Your AI Coding Agent uses this MCP skill step-by-step to guide your projects from initial idea to live deployment:

```
💡 PHASE 1              🎨 PHASE 2              💻 PHASE 3              🛡️ PHASE 4              🏁 PHASE 5
Ideation & Auth        Web & Mobile Design    Dev & Code Quality      Security & Vitals      DevOps & Deploy
┌────────────────┐     ┌────────────────┐     ┌────────────────┐     ┌────────────────┐     ┌────────────────┐
│ • Backend Stack│────►│ • Design System│────►│ • Karpathy Rule│────►│ • OWASP Audit  │────►│ • Multi-Stage  │
│ • Better-Auth  │     │ • Mobile Apps  │     │ • Code Compreh.│     │ • Web Vitals   │     │   Docker       │
│ • Zod Schemas  │     │ • Hero Bluepr. │     │ • CoT Prompting│     │ • Playwright   │     │ • CI/CD Github │
└────────────────┘     └────────────────┘     └────────────────┘     └────────────────┘     └────────────────┘
```

<details>
<summary><b>🔍 Click to expand details for all 5 Phases</b></summary>

### 💡 Phase 1: Ideation & Architecture
- `get_backend_stack_recommendation`: Recommends optimal stack (PocketBase, PostgreSQL, Express, FastAPI).
- `get_auth_architecture_blueprint`: Better-Auth, OAuth2, and JWT rotation blueprints.
- `generate_typesafe_api_contract`: Zod schemas & TypeScript type contracts.
- `scout_and_update_skill_library`: Live GitHub scouting for state-of-the-art open-source libraries.

### 🎨 Phase 2: Web & Mobile Design (UI/UX)
- `get_design_system_recommendation`: Tailored palettes (HEX/HSL), Google Fonts, Glassmorphism/OLED Dark styles.
- `get_ui_component_blueprint`: Landing Page Heroes, Cmd+K Palettes, Data Tables, Stat Cards.
- `get_mobile_app_blueprint`: React Native (Expo) and Flutter mobile screen layouts.
- `audit_ui_design_aesthetic`: Audits code against generic colors and static anti-patterns.

### 💻 Phase 3: Development & Code Quality
- `get_karpathy_rules`: Enforces "Think Before Coding," "Simplicity First," and "Surgical Scope."
- `evaluate_coding_plan`: Validates implementation plans against over-engineering risks.
- `get_code_comprehension_strategy`: Maps complex codebases cleanly without hallucinations.
- `optimize_agent_prompt`: Generates CoT system prompts for complex refactoring.

### 🛡️ Phase 4: Security, Performance & QA Testing
- `audit_security_vulnerabilities`: Scans for secret leaks, SQLi, innerHTML XSS, and weak CORS headers.
- `generate_security_hardening`: Generates CSP headers, Helmet middleware, and rate-limiting.
- `audit_performance_bottlenecks`: Detects N+1 query traps, React re-render cascades, and unindexed SQL.
- `generate_caching_strategy`: Redis caching layers & PostgreSQL indexing strategies.
- `generate_test_suite_blueprint`: Playwright E2E, Vitest, and PyTest test suite generators.

### 🐳 Phase 5: DevOps, Docker & Production Deployment
- `generate_docker_setup`: Multi-stage Dockerfile, `docker-compose.yml`, and Nginx SSL configs.
- `get_deployment_checklist`: Step-by-step production checklists for Vercel, VPS, Coolify, AWS.
- `diagnose_deployment_issue`: OOM killer, CORS overage, and build failure diagnostics.
- `generate_github_actions_workflow`: GitHub Actions CI/CD workflows for automated testing and deployment.

</details>

---

## 🌐 24-Hour Autonomous Live Scouting

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 🤖 GitHub Actions (Daily 00:00 UTC Cron)                                   │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ Auto-Scouts GitHub & Commits
                                       ▼
┌──────────────────────────────────┐        ┌──────────────────────────────────┐
│ 🚀 Local 24h Background Cron     │───────►│ data/agent_memory.json           │
│ (Runs silently every 24 hours)   │        │ • Live Discovered Intelligence   │
└──────────────────────────────────┘        └──────────────────────────────────┘
```

Automatically tracks trending open-source projects across **Mobile Apps (React Native/Flutter)**, **Web Boilerplates**, **UI Design Systems**, **DevOps**, and **Databases**, updating your local agent memory continuously!

---

## 📦 The 28-Tool Suite Across 12 Modules

| Module | Purpose | Tools Provided |
| :--- | :--- | :--- |
| **1. Live GitHub Scout** | Real-time GitHub search & auto-updater | `scout_and_update_skill_library`, `get_latest_trending_repos` |
| **2. Memory & Learning** | Persistent user habit & mistake autopsy storage | `log_user_preference`, `log_mistake_autopsy`, `get_agent_memory` |
| **3. Auth & Architecture** | Modern auth & backend stack recommendations | `get_auth_architecture_blueprint`, `get_backend_stack_recommendation` |
| **4. Prompt Intelligence** | Code comprehension & system prompt optimization | `get_code_comprehension_strategy`, `optimize_agent_prompt` |
| **5. UI/UX & Mobile Design** | Design system generator & mobile layout blueprints | `get_design_system_recommendation`, `get_ui_component_blueprint`, `get_mobile_app_blueprint`, `audit_ui_design_aesthetic` |
| **6. DevOps & Deploy** | Multi-stage Docker generator & failure diagnosis | `generate_docker_setup`, `get_deployment_checklist`, `diagnose_deployment_issue` |
| **7. Code Security** | OWASP security auditor & code hardening | `audit_security_vulnerabilities`, `generate_security_hardening` |
| **8. Karpathy Guidelines** | Surgical scope & goal verification guidelines | `get_karpathy_rules`, `evaluate_coding_plan`, `generate_verification_checklist` |
| **9. Performance & Vitals** | Web Vitals audit & Redis caching strategies | `audit_performance_bottlenecks`, `generate_caching_strategy` |
| **10. Testing & QA** | Playwright / Vitest / PyTest test suite generator | `generate_test_suite_blueprint` |
| **11. API Contracts** | Zod schema & TypeScript type contract generator | `generate_typesafe_api_contract` |
| **12. GitHub CI/CD** | Production GitHub Actions workflow generator | `generate_github_actions_workflow` |

---

## 👤 Author & Creator

<div align="center">

### **Akash Kumar Jha**
*Lead AI Systems Architect & Open-Source Contributor*

[![GitHub](https://img.shields.io/badge/GitHub-Akash1070-181717.svg?style=for-the-badge&logo=github)](https://github.com/Akash1070)
[![Repo](https://img.shields.io/badge/Repo-Super--Agent--Skill-blue.svg?style=for-the-badge&logo=github)](https://github.com/Akash1070/Super-Agent-Skill)

</div>

---

## 📄 License

Distributed under the **MIT License**. Copyright (c) 2026 **Akash Kumar Jha**. Free to use, modify, and distribute for personal and commercial applications.
