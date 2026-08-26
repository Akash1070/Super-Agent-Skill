#!/usr/bin/env node

import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MEMORY_FILE_PATH = path.join(__dirname, "..", "data", "agent_memory.json");
const PORT = process.env.PORT || 3333;

function readMemory() {
  try {
    if (!fs.existsSync(MEMORY_FILE_PATH)) {
      return { user_preferences: [], mistakes_autopsy: [], project_rules: [] };
    }
    return JSON.parse(fs.readFileSync(MEMORY_FILE_PATH, "utf8"));
  } catch (e) {
    return { user_preferences: [], mistakes_autopsy: [], project_rules: [] };
  }
}

const server = http.createServer((req, res) => {
  if (req.url === "/api/memory") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(readMemory()));
    return;
  }

  const memory = readMemory();
  const prefs = memory.user_preferences || [];
  const autopsies = memory.mistakes_autopsy || [];
  const rules = memory.project_rules || [];

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>🧠 Super Agent Skill - Visual Memory Dashboard</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&family=JetBrains+Mono&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #030712;
      --card-bg: rgba(17, 24, 39, 0.7);
      --border: rgba(255, 255, 255, 0.08);
      --accent-purple: #7C3AED;
      --accent-emerald: #10B981;
      --accent-cyan: #06B6D4;
      --text: #F3F4F6;
      --text-muted: #9CA3AF;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: 'Plus Jakarta Sans', sans-serif;
      padding: 30px 20px;
      min-height: 100vh;
    }
    .header {
      max-width: 1200px;
      margin: 0 auto 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 20px;
      border-bottom: 1px solid var(--border);
    }
    .title-group h1 { font-size: 28px; font-weight: 700; color: #FFF; }
    .title-group p { color: var(--text-muted); font-size: 14px; margin-top: 4px; }
    .author-tag {
      background: rgba(124, 58, 237, 0.15);
      border: 1px solid var(--accent-purple);
      color: #C4B5FD;
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 600;
    }
    .grid-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      max-width: 1200px;
      margin: 0 auto 30px;
    }
    .stat-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 24px;
      backdrop-filter: blur(12px);
    }
    .stat-title { color: var(--text-muted); font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; }
    .stat-val { font-size: 36px; font-weight: 700; margin-top: 8px; color: #FFF; }
    .content-container {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
    }
    @media (max-width: 900px) { .content-container { grid-template-columns: 1fr; } }
    .section-box {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 24px;
      backdrop-filter: blur(12px);
    }
    .section-box h2 { font-size: 18px; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
    .item-card {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 12px;
      font-size: 14px;
    }
    .item-card strong { color: var(--accent-emerald); }
    .item-card code { font-family: 'JetBrains Mono', monospace; font-size: 12px; color: var(--accent-cyan); display: block; margin-top: 6px; }
  </style>
</head>
<body>
  <div class="header">
    <div class="title-group">
      <h1>🧠 Super Agent Skill — Visual Memory Dashboard</h1>
      <p>Real-Time Persistent Memory & GitHub Auto-Scouting Engine</p>
    </div>
    <div class="author-tag">Architected by Akash Kumar Jha</div>
  </div>

  <div class="grid-stats">
    <div class="stat-card">
      <div class="stat-title">Learned Preferences</div>
      <div class="stat-val" style="color: var(--accent-purple);">${prefs.length}</div>
    </div>
    <div class="stat-card">
      <div class="stat-title">Mistake Autopsies</div>
      <div class="stat-val" style="color: #F43F5E;">${autopsies.length}</div>
    </div>
    <div class="stat-card">
      <div class="stat-title">Scouted Project Rules</div>
      <div class="stat-val" style="color: var(--accent-cyan);">${rules.length}</div>
    </div>
  </div>

  <div class="content-container">
    <div class="section-box">
      <h2>👤 Learned User Preferences</h2>
      ${prefs.length === 0 ? '<p style="color:var(--text-muted)">No preferences logged yet.</p>' : ''}
      ${prefs.map(p => `
        <div class="item-card">
          <strong>[${p.category.toUpperCase()}]</strong> ${p.preference}
        </div>
      `).join('')}
    </div>

    <div class="section-box">
      <h2>🔍 Live Scouted Project Rules</h2>
      ${rules.length === 0 ? '<p style="color:var(--text-muted)">No scouted rules logged yet.</p>' : ''}
      ${rules.slice(-6).reverse().map(r => `
        <div class="item-card">
          ${r.rule}
          ${r.url ? `<code><a href="${r.url}" target="_blank" style="color:var(--accent-cyan)">${r.url}</a></code>` : ''}
        </div>
      `).join('')}
    </div>
  </div>
</body>
</html>`;

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(html);
});

server.listen(PORT, () => {
  console.log(`\n🚀 [Visual Memory Dashboard] Running live at: http://localhost:${PORT}`);
  console.log(`Press Ctrl+C to stop dashboard server.\n`);
});
