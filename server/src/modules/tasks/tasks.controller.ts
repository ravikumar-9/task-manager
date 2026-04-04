import { Request, Response } from "express";
import { db } from "../../db";
import { tasks } from "../../db/schema";
import { eq, ilike, and, sql } from "drizzle-orm";

export interface createTaskRequest extends Request {
  user: {
    userId: string;
  };
}

export const createTask = async (req: createTaskRequest, res: Response) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }
    const newTask = await db
      .insert(tasks)
      .values({
        title: title as string,
        description: description as string,
        userId: req?.user?.userId,
      })
      .returning();
    return res
      .status(201)
      .json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    console.error("Error creating task:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getTasks = async (req: createTaskRequest, res: Response) => {
try{
  const userId = req?.user?.userId;
  const { skip, limit, search, status } = req.query;

  const filters = [
    eq(tasks.userId, userId),
    search ? ilike(tasks.title, `%${search}%`) : undefined,
    status !== undefined ? eq(tasks.status, status === "status") : undefined,
  ].filter(Boolean);

  const totalTasks = await db
    .select({ count: sql<number>`count(*)` })
    .from(tasks)
    .where(and(...filters))

  const userTasks = await db
    .select()
    .from(tasks)
    .where(and(...filters))
    .offset(skip ? parseInt(skip as string) : 0)
    .limit(limit ? parseInt(limit as string) : 10);
  return res.status(200).json({ tasks: userTasks,pagination: { total: totalTasks[0].count, skip: skip ? parseInt(skip as string) : 0, limit: limit ? parseInt(limit as string) : 10 } });
}
catch(error){
  console.error("Error fetching tasks:", error);
  return res.status(500).json({ message: "Internal server error" });
};

}

export const getTaskById = async (req: createTaskRequest, res: Response) => {
  try {
    const userId = req?.user?.userId;
    const { id } = req.params;
    const task = await db
      .select()
      .from(tasks)
      .where(and(eq(tasks.id, id as string), eq(tasks.userId, userId)))
      .limit(1);
    if (task.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json({ task: task[0] });
  } catch (error) {
    console.error("Error fetching task:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const updateTask = async (req: createTaskRequest, res: Response) => {
  try {
    const userId = req?.user?.userId;
    const { id } = req.params;
    const { title, description, status } = req.body;

    const task = await db
      .update(tasks)
      .set({
        title: title as string,
        description: description as string,
        status: status as boolean,
      })
      .where(and(eq(tasks.id, id as string), eq(tasks.userId, userId)))
      .returning();

    if (task.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json({ message: "Task updated successfully", task: task[0] });
  } catch (error) {
    console.error("Error updating task:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const deleteTask = async (req: createTaskRequest, res: Response) => {
  try {
    const userId = req?.user?.userId;
    const { id } = req.params;

    const deletedTask = await db
      .delete(tasks)
      .where(and(eq(tasks.id, id as string), eq(tasks.userId, userId)))
      .returning();

    if (deletedTask.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json({ message: "Task deleted successfully", task: deletedTask[0] });
  } catch (error) {
    console.error("Error deleting task:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const toggleTaskStatus = async (req: createTaskRequest, res: Response) => {
  try {
    const userId = req?.user?.userId;
    const { id } = req.params;

    const task = await db
      .update(tasks)
      .set({ status: !tasks?.status })
      .where(and(eq(tasks.id, id as string), eq(tasks.userId, userId)))
      .returning();

    if (task.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json({ message: "Task status toggled successfully", task: task[0] });
  } catch (error) {
    console.error("Error toggling task status:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
