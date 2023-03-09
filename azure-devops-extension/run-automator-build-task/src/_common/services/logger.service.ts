import pino from "pino";

export const loggerService = pino({
  level: "info",
  transport: {
    target: "pino-pretty",
  }
});
