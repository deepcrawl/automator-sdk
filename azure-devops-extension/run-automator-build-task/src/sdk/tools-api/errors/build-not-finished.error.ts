import { BaseError } from "@common/errors/base.error";

export class BuildNotFinishedError extends BaseError {
  constructor() {
    super("Build is not finished.");
  }
}
