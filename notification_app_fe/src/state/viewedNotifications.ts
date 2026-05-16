const viewedKey = "viewed_notifications";

export function getViewedNotifications(): string[] {
  return JSON.parse(localStorage.getItem(viewedKey) || "[]");
}

export function markAsViewed(id: string): void {
  const viewed = getViewedNotifications();

  if (!viewed.includes(id)) {
    viewed.push(id);
    localStorage.setItem(viewedKey, JSON.stringify(viewed));
  }
}