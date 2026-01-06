import { DetailedRouter } from "@shared/infra/http/detailed-router";
import {
  CommentCreateSchema,
  CommentDeleteSchema,
  CommentUpdateSchema,
} from "./dtos/comment-action.dto";
import { CommentController } from "./comment.controller";
import { CommentGetPostSchema } from "./dtos/comment-get.dto";
import { array } from "zod";
import { CommentSchema } from "./dtos/comment-response.dto";
import { GlobalDeleteSchema } from "@shared/dtos/global.dto";

const router = new DetailedRouter("Forum Comments");

router
  .describe("Create Comment", "Add a new comment to a specific post.")
  .userProfiled()
  .body(CommentCreateSchema)
  .output("comment", CommentSchema, "Commented.")
  .post("/", CommentController.createComment);

router
  .describe("Update Comment", "Edit the content of an existing comment.")
  .userProfiled()
  .body(CommentUpdateSchema)
  .output("comment", CommentSchema, "Comment updated.")
  .patch("/", CommentController.updateComment);

router
  .describe("Delete Comment", "Permanently remove a comment.")
  .userProfiled()
  .query(CommentDeleteSchema)
  .output(GlobalDeleteSchema, "Comment deleted.")
  .delete("/", CommentController.deleteComment);

router
  .describe(
    "Get Post Comments",
    "Retrieve a paginated list of comments for a specific post."
  )
  .query(CommentGetPostSchema)
  .output("comments", array(CommentSchema), "Comments fetched.")
  .get("/", CommentController.getPostComments);

export const CommentRouter = router;
