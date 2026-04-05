import { authMiddleware } from "../../middleware/auth.middleware";
import { createTask, deleteTask, getTasks, toggleTaskStatus, updateTask } from "./tasks.controller";
import { Router, Request, Response } from "express";

interface createTaskRequest extends Request {
    user: {
        userId: string;
    };
}

const router = Router();

router.post("/create", authMiddleware, createTask);
router.get("/", authMiddleware, getTasks);
router.get("/:id", authMiddleware, getTasks);
router.patch("/:id", authMiddleware, updateTask);
router.patch("/:id/toggle", authMiddleware, toggleTaskStatus);
router.delete("/:id", authMiddleware, deleteTask);

export default router;