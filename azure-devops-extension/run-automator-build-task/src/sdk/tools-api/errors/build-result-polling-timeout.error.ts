import { MAX_TIME_SPEND_ON_POLLING } from "@common/constants";
import { BaseError } from "@common/errors/base.error";

export class BuildResultPollingTimeoutError extends BaseError {
  constructor() {
    super(`Maximum polling time exceeded ${MAX_TIME_SPEND_ON_POLLING} ms.`);
  }
}
