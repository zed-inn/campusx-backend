import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import { PostGetFilterDto } from "./dtos/post-get.admin.dto";
import { PostService } from "./post.admin.service";
import { PostAggregator } from "./post.admin.aggregator";
import { PostSchema } from "./dtos/post-response.admin.dto";
import { ApiResponse } from "@shared/utils/api-response";

export class PostController {
  static getPostsByFilters = catchAsync(
    async (req: Request<{}, {}, {}, PostGetFilterDto>, res: Response) => {
      const { page, order, ...filters } = req.query;
      const q = { page, order, filters };

      const iPosts = await PostService.getByFilters(q.filters, q.order, q.page);
      const tPosts = await PostAggregator.transform(iPosts);
      const pPosts = tPosts.map((p) => PostSchema.parse(p));

      return ApiResponse.success(res, "Posts fetched.", { posts: pPosts });
    }
  );
}
