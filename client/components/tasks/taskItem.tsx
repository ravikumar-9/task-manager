"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTasks } from "@/context/taskcontext";

export default function TaskItem({ task }: any) {
  const { toggleTask } = useTasks();

  return (
    <div className="border rounded-xl p-4 space-y-2 shadow-sm">
      
      {/* Title + Status */}
      <div className="flex justify-between items-center">
        <h2
          className={`font-semibold ${
            task.status ? "line-through text-muted-foreground" : ""
          }`}
        >
          {task.title}
        </h2>

        <Badge variant={task.status ? "default" : "secondary"}>
          {task.status ? "Completed" : "Pending"}
        </Badge>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-sm text-muted-foreground">
          {task.description}
        </p>
      )}

      {/* Created At */}
      <p className="text-xs text-muted-foreground">
        Created: {new Date(task.createdAt).toLocaleString()}
      </p>

      {/* Actions */}
      <div className="flex gap-2 pt-2">
        <Button size="sm" onClick={() => toggleTask(task.id)}>
          Toggle
        </Button>
      </div>
    </div>
  );
}