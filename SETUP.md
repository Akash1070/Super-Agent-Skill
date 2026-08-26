# 🛠️ Universal 1-Click Setup Guide

`super-agent-skill` can be installed in **5 seconds** without cloning the repository manually!

---

## ⚡ Lazy 1-Click Setup (Zero Git Cloning Required)

Simply add this JSON block to your AI Agent's `mcp_config.json`:

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

---

## 📁 Config Locations by IDE / Agent

### 🤖 Claude Code & Claude Desktop
Add to `%APPDATA%\Claude\claude_desktop_config.json` (Windows) or `~/Library/Application Support/Claude/claude_desktop_config.json` (Mac).

### ⚡ Cursor IDE
Go to **Cursor Settings** -> **Features** -> **MCP** -> **Add New MCP Server**:
- **Name:** `super-agent-skill`
- **Type:** `command`
- **Command:** `npx -y github:Akash1070/Super-Agent-Skill`

### 🌊 Windsurf IDE
Add to `~/.codeium/windsurf/mcp_config.json`.

### 🚀 Antigravity / Gemini
Add to `C:\Users\<username>\.gemini\antigravity\mcp_config.json`.

### 🔌 VS Code (Cline / Roo Code / Continue)
Add to your extension's MCP configuration settings.
