import { MessageSocketDocs } from "@modules/features/chats";
import { generateReadme } from "./docs/generate-readme";
import { RESTDocs } from "./router";
import { AdminRESTDocs } from "./admin.router";

const AppDocs = [...RESTDocs, ...MessageSocketDocs];
const AdminAppDocs = [...AdminRESTDocs];

export const generateDocs = () => {
  generateReadme(AppDocs, "./public/docs/README.md");
  generateReadme(AdminAppDocs, "./public/docs/admin/README.md");
  generateReadme([...AppDocs, ...AdminAppDocs], "./README.md");
};
