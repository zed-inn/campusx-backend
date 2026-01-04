import { Request, Response } from "express";
import { catchAsync } from "@shared/utils/catch-async";
import { ApiResponse } from "@shared/utils/api-response";
import { PostService } from "./post.service";
import { PostGetDto } from "./dtos/post-get.dto";
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

      return ApiResponse.success(res, "Posts fetched.", { insights: pPosts });
    }
  );
}
