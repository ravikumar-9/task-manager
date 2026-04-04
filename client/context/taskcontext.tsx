"use client";

import { createContext, useContext, useState } from "react";
import api from "@/lib/api";

const TaskContext = createContext<any>(null);

export const TaskProvider = ({ children }: any) => {
  const [tasks, setTasks] = useState([]);
  const [meta, setMeta] = useState({ page: 1, total: 0 });

  const fetchTasks = async (params: any = {}) => {
    const res = await api.get(`/tasks?search=${params?.search}&status=${params?.status}`);
    setTasks(res?.data?.tasks || []);
    setMeta({ page: res.data.page, total: res.data.total });
  };

  const addTask = async (title: string,description?:string) => {
    await api.post("/tasks/create", { title,description });
    fetchTasks();
  };

  const toggleTask = async (id: string) => {
    await api.patch(`/tasks/${id}/toggle`);
    fetchTasks();
  };

  const deleteTask = async (id: string) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  return (
    <TaskContext.Provider
      value={{ tasks, fetchTasks, addTask, toggleTask, deleteTask, meta }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);