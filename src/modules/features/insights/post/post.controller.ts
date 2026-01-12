import { Request, Response } from "express";
import { catchAsync } from "@shared/utils/catch-async";
import { ApiResponse } from "@shared/utils/api-response";
import { PostService } from "./post.service";
import { PostGetDto, PostGetOneDto } from "./dtos/post-get.dto";
import { PostAggregator } from "./post.aggregator";
import { PostSchema } from "./dtos/post-response.dto";

export class PostsController {
  static getPublishedPosts = catchAsync(
    async (req: Request<{}, {}, {}, PostGetDto>, res: Response) => {
      const q = req.query;
      const categories = q.categories
        ? (JSON.parse(q.categories) as string[])
        : [];

      const iPosts = await PostService.getByCategories(categories, q.page);
      const tPosts = await PostAggregator.transform(iPosts);
      const pPosts = tPosts.map((p) => PostSchema.parse(p));

      return ApiResponse.success(res, "Insights fetched.", {
        insights: pPosts,
      });
    }
  );

  static getPostById = catchAsync(
    async (req: Request<{}, {}, {}, PostGetOneDto>, res: Response) => {
      const q = req.query;

      const iPost = await PostService.getById(q.id);
      const [tPost] = await PostAggregator.transform([iPost.plain]);
      const pPost = PostSchema.parse(tPost);

      return ApiResponse.success(res, "Insight fetched.", { insight: pPost });
    }
  );
}
