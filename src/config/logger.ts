import { format, createLogger, transports } from "winston";
const { combine, timestamp, splat, colorize, printf } = format;
export const logger = createLogger({
  level: "info", 
  format: combine(
    splat(),
    timestamp({
      format: "DD-MM-YYYY HH:mm:ss",
    }),
    colorize(),
    printf((log) => {
      return `${log.timestamp} ${log.level} ${log.message}`;
    })
  ),
  transports: [new transports.Console()],
});
