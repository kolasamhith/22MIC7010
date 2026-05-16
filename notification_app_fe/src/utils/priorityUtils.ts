import type { Notification } from "../types/notification";

export function getPriority(type: string): number {
  switch (type) {
    case "Placement":
      return 3;

    case "Result":
      return 2;

    case "Event":
      return 1;

    default:
      return 0;
  }
}

export function sortNotifications(
  notifications: Notification[]
): Notification[] {
  return notifications.sort((a, b) => {
    const priorityDifference =
      getPriority(b.Type) - getPriority(a.Type);

    if (priorityDifference !== 0) {
      return priorityDifference;
    }

    return (
      new Date(b.Timestamp).getTime() -
      new Date(a.Timestamp).getTime()
    );
  });
}