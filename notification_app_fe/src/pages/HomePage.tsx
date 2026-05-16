import { useEffect, useState } from "react";

import {
  Container,
  Typography,
  Select,
  MenuItem,
  Pagination,
  CircularProgress,
  Box,
} from "@mui/material";

import NotificationCard from "../components/NotificationCard";

import { fetchNotifications } from "../api/notificationApi";

import type { Notification } from "../types/notification";

import {
  getViewedNotifications,
  markAsViewed,
} from "../state/viewedNotifications";

import { Log } from "../utils/logger";

function HomePage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);

  const [type, setType] = useState("All");

  const [viewed, setViewed] = useState<string[]>(
    getViewedNotifications()
  );

  async function loadNotifications() {
    setLoading(true);

    try {
      await Log(
        "frontend",
        "info",
        "page",
        `Loading notifications for page ${page}`
      );

      const data = await fetchNotifications(
        page,
        10,
        type
      );

      await Log(
        "frontend",
        "debug",
        "api",
        `${data.notifications.length} notifications fetched`
      );

      setNotifications(data.notifications);

      await Log(
        "frontend",
        "info",
        "page",
        "Notifications rendered successfully"
      );
    } catch (error) {
      await Log(
        "frontend",
        "error",
        "api",
        "Failed to load notifications"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNotifications();
  }, [page, type]);

  async function handleViewed(id: string) {
    await Log(
      "frontend",
      "info",
      "state",
      `Notification ${id} marked as viewed`
    );

    markAsViewed(id);

    setViewed(getViewedNotifications());
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Campus Notifications
      </Typography>

      <Select
        value={type}
        onChange={async (e) => {
          const selectedType = e.target.value;

          await Log(
            "frontend",
            "info",
            "component",
            `Notification filter changed to ${selectedType}`
          );

          setType(selectedType);
          setPage(1);
        }}
        sx={{ mb: 3, minWidth: 200 }}
      >
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="Placement">Placement</MenuItem>
        <MenuItem value="Result">Result</MenuItem>
        <MenuItem value="Event">Event</MenuItem>
      </Select>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 6,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        notifications.map((notification) => (
          <NotificationCard
            key={notification.ID}
            notification={notification}
            viewed={viewed.includes(notification.ID)}
            onClick={() =>
              handleViewed(notification.ID)
            }
          />
        ))
      )}

      <Pagination
        count={10}
        page={page}
        onChange={async (_, value) => {
          await Log(
            "frontend",
            "info",
            "component",
            `Navigated to page ${value}`
          );

          setPage(value);
        }}
        sx={{ mt: 4 }}
      />
    </Container>
  );
}

export default HomePage;