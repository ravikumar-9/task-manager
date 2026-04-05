"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Task } from "@/types/tasks.types";
import { statusMap } from "@/constants/statusmap";

export default function TaskItem({
  task,
  onEdit,
  onDelete,
  onToggle,
}: {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
  onToggle: (status:string) => void;
}) {
  const currentStatus = statusMap[task.status];
  return (
    <div className="border rounded-2xl p-6 md:p-7 space-y-5 shadow-sm hover:shadow-lg transition bg-background">
      <div className="flex justify-between items-start gap-4">
        <h2
          className={`text-xl md:text-2xl font-semibold leading-snug ${
            currentStatus.style
          }`}
        >
          {task.title}
        </h2>

        <Badge className="text-sm px-3 py-1" variant={currentStatus.badge}>
          {currentStatus.label}
        </Badge>
      </div>
      {task.description && (
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
          {task.description}
        </p>
      )}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-2">
        <p className="text-sm text-muted-foreground">
          Created: {new Date(task.createdAt).toLocaleDateString()}
        </p>

        <div className="flex flex-wrap gap-2">
          {task.status !== "completed" && (
            <Button
              variant="outline"
              onClick={() => onToggle("completed")}
              className="text-sm px-4"
            >
              Mark Done
            </Button>
          )}

          {task.status === "pending" && (
            <Button
              variant="outline"
              onClick={() => onToggle("in_progress")}
              className="text-sm px-4"
            >
              Start
            </Button>
          )}

          {task.status === "in_progress" && (
            <Button
              variant="outline"
              onClick={() => onToggle("pending")}
              className="text-sm px-4"
            >
              Mark Pending
            </Button>
          )}

          <Button variant="outline" onClick={onEdit}>
            Edit
          </Button>

          <Button variant="destructive" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
