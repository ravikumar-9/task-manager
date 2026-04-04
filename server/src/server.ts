import { sql } from "drizzle-orm";
import app from "./app";
import { db } from "./db";

const PORT = process.env.PORT || 5000;

async function checkDBConnection() {
  try {
    await db.execute(sql`SELECT 1`);
    console.log("Database connected successfully");
  } catch (error) {
    console.error(" Database connection failed");
    console.error(error);
  }
}

checkDBConnection();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
