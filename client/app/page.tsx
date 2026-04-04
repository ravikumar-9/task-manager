"use client";

import { useEffect, useState } from "react";
import { useTasks } from "@/context/taskcontext";

import TaskItem from "@/components/tasks/taskItem";
import TaskFilters from "@/components/tasks/taskfilters";
import CreateTaskDialog from "@/components/tasks/createtaskdialog";

export default function Dashboard() {
  const { tasks, fetchTasks } = useTasks();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchTasks({ search, status });
    }, 400);

    return () => clearTimeout(delay);
  }, [search, status]);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Your Tasks</h1>
        <CreateTaskDialog />
      </div>

      <TaskFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      <div className="space-y-4">
        {tasks?.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No tasks found
          </p>
        ) : (
          tasks?.map((task: any) => (
            <TaskItem key={task.id} task={task} />
          ))
        )}
      </div>
    </div>
  );
}