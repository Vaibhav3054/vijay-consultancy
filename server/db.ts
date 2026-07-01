import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcrypt';

const DATA_DIR = path.join(process.cwd(), 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

let db: Database<sqlite3.Database, sqlite3.Statement>;

export async function initDb() {
  if (db) return db;
  
  db = await open({
    filename: path.join(DATA_DIR, 'crm.db'),
    driver: sqlite3.Database
  });

  await db.exec(`
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

  await db.exec('PRAGMA foreign_keys = ON');

  // Seed default admin if missing
  const adminRow = await db.get('SELECT COUNT(*) as count FROM Admins');
  if (adminRow && adminRow.count === 0) {
    const defaultPassword = 'Admin@Vijay2026';
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);
    
    await db.run(
      `INSERT INTO Admins (username, email, password_hash, display_name) VALUES (?, ?, ?, ?)`,
      'admin', 'vaibhavacharya305@gmail.com', hashedPassword, 'Vijay Kumar Sahu'
    );
    console.log('Default admin user seeded.');
  }

  return db;
}

export function getDb() {
  if (!db) {
    throw new Error('Database not initialized. Call initDb() first.');
  }
  return db;
}
