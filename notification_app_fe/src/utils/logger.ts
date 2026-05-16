import { Log as BaseLog } from "../../../logging_middleware/logger";

export async function Log(
  stack: "frontend" | "backend",
  level:
    | "debug"
    | "info"
    | "warn"
    | "error"
    | "fatal",
  packageName:
    | "api"
    | "component"
    | "hook"
    | "page"
    | "state"
    | "style"
    | "auth"
    | "config"
    | "middleware"
    | "utils",
  message: string
) {
  return BaseLog(
    stack,
    level,
    packageName,
    message
  );
}