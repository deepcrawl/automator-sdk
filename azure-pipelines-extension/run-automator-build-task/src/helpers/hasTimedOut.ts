import { MAX_TIME_SPEND_ON_POLLING } from "../settings";

export function hasTimedOut(runTime: number): boolean {
  return runTime >= MAX_TIME_SPEND_ON_POLLING;
}
