const TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
export type StackType = "frontend" | "backend";

export type LogLevel =
  | "debug"
  | "info"
  | "warn"
  | "error"
  | "fatal";

export type PackageType =
  | "api"
  | "component"
  | "hook"
  | "page"
  | "state"
  | "style"
  | "auth"
  | "config"
  | "middleware"
  | "utils";

interface LogPayload {
  stack: StackType;
  level: LogLevel;
  package: PackageType;
  message: string;
}

const LOG_API = "http://4.224.186.213/evaluation-service/logs";

export async function Log(
  stack: StackType,
  level: LogLevel,
  packageName: PackageType,
  message: string
): Promise<void> {
  const payload: LogPayload = {
    stack,
    level,
    package: packageName,
    message,
  };

  try {
    await fetch(LOG_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
    },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    
  }
}