"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function TaskFilters({
  search,
  setSearch,
  status,
  setStatus,
}: {
  search: string;
  setSearch: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
}) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 p-4 lg:p-5 border rounded-2xl bg-background shadow-sm">
      <div className="w-full md:max-w-lg">
        <Input
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-12 text-lg px-4"
        />
      </div>
      <div className="flex flex-wrap gap-3">
        <Button
          size="default"
          variant={status === "" ? "default" : "outline"}
          onClick={() => setStatus("")}
          className="text-base px-5 py-2 cursor-pointer"
        >
          All
        </Button>
        <Button
          size="default"
          variant={status === "pending" ? "default" : "outline"}
          onClick={() => setStatus("pending")}
          className="text-base px-5 py-2 cursor-pointer"
        >
          Pending
        </Button>
        <Button
          size="default"
          variant={status === "in_progress" ? "default" : "outline"}
          onClick={() => setStatus("in_progress")}
          className="text-base px-5 py-2 cursor-pointer"
        >
          In Progress
        </Button>
        <Button
          size="default"
          variant={status === "completed" ? "default" : "outline"}
          onClick={() => setStatus("completed")}
          className="text-base px-5 py-2 cursor-pointer"
        >
          Completed
        </Button>
      </div>
    </div>
  );
}
