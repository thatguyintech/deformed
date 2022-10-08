import expressPino from "express-pino-logger";
// eslint-disable-next-line import/no-named-as-default
import pino from "pino";

export const apiLogger = pino({
  // emit debug logs unless overriden by env variable
  level: process.env.LOG_LEVEL || "debug",
  // display log level label instead of numeric value
  formatters: {
    level: (label) => {
      return { level: label };
    },
  },
});

export const expressLogger = expressPino({
  logger: apiLogger,
  serializers: {
    req: (req) => ({
      id: req.id,
      method: req.method,
      url: req.url,
    }),
  },
  // if server error, set request log level to error
  customLogLevel: (res) => {
    return res.statusCode >= 500 ? "error" : "info";
  },
});
