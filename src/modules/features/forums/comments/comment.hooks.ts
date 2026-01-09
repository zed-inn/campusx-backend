import { ProfileService } from "@modules/core/profile";
import { PostService } from "../post/post.service";
import { Comment } from "./comment.model";
import { limitText } from "@shared/utils/limit-text";
import { DB_Errors } from "@shared/errors/db-errors";
import { NotificationService } from "@modules/core/notifications";

export const CommentHooks = () => {
  // Hooks
  Comment.beforeDestroy(async (comment: any) => {
    const repliedComments = await Comment.findAll({
      where: { replyingTo: comment.id },
    });

    for (const c of repliedComments) {
      await c.destroy();
    }
  });

  Comment.afterCreate(async (comment) => {
    const c = comment.plain;
    const f = (await PostService.getById(c.postId)).plain;
    const u = (await ProfileService.getById(c.userId)).plain;

    await NotificationService.createNew(
      {
        type: "COMMENT",
        title: `New comment on your post ${limitText(f.title, 20)}`,
        body: `${u.fullName}: ${limitText(c.body)}`,
      },
      f.userId
    );

    if (c.replyingTo) {
      const pc = await Comment.findByPk(c.replyingTo);
      if (!pc) throw DB_Errors.notFound;
      await NotificationService.createNew(
        {
          type: "REPLY",
          title: `New reply on your comment on post ${limitText(f.title, 20)}`,
          body: `${u.fullName}: ${limitText(c.body)}`,
        },
        pc.plain.userId
      );
    }
  });
};
