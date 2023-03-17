import { createLogger, format, transports } from "winston";

const { colorize, combine, timestamp, printf } = format;
const upperLevel = format(info => {
  info.level = info.level.toUpperCase();
  return info;
});

export const loggerService = createLogger({
  format: combine(
    upperLevel(),
    colorize({ all: true }),
    timestamp({ format: "HH:mm:ss.sss" }),
    printf(({ level, message, timestamp }) => `[${timestamp}] ${level} (${process.pid}) : ${message}`),
  ),
  transports: [new transports.Console()],
});
