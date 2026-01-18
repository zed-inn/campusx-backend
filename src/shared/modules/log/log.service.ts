import { Sanitize } from "@shared/utils/sanitize";
import { LogCreateDto } from "./dtos/service/log-create.dto";
import { LOG_CONFIG } from "./log.config";
import { Log } from "./log.model";
import { LOGS_PER_PAGE } from "@config/constants/items-per-page";
import { createOffsetFn } from "@shared/utils/create-offset";

export class LogService {
  protected static OFFSET = createOffsetFn(LOGS_PER_PAGE);

  static convertData = (data: LogCreateDto) => {
    return {
      req: Sanitize.sanitizeReq(data.req),
      err: Sanitize.normalizeError(data.err),
      meta: data.meta,
    };
  };

  static log = async (level: string, message: string, data: LogCreateDto) => {
    try {
      await Log.create({ ...this.convertData(data), message, level });
    } catch {}
  };

  static getByPage = async (page: number) => {
    const logs = await Log.findAll({
      limit: LOGS_PER_PAGE,
      offset: this.OFFSET(page),
      order: [["updateDate", "desc"]],
    });

    return logs.map((l) => l.plain);
  };

  static logInfo = async (message: string, data: LogCreateDto) =>
    await this.log(LOG_CONFIG.LEVELS.INFO, message, data);

  static logWarn = async (message: string, data: LogCreateDto) =>
    await this.log(LOG_CONFIG.LEVELS.WARN, message, data);

  static logError = async (message: string, data: LogCreateDto) =>
    await this.log(LOG_CONFIG.LEVELS.ERROR, message, data);
}
