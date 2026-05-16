import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Box,
} from "@mui/material";

import type { Notification } from "./types/notification";
import { fetchTopNotifications } from "./services/notificationService";
import "./App.css";

function App() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadNotifications() {
      try {
        const data = await fetchTopNotifications();
        setNotifications(data);
      } catch (error) {
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    }

    loadNotifications();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Priority Notifications
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        notifications.map((notification) => (
          <Card key={notification.ID} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">
                {notification.Type}
              </Typography>

              <Typography variant="body1">
                {notification.Message}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {notification.Timestamp}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
}

export default App;