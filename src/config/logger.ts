import { format, createLogger, transports } from "winston";
import path from "path";
import fs from "fs";

const { combine, timestamp, splat, colorize, printf } = format;

const logDir = path.join(__dirname, "../logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logFormat = printf((log) => {
  return `${log.timestamp} [${log.level.toUpperCase()}]: ${log.message}`;
});

export const logger = createLogger({
  level: "info",
  format: combine(
    splat(),
    timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
    logFormat
  ),
  transports: [
    new transports.Console({
      format: combine(colorize(), timestamp({ format: "DD-MM-YYYY HH:mm:ss" }), logFormat),
    }),
    new transports.File({ filename: path.join(logDir, "error.log"), level: "error" }),
    new transports.File({ filename: path.join(logDir, "combined.log") }),
  ],
});
