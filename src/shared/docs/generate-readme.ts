import fs from "fs";
import path from "path";
import { z } from "zod";
import { formatSchemaToTs } from "./schema-to-clean-ts";

// 1. Types
type ZodObject = z.ZodTypeAny;

export type EndpointDetails = {
  category: string;
  title: string;
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  description: string;
  authTokenReq?: boolean;
  body?: ZodObject;
  query?: ZodObject;
  response: {
    message: string;
    data?: ZodObject;
  };
};

// 2. The Generator
export const generateReadme = (
  endpoints: EndpointDetails[],
  fileName = "README.md"
) => {
  let md = "# API Documentation\n\n";
  md += "> Auto-generated. Do not edit manually.\n\n";

  // --- Group by Category ---
  const grouped: Record<string, EndpointDetails[]> = {};
  endpoints.forEach((ep) => {
    if (!grouped[ep.category]) grouped[ep.category] = [];
    grouped[ep.category]?.push(ep);
  });

  // --- Iterate Categories ---
  for (const [category, routes] of Object.entries(grouped)) {
    // Simple Category Header
    md += `## ${category}\n\n`;

    for (const route of routes) {
      // 1. Title
      md += `### ${route.title}\n\n`;

      // 2. Metadata: Method - Endpoint - Auth Status
      const authStatus = route.authTokenReq ? "Auth: Required" : "Auth: No";
      md += `**${route.method}** \`${route.endpoint}\``;

      if (route.authTokenReq) md += `  **( Login Required )**`;

      // 3. Description
      if (route.description) {
        md += `\n\n${route.description}\n\n`;
      }

      // 4. Request Body
      if (route.body) {
        md += `**Body :**\n\`\`\`ts\n`;
        md += renderZod(route.body, true); // true = show // required comments
        md += `\n\`\`\`\n\n`;
      }

      // 5. Query Params
      if (route.query) {
        md += `**Query Parameters :**\n\`\`\`ts\n`;
        md += renderZod(route.query, true);
        md += `\n\`\`\`\n\n`;
      }

      // 6. Response (200 OK)
      md += `**Response (200 OK) :**\n\`\`\`ts\n`;

      const responseSchema = z.object({
        message: z.literal(route.response.message),
        data: route.response.data || z.any().optional(),
      });

      md += renderZod(responseSchema, false); // false = hide comments
      md += `\n\`\`\`\n\n`;

      md += "---\n\n";
    }
  }

  // Write File
  const outputPath = path.join(process.cwd(), fileName);
  fs.writeFileSync(outputPath, md);
};

// --- Helper ---
function renderZod(schema: z.ZodTypeAny, showComments: boolean): string {
  // 'openApi3' is the standard target for Zod v4 native conversion
  const json = z.toJSONSchema(schema, { target: "openapi-3.0" });
  return formatSchemaToTs(json as any, showComments);
}
