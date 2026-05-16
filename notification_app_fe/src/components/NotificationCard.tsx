import {
  Card,
  CardContent,
  Typography,
  Chip,
} from "@mui/material";

import type { Notification } from "../types/notification";

interface Props {
  notification: Notification;
  viewed: boolean;
  onClick: () => void;
}

function NotificationCard({
  notification,
  viewed,
  onClick,
}: Props) {
  return (
    <Card
      onClick={onClick}
      sx={{
        mb: 2,
        cursor: "pointer",
        opacity: viewed ? 0.6 : 1,
      }}
    >
      <CardContent>
        <Typography variant="h6">
          {notification.Type}
        </Typography>

        <Typography variant="body1" sx={{ mt: 1 }}>
          {notification.Message}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          {notification.Timestamp}
        </Typography>

        {!viewed && (
          <Chip
            label="NEW"
            color="primary"
            size="small"
            sx={{ mt: 2 }}
          />
        )}
      </CardContent>
    </Card>
  );
}

export default NotificationCard;