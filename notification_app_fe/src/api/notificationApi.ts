import type { NotificationResponse } from "../types/notification";

const TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

const BASE_URL =
  "http://4.224.186.213/evaluation-service/notifications";

export async function fetchNotifications(
  page: number,
  limit: number,
  notificationType: string
): Promise<NotificationResponse> {
  let url = `${BASE_URL}?page=${page}&limit=${limit}`;

  if (notificationType !== "All") {
    url += `&notification_type=${notificationType}`;
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch notifications");
  }

  return response.json();
}