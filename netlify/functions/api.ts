import serverless from "serverless-http";
import { app } from "../../server";
import { initDb } from "../../server/db";

let dbInitialized = false;

// We wrap the Express app with serverless-http.
// The 'request' hook allows us to initialize the database connection on cold starts
// before the request reaches the Express router.
export const handler = serverless(app, {
  request: async (req: any, event: any, context: any) => {
    if (!dbInitialized) {
      console.log("Cold start: Initializing Turso Database Connection...");
      await initDb();
      dbInitialized = true;
    }
  }
});
