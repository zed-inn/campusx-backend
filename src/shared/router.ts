import { AuthRouter } from "@modules/core/authentication";
import { InstituteRouter } from "@modules/core/institutes";
import { ProfileRouter } from "@modules/core/profile";
import { UserRouter } from "@modules/core/user/user.route";
import { AmbassadorRouter } from "@modules/features/ambassador";
import { ChatsRouter } from "@modules/features/chats";
import { EducationRouter } from "@modules/features/education";
import { FeedbackRouter } from "@modules/features/feedback";
import { FollowRouter } from "@modules/features/follow";
import { ForumRouter } from "@modules/features/forums";
import { InsightsRouter } from "@modules/features/insights";
import { InstituteCommunityChatRouter } from "@modules/features/institute-community-chat";
import { InstituteReviewRouter } from "@modules/features/institute-review";
import { DetailedRouter } from "./infra/http/detailed-router";
import { generateReadme } from "./docs/generate-readme";

const router = new DetailedRouter("CampusX Backend");

const routers: Record<string, DetailedRouter> = {
  "/auth": AuthRouter,
  "/profile": ProfileRouter,
  "/user": UserRouter,
  "/follow": FollowRouter,
  "/forums": ForumRouter,
  "/insights": InsightsRouter,
  "/education": EducationRouter,
  "/institute": InstituteRouter,
  "/institute/review": InstituteReviewRouter,
  "/institute/community-chat": InstituteCommunityChatRouter,
  "/feedback": FeedbackRouter,
  "/chats": ChatsRouter,
  "/ambassador": AmbassadorRouter,
};

for (const key of Object.keys(routers)) {
  if (routers[key]) router.use(key, routers[key]);
}

generateReadme(router.definitions, "./public/docs/README.md");
generateReadme(router.definitions, "./README.md");

export const AppRouter = router.router;
