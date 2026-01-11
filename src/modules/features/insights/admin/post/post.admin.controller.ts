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

export class PostController {
  static getPostsByFilter = catchAsync(
    async (req: Request<{}, {}, {}, PostGetFilterDto>, res: Response) => {
      const { page, order, ...filters } = req.query;
      const q = { page, order, filters };

      const posts = await PostService.getByFilters(q.filters, q.order, q.page);

      return ApiResponse.success(res, "Posts fetched.", { posts });
    }
  );

  static createPost = catchAsync(
    async (req: Request<{}, {}, PostCreateDto>, res: Response) => {
      const post = await PostService.createNew(req.body);

      return ApiResponse.success(res, "Post created.", { post });
    }
  );

  static updatePost = catchAsync(
    async (req: Request<{}, {}, PostUpdateDto>, res: Response) => {
      const post = await PostService.update(req.body);

      return ApiResponse.success(res, "Post updated.", { post });
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
