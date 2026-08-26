# 🛠️ Universal Setup Guide for All AI Agents & IDEs

`super-agent-skills-mcp` works seamlessly across all major AI coding platforms and IDEs.

---

## Step 1: Clone & Install Dependencies
Open your terminal and run:

```bash
git clone https://github.com/Akash1070/Super-Agent-Skill.git
cd super-agent-skills-mcp
npm install
```

---

## Step 2: Test MCP Startup Locally
```bash
npm start
```
You should see output indicating:
`🚀 Super Agent Skills MCP Server v3.5 Live Scout Edition running on stdio`

---

## Step 3: Add to Your Favorite AI Coding Agent

### 🤖 Claude Code & Claude Desktop
Add to `%APPDATA%\Claude\claude_desktop_config.json` (Windows) or `~/Library/Application Support/Claude/claude_desktop_config.json` (Mac):

```json
{
  "mcpServers": {
    "super-agent-skills": {
      "command": "node",
      "args": [
        "FULL_PATH_TO/super-agent-skills-mcp/index.js"
      ]
    }
  }
}
```

---

### ⚡ Cursor IDE
1. Open **Cursor Settings** (`Cmd+,` or `Ctrl+,`) -> **Features** -> **MCP**.
2. Click **+ Add New MCP Server**.
3. Set **Name:** `super-agent-skills`
4. Set **Type:** `command`
5. Set **Command:** `node FULL_PATH_TO/super-agent-skills-mcp/index.js`

---

### 🌊 Windsurf IDE
Add to `~/.codeium/windsurf/mcp_config.json`:

```json
{
  "mcpServers": {
    "super-agent-skills": {
      "command": "node",
      "args": [
        "FULL_PATH_TO/super-agent-skills-mcp/index.js"
      ]
    }
  }
}
```

---

### 🚀 Antigravity / Gemini
Add to `C:\Users\<username>\.gemini\antigravity\mcp_config.json`:

```json
{
  "mcpServers": {
    "super-agent-skills": {
      "command": "node",
      "args": [
        "G:\\CODE\\MCP\\super-agent-skills-mcp\\index.js"
      ]
    }
  }
}
```

---

### 🔌 VS Code (Cline / Roo Code / Continue)
Add to your extension's MCP configuration JSON file under `"mcpServers"`.

---

## Step 4: Publish to GitHub

```bash
git init
git add .
git commit -m "feat: initial open source release of Super Agent Skills MCP v3.5"
git branch -M main
git remote add origin https://github.com/AkashKumarJha/super-agent-skills-mcp.git
git push -u origin main
```
