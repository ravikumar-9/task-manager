"use client";

import { useState } from "react";
import { useTasks } from "@/context/taskcontext";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CreateTaskDialog() {
  const { addTask } = useTasks();

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = async () => {
    if (!title) return;

    await addTask(title, description);
    setTitle("");
    setDescription("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Task</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Task</DialogTitle>
        </DialogHeader>

        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Button onClick={handleCreate}>Create</Button>
      </DialogContent>
    </Dialog>
  );
}