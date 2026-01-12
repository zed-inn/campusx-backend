import fs from "fs";
import path from "path";

const DOCUMENT_STRUCTURE = {
  ACTION_DTO: `import { z } from "zod";

export const {{Name}}CreateSchema = {{Name}}Model.dbFields.omit({
  id: true,
  localId: true,
});

export type {{Name}}CreateDto = z.infer<typeof {{Name}}CreateSchema>;

export const {{Name}}UpdateSchema = {{Name}}Model.dbFields
  .omit({
    id: true,
    localId: true,
  })
  .partial()
  .extend({ id: {{Name}}Model.fields.id });

export type {{Name}}UpdateDto = z.infer<typeof {{Name}}UpdateSchema>;

export const {{Name}}DeleteSchema = {{Name}}Model.dbSchema.pick({ id: true });

export type {{Name}}DeleteDto = z.infer<typeof {{Name}}DeleteSchema>;
 `,
  GET_DTO: `import { z } from "zod";
import { GlobalSchema } from "@shared/dtos/global.dto";
 
export const {{Name}}FiltersSchema = {{Name}}Model.dbSchema.partial();

export type {{Name}}FiltersDto = z.infer<typeof {{Name}}FiltersSchema>;

export const {{Name}}GetFilterSchema = {{Name}}FiltersSchema.extend({
page: GlobalSchema.fields.page,
order: GlobalSchema.fields.order,
});

export type {{Name}}GetFilterDto = z.infer<typeof {{Name}}GetFilterSchema>;
`,
  RESPONSE_DTO: `import { z } from "zod";

export const {{Name}}Schema = {{Name}}Model.dbSchema;

export type {{Name}}Dto = z.infer<typeof {{Name}}Schema>;
`,
  SERVICE: `import { BaseService } from "@shared/services/base.service";
import { createOffsetFn } from "@shared/utils/create-offset";

class _{{Name}}Service extends BaseService<{{Name}}Instance> {
protected OFFSET = createOffsetFn({{NAME}}S_PER_PAGE);

constructor() {
super({{Name}});
}
} 

export const {{Name}}Service = new _{{Name}}Service();
`,
  CONTROLLER: `import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
  
export class {{Name}}Controller {}`,
  ROUTE: `import { DetailedRouter } from "@shared/infra/http/detailed-router";

const router = new DetailedRouter("{{Name}}");

export const {{Name}}Router = router;
`,
} as const;

const ARCHITECTURE = {
  DIRS: ["dtos"],
  FILES: {
    "./dtos/{{name}}-action.admin.dto.ts": DOCUMENT_STRUCTURE.ACTION_DTO,
    "./dtos/{{name}}-get.admin.dto.ts": DOCUMENT_STRUCTURE.GET_DTO,
    "./dtos/{{name}}-response.admin.dto.ts": DOCUMENT_STRUCTURE.RESPONSE_DTO,
    "./{{name}}.admin.service.ts": DOCUMENT_STRUCTURE.SERVICE,
    "./{{name}}.admin.controller.ts": DOCUMENT_STRUCTURE.CONTROLLER,
    "./{{name}}.admin.route.ts": DOCUMENT_STRUCTURE.ROUTE,
  },
} as const;

const capitalize = (x: string) => x.slice(0, 1).toUpperCase() + x.slice(1);
const editName = (name: string) => (text: string) => {
  return text
    .replaceAll("{{name}}", name.toLowerCase())
    .replaceAll("{{Name}}", capitalize(name))
    .replaceAll("{{NAME}}", name.toUpperCase());
};

const processArgs = () => {
  const _workingDirectory = process.argv[2];
  if (
    !_workingDirectory ||
    !fs.existsSync(path.join(process.cwd(), _workingDirectory))
  )
    throw new Error("No valid working directory given");

  const _name =
    process.argv[3] ??
    _workingDirectory
      .replaceAll("/", "\\")
      .replaceAll("\\", "/")
      .replace(/\/$/, "")
      .split("/")
      .pop();
  const workingDir = path.join(process.cwd(), _workingDirectory);
  if (!_name)
    throw new Error("No name can be fetched from given working directory");
  const efile = editName(_name);

  return { workingDir, efile };
};

const createArch = (workingDir: string, efile: (text: string) => string) => {
  for (const d of ARCHITECTURE.DIRS) {
    const createDir = path.join(workingDir, d);
    fs.mkdirSync(createDir, { recursive: true });
    console.log(`Created dir ${createDir}`);
  }

  for (const f of Object.keys(ARCHITECTURE.FILES)) {
    const _fileName = path.join(workingDir, efile(f));
    fs.writeFileSync(
      _fileName,
      efile(ARCHITECTURE.FILES[f as keyof typeof ARCHITECTURE.FILES])
    );
    console.log(`Created file ${_fileName}`);
  }

  console.log("Work done.");
};

export const run = () => {
  const { workingDir, efile } = processArgs();
  createArch(workingDir, efile);
};

run();
