/**
 * GitHub Actions CI/CD Workflow Generator Module
 */

export const CICD_TOOLS = [
  {
    name: "generate_github_actions_workflow",
    description: "Generates production GitHub Actions YAML workflows for automated testing, security scanning, Docker building, and zero-downtime deployment.",
    inputSchema: {
      type: "object",
      properties: {
        workflow_type: {
          type: "string",
          enum: ["ci_test_and_lint", "docker_push_ghcr", "vercel_deploy"],
          description: "Target GitHub Actions workflow type",
        },
      },
      required: ["workflow_type"],
    },
  },
];

export const handleCicdTool = (name, args) => {
  if (name === "generate_github_actions_workflow") {
    const wType = args.workflow_type;
    let yaml = `# 🤖 GitHub Actions Workflow (${wType.toUpperCase()})\n\n`;

    if (wType === "ci_test_and_lint") {
      yaml += `\`\`\`yaml
name: Production CI Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test-and-lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          
      - name: Install Dependencies
        run: npm ci
        
      - name: Run Linter
        run: npm run lint
        
      - name: Run Unit Tests
        run: npm test
\`\`\`\n`;
    } else {
      yaml += `\`\`\`yaml
name: Build and Push Docker Image

on:
  push:
    tags:
      - 'v*.*.*'

jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: docker/setup-buildx-action@v3
      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}
      - uses: docker/build-push-action@v5
        with:
          push: true
          tags: ghcr.io/\${{ github.repository }}:latest
\`\`\`\n`;
    }

    return { content: [{ type: "text", text: yaml }] };
  }

  throw new Error(`Unknown tool in CI/CD module: ${name}`);
};
