import { Router } from "express";
import { DiscussionController } from "./discussion.controller";
import { DiscussionCreateSchema } from "./dtos/service/discussion-create.dto";
import { mount } from "@shared/utils/mount-router";
import { DiscussionUpdateSchema } from "./dtos/service/discussion-update.dto";
import { RestrictTo } from "@shared/middlewares/auth-restrict";
import { ValidateReq } from "@shared/middlewares/validate-request";

const router = Router();

router.get(
  "/",
  RestrictTo.loggedInUser,
  RestrictTo.profiledUser,
  DiscussionController.getMessages
);

router.post(
  "/",
  RestrictTo.loggedInUser,
  RestrictTo.profiledUser,
  ValidateReq.body(DiscussionCreateSchema),
  DiscussionController.createMessage
);

router.put(
  "/",
  RestrictTo.loggedInUser,
  RestrictTo.profiledUser,
  ValidateReq.body(DiscussionUpdateSchema),
  DiscussionController.updateMessage
);

router.delete(
  "/",
  RestrictTo.loggedInUser,
  RestrictTo.profiledUser,
  DiscussionController.deleteMessage
);

router.get(
  "/like",
  RestrictTo.loggedInUser,
  RestrictTo.profiledUser,
  DiscussionController.likeMessage
);

router.get(
  "/unlike",
  RestrictTo.loggedInUser,
  RestrictTo.profiledUser,
  DiscussionController.unlikeMessage
);

export const InstituteDiscussionRouter = mount("/insitute/messages", router);
