import { CategoryService } from "../category/category.service";
import { Post, PostInstance } from "./post.model";
import { createOffsetFn } from "@shared/utils/create-offset";
import { BaseService } from "@shared/services/base.service";
import { INSIGHTS_PER_PAGE } from "@config/constants/items-per-page";
import { POST } from "./post.constants";
import { Op } from "sequelize";

class _PostService extends BaseService<PostInstance> {
  protected OFFSET = createOffsetFn(INSIGHTS_PER_PAGE);

  constructor() {
    super(Post);
  }

  getByCategories = async (names: string[], page: number) => {
    const categories = await CategoryService.getByNames(names);
    const categoryIds = categories.map((c) => c.id);

    const insights = await Post.findAll({
      where: {
        ...(categoryIds.length ? { categoryId: { [Op.in]: categoryIds } } : {}),
        status: POST.STATUS.Published,
      },
      offset: this.OFFSET(page),
      limit: INSIGHTS_PER_PAGE,
      order: [["createDate", "desc"]],
    });

    return insights.map((i) => i.plain);
  };
}

export const PostService = new _PostService();
