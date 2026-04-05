export default function TaskSkeleton() {
    return (
      <div className="border rounded-xl p-4 space-y-3 animate-pulse">
        <div className="flex justify-between items-center">
          <div className="h-4 w-40 bg-muted rounded" />
          <div className="h-5 w-20 bg-muted rounded" />
        </div>
  
        <div className="h-3 w-full bg-muted rounded" />
        <div className="h-3 w-3/4 bg-muted rounded" />
  
        <div className="h-3 w-32 bg-muted rounded" />
  
        <div className="flex gap-2 pt-2">
          <div className="h-8 w-20 bg-muted rounded" />
        </div>
      </div>
    );
  }