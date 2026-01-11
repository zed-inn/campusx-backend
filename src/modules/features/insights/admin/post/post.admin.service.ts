import { BaseService } from "@shared/services/base.service";
import { Post, PostAttributes, PostInstance } from "../../post/post.model";
import { PostCreateDto, PostUpdateDto } from "./dtos/post-action.admin.dto";
import { PostFiltersDto } from "./dtos/post-get.admin.dto";
import { createOffsetFn } from "@shared/utils/create-offset";
import { INSIGHTS_PER_PAGE } from "@config/constants/items-per-page";
import { OrderItem } from "sequelize";
import db from "@config/database";
import { removeUndefined } from "@shared/utils/clean-object";
import { hasKeys } from "@shared/utils/object-length";

class _PostService extends BaseService<PostInstance> {
  protected OFFSET = createOffsetFn(INSIGHTS_PER_PAGE);

  constructor() {
    super(Post);
  }

  createNew = async (data: PostCreateDto) => {
    return await this.create(data);
  };

  getByFilters = async (
    filters: PostFiltersDto,
    order: string[][],
    page: number
  ) => {
    const posts = await Post.findAll({
      where: filters,
      offset: this.OFFSET(page),
      limit: INSIGHTS_PER_PAGE,
      order: order as OrderItem[],
    });

    return posts.map((p) => p.plain);
  };

  update = async (data: PostUpdateDto) => {
    const { id, ...updateData } = data;

    return await db.transaction(async () => {
      const post = await this.getById(id);

      const cleanData = removeUndefined(updateData);
      if (hasKeys(cleanData))
        await post.update(cleanData as Partial<PostAttributes>);

      return post;
    });
  };
}

export const PostService = new _PostService();
