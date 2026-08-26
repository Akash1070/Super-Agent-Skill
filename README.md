<div align="center">

# 🚀 Super Agent Skill (`super-agent-skill`)

### *The Universal Model Context Protocol (MCP) Super-Intelligence Engine for AI Coding Agents*

[![Author: Akash Kumar Jha](https://img.shields.io/badge/Author-Akash%20Kumar%20Jha-blueviolet.svg?style=for-the-badge)](https://github.com/Akash1070)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg?style=for-the-badge)](LICENSE)
[![MCP Protocol](https://img.shields.io/badge/MCP-Model%20Context%20Protocol-purple.svg?style=for-the-badge)](https://modelcontextprotocol.io)
[![Tools Count](https://img.shields.io/badge/Tools-33%20Active%20Tools-orange.svg?style=for-the-badge)](#-the-33-tool-suite-across-14-modules)
[![In-IDE Dashboard](https://img.shields.io/badge/In--IDE-Dashboard-brightgreen.svg?style=for-the-badge)](#-in-ide-visual-intelligence-dashboard)

---

**Equips AI Assistants (Claude Code, Cursor, Windsurf, OpenAI Codex, Antigravity, VS Code / Cline) with End-to-End Production Capabilities.**

[⚡ Quick 1-Click Setup](#-1-click-setup-for-any-ai-agent--ide) • [🖥️ In-IDE Dashboard](#-in-ide-visual-intelligence-dashboard) • [🗺️ 5-Phase Roadmap](#️-the-5-phase-production-roadmap) • [📦 Tool Matrix](#-the-33-tool-suite-across-14-modules) • [👤 Author](#-author--creator)

</div>

---

## 🖥️ In-IDE Visual Intelligence Dashboard

Zero setup required! Developers get a live Intelligence Dashboard **directly inside their IDE chat window** using the tool `get_live_memory_dashboard`:

```markdown
> [!NOTE]
> ### 🚀 In-IDE Improvement Summary: Auth Middleware Hardening
>
> **What Was Improved:**
> - ✅ Applied HSL Dark OLED design system palette
> - ✅ Implemented rate-limiting middleware & HSTS headers
> - ✅ Fixed N+1 SQL query trap with batch fetching
>
> **Metrics Comparison:**
> - **BEFORE:** `Security: WEAK / SQL Injection Risk`
> - **AFTER:** `Security: HARDENED / OWASP Compliant`
>
> **Safety Verification:** Verified surgical scope & Karpathy zero-collateral edits.
```

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

## 🗺️ The 5-Phase Production Roadmap

```
💡 PHASE 1              🎨 PHASE 2              💻 PHASE 3              🛡️ PHASE 4              🏁 PHASE 5
Ideation & Auth        Web & Mobile Design    Dev & Code Quality      Security & Vitals      DevOps & Deploy
┌────────────────┐     ┌────────────────┐     ┌────────────────┐     ┌────────────────┐     ┌────────────────┐
│ • Backend Stack│────►│ • Design System│────►│ • Karpathy Rule│────►│ • OWASP Audit  │────►│ • Multi-Stage  │
│ • Better-Auth  │     │ • Mobile Apps  │     │ • Code Compreh.│     │ • Web Vitals   │     │   Docker       │
│ • Zod Schemas  │     │ • Hero Bluepr. │     │ • Refactor ESM │     │ • Playwright   │     │ • Auto PR Fixer│
└────────────────┘     └────────────────┘     └────────────────┘     └────────────────┘     └────────────────┘
```

<details>
<summary><b>🔍 Click to expand details for all 5 Phases</b></summary>

### 💡 Phase 1: Ideation & Architecture
- `get_backend_stack_recommendation`: Recommends optimal stack (PocketBase, PostgreSQL, Express, FastAPI).
- `get_auth_architecture_blueprint`: Better-Auth, OAuth2, and JWT rotation blueprints.
- `generate_typesafe_api_contract`: Zod schemas & TypeScript type contracts.
- `scout_and_update_skill_library`: Live GitHub scouting for state-of-the-art open-source libraries.

### 🎨 Phase 2: Web & Mobile Design (UI/UX) & SEO
- `get_design_system_recommendation`: Tailored palettes (HEX/HSL), Google Fonts, Glassmorphism/OLED Dark styles.
- `get_ui_component_blueprint`: Landing Page Heroes, Cmd+K Palettes, Data Tables, Stat Cards.
- `get_mobile_app_blueprint`: React Native (Expo) and Flutter mobile screen layouts.
- `audit_ui_design_aesthetic`: Audits code against generic colors and static anti-patterns.
- `generate_seo_metadata_blueprint`: Generates OpenGraph social preview tags, Twitter Cards, and JSON-LD schema.

### 💻 Phase 3: Development, Quality & Refactoring
- `modernize_legacy_code`: Upgrades CommonJS to ESM, Class components to Hooks, var to const/let.
- `detect_dead_code_and_bloat`: Scans for leftover console.log, un-tree-shakable imports, and dead code.
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
- `generate_autonomous_pr_fixer`: Automated GitHub Action to fix reported issue bugs via Pull Requests.

</details>

---

## 📦 The 33-Tool Suite Across 14 Modules

| Module | Purpose | Tools Provided |
| :--- | :--- | :--- |
| **1. Live GitHub Scout** | Real-time GitHub search & auto-updater | `scout_and_update_skill_library`, `get_latest_trending_repos` |
| **2. Memory & Learning** | Persistent user habit & mistake autopsy storage | `log_user_preference`, `log_mistake_autopsy`, `get_agent_memory`, `get_live_memory_dashboard`, `generate_in_ide_improvement_notification` |
| **3. Auth & Architecture** | Modern auth & backend stack recommendations | `get_auth_architecture_blueprint`, `get_backend_stack_recommendation` |
| **4. Prompt Intelligence** | Code comprehension & system prompt optimization | `get_code_comprehension_strategy`, `optimize_agent_prompt` |
| **5. UI/UX & Mobile Design** | Design system generator & mobile layout blueprints | `get_design_system_recommendation`, `get_ui_component_blueprint`, `get_mobile_app_blueprint`, `audit_ui_design_aesthetic` |
| **6. DevOps & Deploy** | Multi-stage Docker generator & failure diagnosis | `generate_docker_setup`, `get_deployment_checklist`, `diagnose_deployment_issue` |
| **7. Code Security** | OWASP security auditor & code hardening | `audit_security_vulnerabilities`, `generate_security_hardening` |
| **8. Karpathy Guidelines** | Surgical scope & goal verification guidelines | `get_karpathy_rules`, `evaluate_coding_plan`, `generate_verification_checklist` |
| **9. Performance & Vitals** | Web Vitals audit & Redis caching strategies | `audit_performance_bottlenecks`, `generate_caching_strategy` |
| **10. Testing & QA** | Playwright / Vitest / PyTest test suite generator | `generate_test_suite_blueprint` |
| **11. API Contracts** | Zod schema & TypeScript type contract generator | `generate_typesafe_api_contract` |
| **12. GitHub CI/CD** | Production GitHub Actions workflow generator | `generate_github_actions_workflow`, `generate_autonomous_pr_fixer` |
| **13. Code Refactoring** | Code modernization & dead code bloat detection | `modernize_legacy_code`, `detect_dead_code_and_bloat` |
| **14. SEO & OpenGraph** | Social meta tags & JSON-LD schema generator | `generate_seo_metadata_blueprint` |

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
