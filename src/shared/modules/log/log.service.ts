import { Sanitize } from "@shared/utils/sanitize";
import { LogCreateDto } from "./dtos/service/log-create.dto";
import { LOG_CONFIG } from "./log.config";
import { Log } from "./log.model";

export class LogService {
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

  static logInfo = async (message: string, data: LogCreateDto) =>
    await this.log(LOG_CONFIG.LEVELS.INFO, message, data);

  static logWarn = async (message: string, data: LogCreateDto) =>
    await this.log(LOG_CONFIG.LEVELS.WARN, message, data);

  static logError = async (message: string, data: LogCreateDto) =>
    await this.log(LOG_CONFIG.LEVELS.ERROR, message, data);
}
