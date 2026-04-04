ALTER TABLE "tasks" ADD COLUMN "status" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "tasks" DROP COLUMN "completed";