import { MessageRouter } from "./message/message.route";
import { ReactionRouter } from "./reactions/reaction.route";
import { DetailedRouter } from "@shared/infra/http/detailed-router";

const router = new DetailedRouter("Institute Community Chat");

router.use("/message", MessageRouter);

router.use("/reaction", ReactionRouter);

export const InstituteCommunityChatRouter = router;
