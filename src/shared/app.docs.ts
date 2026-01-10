import { MessageSocketDocs } from "@modules/features/chats";
import { generateReadme } from "./docs/generate-readme";
import { RESTDocs } from "./router";

const AppDocs = [...RESTDocs, ...MessageSocketDocs];

export const generateDocs = () => {
  generateReadme(AppDocs, "./public/docs/README.md");
  generateReadme(AppDocs, "./README.md");
};
