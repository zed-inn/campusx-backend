import { CategoryService } from "../category/category.service";
import { PostSchema } from "./dtos/post-response.dto";
import { PostAttributes } from "./post.model";

export type IncompletePost = PostAttributes & { category?: { name: string } };

export class PostAggregator {
  static addCategoryName = async (posts: IncompletePost[]) => {
    const categoryNames = posts
      .map((p) => p.categoryId)
      .filter((c) => c !== null);

    const categories = await CategoryService.getByNames(categoryNames);
    const categoryMap: Record<string, string> = {};
    categories.map((c) => (categoryMap[c.id] = c.name));

    return posts.map((p) => ({
      ...p,
      category: p.categoryId ? categoryMap[p.categoryId] : null,
    }));
  };

  static transform = async (posts: IncompletePost[]) => {
    const withCategory = await PostAggregator.addCategoryName(posts);

    return withCategory.map((p) => PostSchema.parse(p));
  };
}
