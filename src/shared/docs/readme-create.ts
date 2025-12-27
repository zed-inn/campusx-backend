import { AuthDocs } from "@modules/core/authentication/auth.docs";
import { InstituteDocs } from "@modules/core/institutes/institute.docs";
import { ProfileDocs } from "@modules/core/profile/profile.docs";
import { EducationDocs } from "@modules/features/education/education.docs";
import { FeedbackDocs } from "@modules/features/feedback/feedback.docs";
import { ForumDocs } from "@modules/features/forums/forums.docs";
import { InsightsDocs } from "@modules/features/insights/insights.docs";
import { DiscussionDocs } from "@modules/features/institute-discussion/discussion.docs";
import { ReviewDocs } from "@modules/features/institute-review/review.docs";
import { EndpointDetails } from "@shared/utils/readme-types";
import { generateReadme } from "./generate-readme";

const Docs = [
  ProfileDocs,
  InstituteDocs,
  AuthDocs,
  EducationDocs,
  FeedbackDocs,
  ForumDocs,
  InsightsDocs,
  DiscussionDocs,
  ReviewDocs,
];

const ALL_DOCS: EndpointDetails[] = [];
for (const Doc of Docs) {
  ALL_DOCS.push(...Doc);
}

export const createDocs = () => {
  generateReadme(ALL_DOCS, "./public/docs/README.md"); // at /docs level
  generateReadme(ALL_DOCS); // at main level
};
