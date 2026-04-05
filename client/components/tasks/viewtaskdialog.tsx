"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Task } from "@/types/tasks.types";
import { statusMap } from "@/constants/statusmap";


export default function ViewTaskDialog({ task, trigger }: {task:Task,trigger: React.ReactNode}) {

    const statusStyles=statusMap[task.status]

  return (
    <Dialog>
    <DialogTrigger asChild>{trigger}</DialogTrigger>

    <DialogContent className="sm:max-w-xl p-6 md:p-8 rounded-2xl">
      <DialogHeader className="space-y-4">
        <DialogTitle className="text-xl md:text-2xl font-semibold flex items-center justify-between">
          {task?.title}
          <Badge
            variant={statusStyles?.badge}
            className="text-sm px-3 py-1"
          >
            {statusStyles?.label}
          </Badge>
        </DialogTitle>
      </DialogHeader>

      <div className="space-y-5 mt-4">
        {task.description ? (
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            {task?.description}
          </p>
        ) : (
          <p className="text-base text-muted-foreground italic">
            No description provided
          </p>
        )}

        <div className="text-sm md:text-base text-muted-foreground pt-2 border-t">
          Created on:{" "}
          {new Date(task.createdAt).toLocaleString()}
        </div>
      </div>
    </DialogContent>
  </Dialog>
  );
}