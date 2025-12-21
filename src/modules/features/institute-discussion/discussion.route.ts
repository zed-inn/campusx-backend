import { isLoggedIn, isProfiledUser } from "@shared/middlewares/auth-restrict";
import { Router } from "express";
import { DiscussionController } from "./discussion.controller";
import { validateRequestBody } from "@shared/middlewares/validate-request";
import { DiscussionCreateSchema } from "./dtos/discussion-create.dto";
import { DiscussionUpdateSchema } from "./dtos/discussion-update.dto";

const router = Router();

router.get("/", isLoggedIn, isProfiledUser, DiscussionController.getMessages);

router.post(
  "/",
  isLoggedIn,
  isProfiledUser,
  validateRequestBody(DiscussionCreateSchema),
  DiscussionController.createMessage
);

router.put(
  "/",
  isLoggedIn,
  isProfiledUser,
  validateRequestBody(DiscussionUpdateSchema),
  DiscussionController.updateMessage
);

router.delete(
  "/",
  isLoggedIn,
  isProfiledUser,
  DiscussionController.deleteMessage
);

router.get(
  "/like",
  isLoggedIn,
  isProfiledUser,
  DiscussionController.likeMessage
);

router.get(
  "/unlike",
  isLoggedIn,
  isProfiledUser,
  DiscussionController.unlikeMessage
);

export const InstituteDiscussionRouter = router;
