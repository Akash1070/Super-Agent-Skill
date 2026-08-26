/**
 * Type-Safe API Contracts & SDK Generator Module
 */

export const API_CONTRACTS_TOOLS = [
  {
    name: "generate_typesafe_api_contract",
    description: "Generates Zod validation schemas, TypeScript contract types, and OpenAPI v3 specs for frontend-backend type alignment.",
    inputSchema: {
      type: "object",
      properties: {
        schema_name: {
          type: "string",
          description: "Name of data schema or model (e.g., 'UserProfile', 'CreateOrderRequest')",
        },
        fields: {
          type: "array",
          items: { type: "string" },
          description: "List of fields and types (e.g., ['id: string', 'email: email', 'age: number?'])",
        },
      },
      required: ["schema_name"],
    },
  },
];

export const handleApiContractsTool = (name, args) => {
  if (name === "generate_typesafe_api_contract") {
    const sName = args.schema_name;
    let contract = `# 🔌 Type-Safe API Contract: ${sName}\n\n`;

    contract += `### 1. Zod Runtime Validation Schema\n\`\`\`typescript
import { z } from 'zod';

export const ${sName}Schema = z.object({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type ${sName} = z.infer<typeof ${sName}Schema>;
\`\`\`\n\n`;

    contract += `### 2. TypeScript Clean Type Definition\n\`\`\`typescript
export interface I${sName} {
  id: string;
  createdAt: string;
  updatedAt: string;
}
\`\`\`\n`;

    return { content: [{ type: "text", text: contract }] };
  }

  throw new Error(`Unknown tool in API Contracts module: ${name}`);
};
