"use client";

import { createContext, useContext, useState } from "react";
import api from "@/lib/api";
import { apiErrorHandler } from "@/lib/errorhandler";

interface TaskContextType {
  tasks: any[];
  fetchTasks: (params?: {
    search: string;
    status: string;
    skip: number;
    limit: number;
  }) => Promise<void>;
  addTask: (title: string, description?: string) => Promise<void>;
  updateTask: (
    taskId: string,
    title: string,
    description?: string
  ) => Promise<void>;
  toggleTask: (id: string, status: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  meta: { page: number; total: number };
  loading: boolean;
  isTaskUpdateLoading: boolean;
}

const TaskContext = createContext<TaskContextType | null>(null);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState([]);
  const [meta, setMeta] = useState({ page: 1, total: 0 });
  const [loading, setLoading] = useState(false);
  const [isTaskUpdateLoading, setIsTaskUpdateLoading] = useState(false);

  const fetchTasks = async (params: any = {}) => {
    try {
      setLoading(true);
      const res = await api.get(
        `/tasks?search=${params?.search}&status=${params?.status}&skip=${params?.skip}&limit=${params?.limit}`
      );
      setTasks(res?.data?.tasks || []);
      setMeta({ page: res.data.page, total: res.data.total });
      return res?.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      apiErrorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (title: string, description?: string) => {
    try {
      setIsTaskUpdateLoading(true);
      await api.post("/tasks/create", { title, description });
    } catch (error) {
      console.error("Error adding task:", error);
      apiErrorHandler(error);
    } finally {
      setIsTaskUpdateLoading(false);
    }
  };

  const updateTask = async (
    taskId: string,
    title: string,
    description?: string
  ) => {
    try {
      setIsTaskUpdateLoading(true);
      await api.patch(`/tasks/${taskId}`, { title, description });
    } catch (error) {
      console.error("Error adding task:", error);
      apiErrorHandler(error);
    } finally {
      setIsTaskUpdateLoading(false);
    }
  };

  const toggleTask = async (id: string, status: string) => {
    try {
      setIsTaskUpdateLoading(true);
      await api.patch(`/tasks/${id}/toggle`, { status });
    } catch (error) {
      console.error("Error toggling task:", error);
      apiErrorHandler(error);
    } finally {
      setIsTaskUpdateLoading(false);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      setIsTaskUpdateLoading(true);
      await api.delete(`/tasks/${id}`);
    } catch (error) {
      console.error("Error deleting task:", error);
      apiErrorHandler(error);
    } finally {
      setIsTaskUpdateLoading(false);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        fetchTasks,
        addTask,
        updateTask,
        toggleTask,
        deleteTask,
        meta,
        loading,
        isTaskUpdateLoading,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
