import type { NotificationResponse } from "../types/notification";

const TOKEN = localStorage.getItem("access_token");

const BASE_URL =
  "/api/evaluation-service/notifications";

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
    method: "GET",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch notifications");
  }

  return response.json();
}