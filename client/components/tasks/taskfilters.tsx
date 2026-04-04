"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function TaskFilters({
  search,
  setSearch,
  status,
  setStatus,
}: any) {
  return (
    <div className="flex flex-col md:flex-row gap-3 md:items-center justify-between">
      <Input
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="md:w-75"
      />

      <div className="flex gap-2">
        <Button
          variant={status === "" ? "default" : "outline"}
          onClick={() => setStatus("")}
        >
          All
        </Button>

        <Button
          variant={status === "true" ? "default" : "outline"}
          onClick={() => setStatus("true")}
        >
          Completed
        </Button>

        <Button
          variant={status === "false" ? "default" : "outline"}
          onClick={() => setStatus("false")}
        >
          Pending
        </Button>
      </div>
    </div>
  );
}