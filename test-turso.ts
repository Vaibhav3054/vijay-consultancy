import { createClient } from '@libsql/client';
import dotenv from 'dotenv';
dotenv.config();

async function main() {
  const client = createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  });

  try {
    const rs = await client.execute("SELECT * FROM Admins");
    console.log("Admins table:");
    console.log(rs.rows);
  } catch (err: any) {
    console.error("Error fetching Admins:", err.message);
  }
}

main();
