const LOG_API =
  "/api/evaluation-service/logs";

const TOKEN = localStorage.getItem("access_token");

export async function Log(
  stack: string,
  level: string,
  packageName: string,
  message: string
): Promise<void> {
  try {
    await fetch(LOG_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({
        stack,
        level,
        package: packageName,
        message,
      }),
    });
  } catch (error) {
    // intentionally empty
  }
}