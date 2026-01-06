import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import { ApiResponse } from "@shared/utils/api-response";
import { AuthPayloadSchema } from "@shared/dtos/auth.dto";
import {
  PostGetLatestDto,
  PostGetMineDto,
  PostGetUsersDto,
} from "./dtos/post-get.dto";
import { PostService } from "./post.service";
import { PostAggregator } from "./post.aggregator";
import { PostSchema } from "./dtos/post-response.dto";
import {
  PostCreateDto,
  PostDeleteDto,
  PostUpdateDto,
} from "./dtos/post-action.dto";
import { GlobalDeleteSchema } from "@shared/dtos/global.dto";

export class PostController {
  static getLatestPosts = catchAsync(
    async (req: Request<{}, {}, {}, PostGetLatestDto>, res: Response) => {
      const q = req.query;

      const iPosts = await PostService.getLatest(q.page);
      const tPosts = await PostAggregator.transform(iPosts, req.user?.id);
      const pPosts = tPosts.map((p) => PostSchema.parse(p));

      return ApiResponse.success(res, "Forums fetched.", { forums: pPosts });
    }
  );

  static getUserPosts = catchAsync(
    async (req: Request<{}, {}, {}, PostGetUsersDto>, res: Response) => {
      const q = req.query;

      const iPosts = await PostService.getByUserId(q.userId, q.page);
      const tPosts = await PostAggregator.transform(iPosts, req.user?.id);
      const pPosts = tPosts.map((p) => PostSchema.parse(p));

      return ApiResponse.success(res, "Forums fetched.", { forums: pPosts });
    }
  );

  static getMyPosts = catchAsync(
    async (req: Request<{}, {}, {}, PostGetMineDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);
      const q = req.query;

      const iPosts = await PostService.getByUserId(user.id, q.page);
      const tPosts = await PostAggregator.transform(iPosts, req.user?.id);
      const pPosts = tPosts.map((p) => PostSchema.parse(p));

      return ApiResponse.success(res, "Forums fetched.", { forums: pPosts });
    }
  );

  static createPost = catchAsync(
    async (req: Request<{}, {}, PostCreateDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);

      const iPost = await PostService.create({ ...req.body, userId: user.id });
      const tPost = await PostAggregator.transform([iPost.plain]);
      const pPost = PostSchema.parse(tPost);

      return ApiResponse.success(res, "Forum created.", { forum: pPost });
    }
  );

  static updatePost = catchAsync(
    async (req: Request<{}, {}, PostUpdateDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);

      const iPost = await PostService.update(req.body, user.id);
      const tPost = await PostAggregator.transform([iPost.plain]);
      const pPost = PostSchema.parse(tPost);

      return ApiResponse.success(res, "Forum updated.", { forum: pPost });
    }
  );

  static deletePost = catchAsync(
    async (req: Request<{}, {}, {}, PostDeleteDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);
      const q = req.query;

      const post = await PostService.deleteByOwnerById(q.forumId, user.id);
      const responseData = GlobalDeleteSchema.parse(post);

      return ApiResponse.success(res, "Forum deleted.", responseData);
    }
  );
}
