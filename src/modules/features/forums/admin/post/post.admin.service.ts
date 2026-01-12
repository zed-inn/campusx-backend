import { BaseService } from "@shared/services/base.service";
import { createOffsetFn } from "@shared/utils/create-offset";
import { Post, PostInstance } from "../../post/post.model";
import { FORUMS_PER_PAGE } from "@config/constants/items-per-page";
import { PostFiltersDto } from "./dtos/post-get.admin.dto";
import { OrderItem } from "sequelize";

class _PostService extends BaseService<PostInstance> {
  protected OFFSET = createOffsetFn(FORUMS_PER_PAGE);

  constructor() {
    super(Post);
  }

  getByFilters = async (
    filters: PostFiltersDto,
    order: string[][],
    page: number
  ) => {
    const posts = await Post.findAll({
      where: filters,
      offset: this.OFFSET(page),
      limit: FORUMS_PER_PAGE,
      order: order as OrderItem[],
    });

    return posts.map((p) => p.plain);
  };
}

export const PostService = new _PostService();
