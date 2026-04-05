"use client";

import { FormEvent, useEffect, useState } from "react";
import { useTasks } from "@/context/taskcontext";

import TaskItem from "@/components/tasks/taskItem";
import TaskFilters from "@/components/tasks/taskfilters";
import TaskDialog from "@/components/tasks/createtaskdialog";
import TaskSkeleton from "@/components/tasks/taskskeleton";
import Pagination from "@/components/pagination";
import useDebounce from "@/hooks/usedebounce";
import { Task } from "@/types/tasks.types";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authContext";
import { LogOut } from "lucide-react";

export default function Dashboard() {
  const {
    tasks,
    fetchTasks,
    loading,
    isTaskUpdateLoading,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
  } = useTasks();
  const { logout } = useAuth();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  // Pagination
  const [page, setPage] = useState(0);
  const limit = 6;
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const debouncedSearchTerm = useDebounce({ search, delay: 500 });

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchTasks({
        search: debouncedSearchTerm,
        status,
        skip: page,
        limit,
      });
      setTotal(res?.pagination?.total || 0);
      setTotalPages(Math.ceil(res?.pagination?.total / limit));
    };

    fetchData();
  }, [debouncedSearchTerm, status, page]);

  useEffect(() => {
    setPage(0);
  }, [debouncedSearchTerm, status]);

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    await addTask(title, description);
    fetchTasks({ search: debouncedSearchTerm, status, skip: page, limit });
    resetState();
  };

  const handleEdit = (task: Task) => {
    setMode("edit");
    setOpen(true);
    setSelectedTaskId(task.id);
    setTitle(task.title);
    setDescription(task.description || "");
  };

  const handleUpdate = async () => {
    if (!selectedTaskId) return;
    await updateTask(selectedTaskId, title, description);
    fetchTasks({ search: debouncedSearchTerm, status, skip: page, limit });
    resetState();
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    fetchTasks({ search: debouncedSearchTerm, status, skip: page, limit });
  };

  const handleToggle = async (task: Task, updateStatus: string) => {
    await toggleTask(task?.id, updateStatus);
    fetchTasks({ search: debouncedSearchTerm, status, skip: page, limit });
  };

  const resetState = () => {
    setTitle("");
    setDescription("");
    setSelectedTaskId(null);
    setOpen(false);
    setMode("create");
  };

  const handlePageClick = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected * limit);
  };

  return (
    <div className="px-4 py-6 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Your Tasks
          </h1>
          <p className="text-base text-muted-foreground mt-1">
            Manage and track your daily work efficiently
          </p>
        </div>
        <div className="flex items-center gap-2">
          <TaskDialog
            open={open}
            setOpen={setOpen}
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            onSubmit={mode === "edit" ? handleUpdate : handleCreate}
            mode={mode}
            loading={isTaskUpdateLoading}
          />
          <Button onClick={logout} className="cursor-pointer">
            <LogOut className="text-red-500" />
            Logout
            <span className="sr-only">Logout</span>
          </Button>
        </div>
      </div>

      <TaskFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      <div className="space-y-4 min-h-75">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => <TaskSkeleton key={i} />)}
          </div>
        ) 
        : tasks?.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-xl font-medium">No tasks found</p>
            <p className="text-sm mt-2">
              Try adjusting your search or create a new task
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tasks?.map((task: Task) => (
                <TaskItem
                  key={task?.id}
                  task={task}
                  onEdit={() => handleEdit(task)}
                  onDelete={() => handleDelete(task?.id)}
                  onToggle={handleToggle}
                  isLoading={isTaskUpdateLoading}
                />
              ))}
            </div>

            <Pagination
              total={total}
              pageCount={totalPages}
              skip={page}
              forcePage={Math.floor(page / limit)}
              handlePageClick={handlePageClick}
            />
          </>
        )}
      </div>
    </div>
  );
}
