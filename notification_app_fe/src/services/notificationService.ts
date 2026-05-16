import type {
  Notification,
  NotificationResponse,
} from "../types/notification";

import { sortNotifications } from "../utils/priorityUtils";

import { Log } from "../../../logging_middleware/logger";

const TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
const NOTIFICATION_API =
  "http://4.224.186.213/evaluation-service/notifications";

export async function fetchTopNotifications(): Promise<Notification[]> {
  try {
    await Log(
      "frontend",
      "info",
      "api",
      "Fetching notifications from API"
    );

   const response = await fetch(NOTIFICATION_API, {
    headers: {
        Authorization: `Bearer ${TOKEN}`,
    },
    });
    if (!response.ok) {
      await Log(
        "frontend",
        "error",
        "api",
        `API request failed with status ${response.status}`
      );

      throw new Error("Failed to fetch notifications");
    }

    const data: NotificationResponse = await response.json();

    await Log(
      "frontend",
      "debug",
      "utils",
      `Received ${data.notifications.length} notifications`
    );

    const sortedNotifications = sortNotifications(data.notifications);

    await Log(
      "frontend",
      "info",
      "utils",
      "Notifications sorted based on priority and recency"
    );

    const topNotifications = sortedNotifications.slice(0, 10);

    await Log(
      "frontend",
      "info",
      "utils",
      "Top 10 notifications prepared successfully"
    );

    return topNotifications;
  } catch (error) {
    await Log(
      "frontend",
      "fatal",
      "api",
      "Unexpected error while processing notifications"
    );

    throw error;
  }
}