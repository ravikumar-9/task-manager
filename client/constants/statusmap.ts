export const statusMap = {
    pending: {
      label: "Pending",
      badge: "secondary",
      style: "",
    },
    in_progress: {
      label: "In Progress",
      badge: "outline",
      style: "",
    },
    completed: {
      label: "Completed",
      badge: "default",
      style: "line-through text-muted-foreground",
    },
  } as const;