import db from "@config/database";
import { removeUndefined } from "@shared/utils/clean-object";
import { BaseService } from "@shared/services/base.service";
import { createOffsetFn } from "@shared/utils/create-offset";
import { FORUMS_PER_PAGE } from "@config/constants/items-per-page";
import { hasKeys } from "@shared/utils/object-length";
import { Post, PostAttributes, PostInstance } from "./post.model";
import { PostUpdateDto } from "./dtos/post-action.dto";

class _PostService extends BaseService<PostInstance> {
  protected OFFSET = createOffsetFn(FORUMS_PER_PAGE);

  constructor() {
    super(Post);
  }

  getByUserId = async (id: string, page: number) => {
    const posts = await Post.findAll({
      where: { userId: id },
      limit: FORUMS_PER_PAGE,
      offset: this.OFFSET(page),
      order: [["createDate", "desc"]],
    });

    return posts.map((f) => f.plain);
  };

  getLatest = async (page: number) => {
    const posts = await Post.findAll({
      limit: FORUMS_PER_PAGE,
      offset: this.OFFSET(page),
      order: [["createDate", "desc"]],
    });

    return posts.map((f) => f.plain);
  };

  update = async (data: PostUpdateDto, userId: string) => {
    return await db.transaction(async () => {
      const { forumId: id, ...updateData } = data;

      const post = await this.getById(id);
      this.checkOwnership(post, userId);

      const cleanData = removeUndefined(updateData);
      if (hasKeys(cleanData))
        await post.update(cleanData as Partial<PostAttributes>);

      return post;
    });
  };
}

export const PostService = new _PostService();
