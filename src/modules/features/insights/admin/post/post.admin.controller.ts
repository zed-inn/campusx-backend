import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import { PostGetFilterDto } from "./dtos/post-get.admin.dto";
import { PostService } from "./post.admin.service";
import { ApiResponse } from "@shared/utils/api-response";
import {
  PostCreateDto,
  PostDeleteDto,
  PostUpdateDto,
} from "./dtos/post-action.admin.dto";
import { PostAggregator } from "./post.admin.aggregator";
import { PostSchema } from "./dtos/post-response.admin.dto";

export class PostController {
  static getPostsByFilter = catchAsync(
    async (req: Request<{}, {}, {}, PostGetFilterDto>, res: Response) => {
      const { page, order, ...filters } = req.query;
      const q = { page, order, filters };

      const iPosts = await PostService.getByFilters(q.filters, q.order, q.page);
      const tPosts = await PostAggregator.transform(iPosts);
      const pPosts = tPosts.map((p) => PostSchema.parse(p));

      return ApiResponse.success(res, "Posts fetched.", { posts: pPosts });
    }
  );

  static createPost = catchAsync(
    async (req: Request<{}, {}, PostCreateDto>, res: Response) => {
      const iPost = await PostService.createNew(req.body);
      const [tPost] = await PostAggregator.transform([iPost.plain]);
      const pPost = PostSchema.parse(tPost);

      return ApiResponse.success(res, "Post created.", { post: pPost });
    }
  );

  static updatePost = catchAsync(
    async (req: Request<{}, {}, PostUpdateDto>, res: Response) => {
      const iPost = await PostService.update(req.body);
      const [tPost] = await PostAggregator.transform([iPost.plain]);
      const pPost = PostSchema.parse(tPost);

      return ApiResponse.success(res, "Post updated.", { post: pPost });
    }
  );

  static deletePost = catchAsync(
    async (req: Request<{}, {}, {}, PostDeleteDto>, res: Response) => {
      const q = req.query;

      const post = await PostService.deleteById(q.id);

      return ApiResponse.success(res, "Post created.", { id: post.id });
    }
  );
}
