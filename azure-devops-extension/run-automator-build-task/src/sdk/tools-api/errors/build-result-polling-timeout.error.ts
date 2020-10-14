import { BaseError } from "@common/errors/base.error";

export class BuildResultPollingTimeoutError extends BaseError {
  constructor(maxPollingTime: number) {
    super(`Maximum polling time exceeded ${maxPollingTime} ms.`);
  }
}
