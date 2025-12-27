import { z } from "zod";

type JsonSchema = {
  type?: string | string[];
  properties?: Record<string, JsonSchema | boolean>;
  required?: string[];
  items?: JsonSchema | boolean;
  nullable?: boolean;
  additionalProperties?: boolean | JsonSchema;
  description?: string; // <--- Field for .describe()
  [key: string]: any;
};

/**
 * Converts JSON Schema to TypeScript interface string with comments.
 */
export const formatSchemaToTs = (
  schema: JsonSchema | boolean,
  showRequired: boolean = true,
  indentLevel: number = 0
): string => {
  if (typeof schema === "boolean") return schema ? "any" : "never";

  const indent = "  ".repeat(indentLevel);
  const nextIndent = "  ".repeat(indentLevel + 1);
  const nullSuffix = schema.nullable ? " | null" : "";

  // 1. Handle Objects
  if (schema.type === "object" && schema.properties) {
    const requiredKeys = new Set(schema.required || []);
    const lines: string[] = [];

    lines.push("{");
    for (const [key, value] of Object.entries(schema.properties)) {
      const child = value as JsonSchema;
      const isRequired = requiredKeys.has(key);
      const optionalMark = isRequired ? "" : "?";

      // --- COMMENT LOGIC ---
      const commentParts: string[] = [];

      // 1. Add "required" if requested
      // if (showRequired && isRequired) {
      //   commentParts.push("required");
      // }

      // 2. Add description if present
      if (child.description) {
        commentParts.push(child.description);
      }

      // 3. Join with comma
      const commentStr =
        commentParts.length > 0 ? ` // ${commentParts.join(", ")}` : "";
      // ---------------------

      const childType = formatSchemaToTs(child, showRequired, indentLevel + 1);

      lines.push(
        `${nextIndent}${key}${optionalMark}: ${childType};${commentStr}`
      );
    }
    lines.push(`${indent}}`);

    return lines.join("\n") + nullSuffix;
  }

  // 2. Handle Arrays
  if (schema.type === "array" && schema.items) {
    const itemType = formatSchemaToTs(
      schema.items as JsonSchema,
      showRequired,
      indentLevel
    );
    return `${itemType}[]${nullSuffix}`;
  }

  // 3. Handle Primitives
  if (schema.type === "string") return `string${nullSuffix}`;
  if (schema.type === "integer" || schema.type === "number")
    return `number${nullSuffix}`;
  if (schema.type === "boolean") return `boolean${nullSuffix}`;

  return `any${nullSuffix}`;
};
