"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Task } from "@/types/tasks.types";
import { statusMap } from "@/constants/statusmap";
import ViewTaskDialog from "./viewtaskdialog";
import DeleteTaskDialog from "./deletetaskdialog";
import {
  CheckCircle,
  PlayCircle,
  RotateCcw,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

export default function TaskItem({
  task,
  onEdit,
  onDelete,
  onToggle,
  isLoading
}: {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
  onToggle: (task: Task, status: string) => void;
  isLoading?: boolean;
}) {
  const currentStatus = statusMap[task?.status];

  return (
    <Card className="rounded-2xl shadow-sm hover:shadow-xl transition-all hover:border-primary/30">
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <CardTitle
          className={`text-xl md:text-2xl font-semibold leading-snug ${currentStatus?.style}`}
        >
          {task?.title}
        </CardTitle>

        <Badge
          variant={currentStatus?.badge}
          className="text-sm px-3 py-1 capitalize"
        >
          {currentStatus?.label}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        {task?.description && (
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            {task?.description?.slice(0, 70)}{task?.description?.length > 70 && "..."}
          </p>
        )}

        <p className="text-sm text-muted-foreground">
          Created: {new Date(task?.createdAt).toLocaleDateString()}
        </p>
      </CardContent>
      <CardFooter className="flex flex-wrap mt-auto h-fit gap-2 pt-4 border-t">
        {task?.status !== "completed" && (
          <Button
            variant="outline"
            onClick={() => onToggle(task, "completed")}
            className="flex items-center gap-2 cursor-pointer"
            disabled={isLoading}
          >
            <CheckCircle size={16} />
            Done
          </Button>
        )}
        {task?.status === "pending" && (
          <Button
            variant="outline"
            onClick={() => onToggle(task, "in_progress")}
            className="flex items-center gap-2 cursor-pointer"
            disabled={isLoading}
          >
            <PlayCircle size={16} />
            Start
          </Button>
        )}
        {task?.status === "in_progress" && (
          <Button
            variant="outline"
            onClick={() => onToggle(task, "pending")}
            className="flex items-center gap-2 cursor-pointer"
            disabled={isLoading}  
          >
            <RotateCcw size={16} />
            Pending
          </Button>
        )}

        <ViewTaskDialog
          task={task}
          trigger={
            <Button
              variant="outline"
              className="flex items-center gap-2 cursor-pointer"
              disabled={isLoading}
            >
              <Eye size={16} />
              View
            </Button>
          }
        />
        <Button
          variant="outline"
          onClick={onEdit}
          className="flex items-center gap-2 cursor-pointer"
          disabled={isLoading}
        >
          <Pencil size={16} />
          Edit
        </Button>
        <DeleteTaskDialog
          onDelete={onDelete}
          trigger={
            <Button
              variant="destructive"
              className="flex items-center gap-2 cursor-pointer"
              disabled={isLoading}
            >
              <Trash2 size={16} />
              Delete
            </Button>
          }
        />
      </CardFooter>
    </Card>
  );
}
