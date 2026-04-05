"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";

export default function TaskDialog({
  open,
  setOpen,
  title,
  setTitle,
  description,
  setDescription,
  onSubmit,
  mode = "create",
  loading,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  mode?: "create" | "edit";
  loading?: boolean;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {mode === "create" && (
        <DialogTrigger asChild>
          <Button className="text-base px-5 py-2 shadow-sm cursor-pointer">+ New Task</Button>
        </DialogTrigger>
      )}

      <DialogContent className="w-full max-w-lg p-6 md:p-8 space-y-6 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl md:text-3xl font-semibold">
            {mode === "edit" ? "Edit Task" : "Create Task"}
          </DialogTitle>
          <p className="text-sm text-muted-foreground mt-1">
            {mode === "edit"
              ? "Update your task details below"
              : "Add a new task to stay organized"}
          </p>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input
              placeholder="e.g. Finish dashboard UI"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
              className="h-11 text-base"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              placeholder="Optional details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-11 text-base"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className={`w-full h-11 text-base ${
              loading ? "animate-pulse" : ""
            }`}
          >
            {loading
              ? mode === "edit"
                ? "Updating..."
                : "Creating..."
              : mode === "edit"
              ? "Update Task"
              : "Create Task"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
