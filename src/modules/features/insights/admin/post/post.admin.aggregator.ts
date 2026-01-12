import { PostAttributes } from "../../post/post.model";
import { CategoryService } from "../category/category.admin.service";
import { PostSchema } from "./dtos/post-response.admin.dto";

export type IncompletePost = PostAttributes & { category?: string | null };

export class PostAggregator {
  static addCategory = async (posts: IncompletePost[]) => {
    const cIds = posts
      .map((c) => c.categoryId)
      .filter((x) => typeof x === "string");

    const categories = await CategoryService.getByIds(cIds);
    const categoryMap: Record<string, any> = {};
    categories.map((c) => (categoryMap[c.id] = c.name));

    return posts.map((p) => ({
      ...p,
      category: p.categoryId ? categoryMap[p.categoryId] : null,
    }));
  };

  static transform = async (posts: IncompletePost[]) => {
    const withCategories = await PostAggregator.addCategory(posts);

    return withCategories.map((p) => PostSchema.parse(p));
  };
}
