import { ProfileAggregator, ProfileService } from "@modules/core/profile";
import { CommentAttributes } from "./comment.model";
import { CommentSchema } from "./dtos/comment-response.dto";
import { CommentService } from "./comment.service";

export type IncompleteComment = CommentAttributes & {
  writer?: Record<string, unknown>;
  parentComment?: null | Record<string, unknown>;
};

export class CommentAggregator {
  static addWriter = async (
    comments: IncompleteComment[],
    reqUserId?: string | null
  ) => {
    const writerIds = comments.map((c) => c.userId);

    const iWriters = await ProfileService.getByIds(writerIds);
    const tWriters = await ProfileAggregator.transform(iWriters, reqUserId);

    const writerMap: Record<string, any> = {};
    tWriters.map((w) => (writerMap[w.id] = w));

    return comments.map((c) => ({ ...c, writer: writerMap[c.userId] }));
  };

  static addParentComment = async (
    comments: IncompleteComment[],
    reqUserId?: string | null
  ) => {
    const parentIds = comments
      .map((c) => c.replyingTo)
      .filter((c) => c !== null);

    const iComments = await CommentService.getByIds(parentIds);
    const tComments = await CommentAggregator.addWriter(iComments, reqUserId);

    const parentMap: Record<string, any> = {};
    tComments.map((c) => (parentMap[c.id] = c));

    return comments.map((c) => ({
      ...c,
      ...(c.replyingTo ? { parentComment: parentMap[c.replyingTo] } : {}),
    }));
  };

  static transform = async (
    comments: IncompleteComment[],
    reqUserId?: string | null
  ) => {
    const withWriter = await CommentAggregator.addWriter(comments, reqUserId);
    const withParentComment = await CommentAggregator.addParentComment(
      withWriter,
      reqUserId
    );

    return withParentComment.map((c) => CommentSchema.parse(c));
  };
}
