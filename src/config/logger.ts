import { format, createLogger, transports } from "winston";
import path from "path";
import fs from "fs";

const { combine, timestamp, splat, colorize, printf } = format;
const logDir = path.join(__dirname, "../logs");

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
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error",
    }),
  ],
});
