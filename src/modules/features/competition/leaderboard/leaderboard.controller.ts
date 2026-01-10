import { catchAsync } from "@shared/utils/catch-async";
import { Request, Response } from "express";
import { LeaderboardGetTopDto } from "./dtos/leaderboard-get.dto";
import {
  LeaderboardRegisterDto,
  LeaderboardUnregisterDto,
} from "./dtos/leaderboard-action.dto";
import { LeaderboardService } from "./leaderboard.service";
import { AuthPayloadSchema } from "@shared/dtos/auth.dto";
import { ApiResponse } from "@shared/utils/api-response";
import { LeaderboardAggregator } from "./leaderboard.aggregator";
import { LeaderboardSchema } from "./dtos/leaderboard-response.dto";

export class LeaderboardController {
  static getTopParticipants = catchAsync(
    async (req: Request<{}, {}, {}, LeaderboardGetTopDto>, res: Response) => {
      const q = req.query;

      const iLeaderboards = await LeaderboardService.getTop(q.eventId);
      const tLeaderboards = await LeaderboardAggregator.transform(
        iLeaderboards,
        req.user?.id
      );
      const pLeaderboards = tLeaderboards.map((l) =>
        LeaderboardSchema.parse(l)
      );

      return ApiResponse.success(res, "Leaderboard.", {
        leaderboard: pLeaderboards,
      });
    }
  );

  static registerInEvent = catchAsync(
    async (req: Request<{}, {}, LeaderboardRegisterDto>, res: Response) => {
      const user = AuthPayloadSchema.parse(req.user);
      const q = req.body;

      await LeaderboardService.register(q.eventId, user.id);

      return ApiResponse.success(res, "Registered.");
    }
  );

  static deregisterInEvent = catchAsync(
    async (
      req: Request<{}, {}, {}, LeaderboardUnregisterDto>,
      res: Response
    ) => {
      const user = AuthPayloadSchema.parse(req.user);
      const q = req.query;

      await LeaderboardService.unregister(q.eventId, user.id);

      return ApiResponse.success(res, "Deregistered.");
    }
  );
}
