"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function DeleteTaskDialog({ onDelete, trigger }: {onDelete: () => void, trigger: React.ReactNode}) {
  return (
    <AlertDialog>
    <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>

    <AlertDialogContent className="max-w-md p-6 md:p-8 rounded-2xl">
      <AlertDialogHeader className="space-y-3">
        <AlertDialogTitle className="text-xl md:text-2xl font-semibold">
          Delete Task?
        </AlertDialogTitle>

        <AlertDialogDescription className="text-base md:text-lg text-muted-foreground leading-relaxed">
          This action cannot be undone. The task will be permanently removed
          from your list.
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter className="mt-6 flex gap-3 sm:justify-end">
        <AlertDialogCancel className="text-base px-5 py-2.5 cursor-pointer">
          Cancel
        </AlertDialogCancel>

        <AlertDialogAction
          onClick={onDelete}
          className="text-base bg-red-400 px-5 py-2.5 cursor-pointer"
        >
          Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  );
}