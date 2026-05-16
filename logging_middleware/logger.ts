const LOG_API =
  "/api/evaluation-service/logs";

type Stack = "frontend";

type Level =
  | "debug"
  | "info"
  | "warn"
  | "error"
  | "fatal";

type Package =
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

interface LogBody {
  stack: Stack;
  level: Level;
  package: Package;
  message: string;
}

export async function Log(
  stack: Stack,
  level: Level,
  packageName: Package,
  message: string
): Promise<void> {

  const token = localStorage.getItem("access_token");

  const payload: LogBody = {
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
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    // intentionally empty
  }
}