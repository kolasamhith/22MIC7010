# Stage 1

## Problem Statement

The objective of this stage is to implement a priority inbox system for campus notifications. The system should display the top unread notifications based on notification importance and recency.

---

## Priority Strategy

Notifications are prioritized using the following order:

1. Placement
2. Result
3. Event

Each notification type is assigned a numerical weight:

- Placement → 3
- Result → 2
- Event → 1

Notifications with higher weights are ranked first.

If two notifications have the same priority, the most recent notification is displayed first using timestamp comparison.

---

## Approach

The implementation follows these steps:

1. Fetch notifications from the provided Notification API.
2. Assign weights to notifications based on type.
3. Sort notifications using:
   - Priority weight in descending order
   - Timestamp in descending order
4. Extract the top 10 notifications from the sorted list.

---

## Efficient Maintenance of Top Notifications

Currently, sorting is used to determine the top notifications.

Time Complexity:
- Sorting Complexity → O(n log n)

For larger-scale systems where notifications continuously arrive, a Min Heap of size 10 can be used to efficiently maintain the top notifications without sorting the entire dataset repeatedly.

Advantages of Min Heap:
- Maintains only top 10 records
- Better scalability
- Reduced processing overhead

---

## Logging Middleware Integration

A reusable logging middleware was implemented using a centralized `Log()` function.

The middleware:
- Sends logs to the provided Logging API
- Captures API operations
- Captures sorting and processing events
- Captures unexpected failures
- Avoids use of console logging

Logging was integrated throughout the notification processing lifecycle to improve observability and debugging.

---

## Technologies Used

- React
- TypeScript
- Material UI
- Vite