import { generateReadme } from "./generate-readme";
import { InstituteDocs } from "@modules/core/institutes";
import { AuthDocs } from "@modules/core/authentication";
import { ProfileEducationDocs } from "@modules/features/education";
import { FeedbackDocs } from "@modules/features/feedback";
import { ForumDocs } from "@modules/features/forums";
import { InsightsDocs } from "@modules/features/insights";
import { InstituteDiscussionDocs } from "@modules/features/institute-community-chat";
import { InstituteReviewDocs } from "@modules/features/institute-review";
import { EndpointDetails } from "./readme-types";
import { AmbassadorDocs } from "@modules/features/ambassador";
import { ProfileDocs } from "@modules/core/profile/profile.docs";
import { ChatDocs } from "@modules/features/chats/chat.docs";

const Docs = [
  ProfileDocs,
  InstituteDocs,
  AuthDocs,
  ProfileEducationDocs,
  FeedbackDocs,
  ForumDocs,
  InsightsDocs,
  InstituteDiscussionDocs,
  InstituteReviewDocs,
  AmbassadorDocs,
  ChatDocs,
];

const ALL_DOCS: EndpointDetails[] = [];
for (const Doc of Docs) {
  ALL_DOCS.push(...Doc);
}

export const createDocs = () => {
  generateReadme(ALL_DOCS, "./public/docs/README.md"); // at /docs level
  generateReadme(ALL_DOCS); // at main level
};
