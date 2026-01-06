import fs from "fs";
import path from "path";
import { z } from "zod";
import { formatSchemaToTs } from "./schema-to-clean-ts";
import { EndpointDetails } from "./readme-types";

export const generateReadme = (
  endpoints: EndpointDetails[],
  fileName = "README.md"
) => {
  let md = "# API Documentation\n\n";
  md += "> Auto-generated. Do not edit manually.\n\n";

  // group by category
  const grouped: Record<string, EndpointDetails[]> = {};
  endpoints.forEach((ep) => {
    if (!grouped[ep.category]) grouped[ep.category] = [];
    grouped[ep.category]?.push(ep);
  });

  for (const [category, routes] of Object.entries(grouped)) {
    md += `## ${category}\n\n`;

    for (const route of routes) {
      md += `### ${route.title}\n\n`;

      const authStatus = route.authTokenReq ? "Auth: Required" : "Auth: No";
      md += `**${route.method.toUpperCase()}** \`${route.endpoint
        .replaceAll("//", "/")
        .replace(/\/$/, "")}\``;

      if (route.authTokenReq) md += `  **( Login Required )**`;

      if (route.description) {
        md += `\n\n${route.description}\n\n`;
      }

      if (route.body) {
        md += `**Body :**\n\`\`\`ts\n`;
        md += renderZod(route.body, true);
        md += `\n\`\`\`\n\n`;
      }

      if (route.query) {
        md += `**Query Parameters :**\n\`\`\`ts\n`;
        md += renderZod(route.query, true);
        md += `\n\`\`\`\n\n`;
      }

      md += `**Response (200 OK) :**\n\`\`\`ts\n`;

      const responseSchema = z.object({
        message: z.literal(route.response.message),
        data: route.response.data || z.any().optional(),
      });

      md += renderZod(responseSchema, false);
      md += `\n\`\`\`\n\n`;

      md += "---\n\n";
    }
  }

  const outputPath = path.join(process.cwd(), fileName);
  fs.writeFileSync(outputPath, md);
};

function renderZod(schema: z.ZodTypeAny, showComments: boolean): string {
  const json = z.toJSONSchema(schema, { target: "openapi-3.0" });
  return formatSchemaToTs(json as any, showComments);
}
