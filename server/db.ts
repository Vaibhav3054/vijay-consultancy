import { createClient, Client } from '@libsql/client';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

let client: Client;

export async function initDb() {
  if (client) return client;
  
  if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_AUTH_TOKEN) {
    throw new Error('TURSO_DATABASE_URL and TURSO_AUTH_TOKEN environment variables must be set.');
  }

  client = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  // Execute schema creation
  await client.executeMultiple(`
    CREATE TABLE IF NOT EXISTS Admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      display_name TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS Customers (
      mobile_number TEXT PRIMARY KEY,
      customer_name TEXT NOT NULL,
      father_husband_name TEXT,
      dob TEXT,
      gender TEXT,
      alternate_number TEXT,
      email TEXT,
      address TEXT,
      city TEXT,
      state TEXT,
      pin_code TEXT,
      occupation TEXT,
      aadhaar_number TEXT,
      pan_number TEXT,
      nominee_name TEXT,
      nominee_relation TEXT,
      notes TEXT,
      status TEXT DEFAULT 'Active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS Policies (
      id TEXT PRIMARY KEY,
      mobile_number TEXT NOT NULL,
      policy_number TEXT NOT NULL,
      policy_type TEXT,
      insurance_company TEXT,
      plan_name TEXT,
      sum_assured REAL,
      premium_amount REAL,
      premium_frequency TEXT,
      policy_start_date TEXT,
      policy_maturity_date TEXT,
      premium_due_date TEXT,
      status TEXT DEFAULT 'Active',
      agent_remarks TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(mobile_number) REFERENCES Customers(mobile_number) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS PremiumPayments (
      id TEXT PRIMARY KEY,
      policy_id TEXT NOT NULL,
      amount REAL NOT NULL,
      due_date TEXT,
      paid_date TEXT,
      status TEXT DEFAULT 'Pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(policy_id) REFERENCES Policies(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS Documents (
      id TEXT PRIMARY KEY,
      mobile_number TEXT NOT NULL,
      file_name TEXT NOT NULL,
      file_type TEXT NOT NULL,
      file_url TEXT NOT NULL,
      uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(mobile_number) REFERENCES Customers(mobile_number) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS Activities (
      id TEXT PRIMARY KEY,
      mobile_number TEXT,
      type TEXT NOT NULL,
      description TEXT NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(mobile_number) REFERENCES Customers(mobile_number) ON DELETE SET NULL
    );
  `);

  // Try to enable foreign keys. In libSQL/Turso, foreign keys are usually enabled by default, 
  // but it's safe to run PRAGMA.
  await client.execute('PRAGMA foreign_keys = ON');

  // Seed default admin if missing
  const adminRow = await client.execute('SELECT COUNT(*) as count FROM Admins');
  if (adminRow.rows[0] && Number(adminRow.rows[0].count) === 0) {
    const defaultPassword = 'Admin@Vijay2026';
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);
    
    await client.execute({
      sql: `INSERT INTO Admins (username, email, password_hash, display_name) VALUES (?, ?, ?, ?)`,
      args: ['admin', 'vaibhavacharya305@gmail.com', hashedPassword, 'Vijay Kumar Sahu']
    });
    console.log('Default admin user seeded into Turso.');
  }

  return client;
}

export function getDb() {
  if (!client) {
    throw new Error('Database not initialized. Call initDb() first.');
  }
  return client;
}
