import express, { Request, Response, NextFunction } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { initDb, getDb } from "./server/db.js";

export const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "vijay-consultancy-super-secret-key-2026";

app.use(express.json());
app.use(cookieParser());

// --- Authentication Middleware ---
interface AuthRequest extends Request {
  admin?: { id: number; username: string; email: string };
}

function authenticateAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.cookies.admin_token;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
}

// ==========================================
// API Endpoints
// ==========================================

// --- Auth API ---
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const db = getDb();
    const rs = await db.execute({
      sql: "SELECT * FROM Admins WHERE email = ? OR username = ?",
      args: [email, email]
    });
    const admin = rs.rows[0];

    if (!admin) {
      return res.status(401).json({ error: "Invalid credentials (Admin user not found in Turso)." });
    }

    const isMatch = await bcrypt.compare(password, admin.password_hash as string);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials (Password mismatch in bcrypt)." });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username, email: admin.email, displayName: admin.display_name },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.cookie("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      uid: admin.id.toString(),
      email: admin.email,
      displayName: admin.display_name
    });
  } catch (error: any) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Internal Server Error during login." });
  }
});

app.post("/api/auth/logout", (req, res) => {
  res.clearCookie("admin_token");
  res.json({ success: true });
});

app.get("/api/auth/me", authenticateAdmin, async (req: AuthRequest, res) => {
  const db = getDb();
  const rs = await db.execute({
    sql: "SELECT id, username, email, display_name FROM Admins WHERE id = ?",
    args: [req.admin?.id as any]
  });
  const admin = rs.rows[0];
  if (!admin) return res.status(401).json({ error: "Admin not found" });
  
  res.json({
    uid: admin.id.toString(),
    email: admin.email,
    displayName: admin.display_name
  });
});

app.post("/api/auth/change-password", authenticateAdmin, async (req: AuthRequest, res) => {
  const { password } = req.body;
  if (!password || password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters long." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const db = getDb();
  await db.execute({
    sql: "UPDATE Admins SET password_hash = ? WHERE id = ?",
    args: [hashedPassword, req.admin?.id as any]
  });

  res.json({ success: true, message: "Password updated successfully." });
});

app.post("/api/auth/update-profile", authenticateAdmin, async (req: AuthRequest, res) => {
  const { displayName } = req.body;
  if (!displayName || displayName.trim().length === 0) {
    return res.status(400).json({ error: "Display name cannot be empty." });
  }

  const db = getDb();
  await db.execute({
    sql: "UPDATE Admins SET display_name = ? WHERE id = ?",
    args: [displayName.trim(), req.admin?.id as any]
  });
  res.json({ success: true, displayName: displayName.trim() });
});

// --- Public API for Landing Page ---
import fs from 'fs';
app.get("/api/cms", (req, res) => {
  const filePath = path.join(process.cwd(), "data", "cms.json");
  if (fs.existsSync(filePath)) {
    res.json(JSON.parse(fs.readFileSync(filePath, "utf-8")));
  } else {
    res.json({}); // Default empty, real default is in frontend
  }
});

app.get("/api/companies", (req, res) => {
  const filePath = path.join(process.cwd(), "data", "companies.json");
  if (fs.existsSync(filePath)) {
    res.json(JSON.parse(fs.readFileSync(filePath, "utf-8")));
  } else {
    res.json([]); 
  }
});

app.post("/api/inquiries", (req, res) => {
  // Just return success for public inquiries in this refactored version
  res.json({ success: true });
});

// --- Dashboard API ---
app.get("/api/dashboard", authenticateAdmin, async (req, res) => {
  const db = getDb();
  const totalCustomers = (await db.execute("SELECT COUNT(*) as count FROM Customers")).rows[0].count;
  const activePolicies = (await db.execute("SELECT COUNT(*) as count FROM Policies WHERE status = 'Active'")).rows[0].count;
  
  const now = new Date();
  const today = now.toISOString().split("T")[0];
  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  const expiringPolicies = (await db.execute({
    sql: "SELECT COUNT(*) as count FROM Policies WHERE policy_maturity_date BETWEEN ? AND ?",
    args: [today, nextWeek]
  })).rows[0].count;

  const duePremiums = (await db.execute({
    sql: "SELECT COUNT(*) as count FROM Policies WHERE premium_due_date BETWEEN ? AND ?",
    args: [today, nextWeek]
  })).rows[0].count;

  const recentActivities = (await db.execute("SELECT * FROM Activities ORDER BY timestamp DESC LIMIT 10")).rows;
  const recentCustomers = (await db.execute("SELECT * FROM Customers ORDER BY created_at DESC LIMIT 5")).rows;

  res.json({
    totalCustomers,
    activePolicies,
    expiringPolicies,
    duePremiums,
    recentActivities,
    recentCustomers
  });
});

// --- Customers API ---
app.get("/api/customers", authenticateAdmin, async (req, res) => {
  const db = getDb();
  let query = "SELECT * FROM Customers";
  const params: any[] = [];
  const conditions: string[] = [];

  if (req.query.phone) {
    conditions.push("mobile_number LIKE ?");
    params.push(`%${req.query.phone}%`);
  }
  
  if (req.query.name) {
    conditions.push("customer_name LIKE ?");
    params.push(`%${req.query.name}%`);
  }

  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }

  query += " ORDER BY created_at DESC";

  const customers = (await db.execute({ sql: query, args: params })).rows;
  res.json(customers);
});

app.get("/api/customers/:mobile", authenticateAdmin, async (req, res) => {
  const db = getDb();
  const rs = await db.execute({
    sql: "SELECT * FROM Customers WHERE mobile_number = ?",
    args: [req.params.mobile]
  });
  const customer = rs.rows[0];
  
  if (!customer) {
    return res.status(404).json({ error: "Customer not found" });
  }

  const policies = (await db.execute({
    sql: "SELECT * FROM Policies WHERE mobile_number = ?",
    args: [req.params.mobile]
  })).rows;
  const documents = (await db.execute({
    sql: "SELECT * FROM Documents WHERE mobile_number = ?",
    args: [req.params.mobile]
  })).rows;
  
  res.json({ ...customer, policies, documents });
});

app.post("/api/customers", authenticateAdmin, async (req, res) => {
  const c = req.body;
  if (!c.mobile_number || !c.customer_name) {
    return res.status(400).json({ error: "Mobile number and customer name are required." });
  }

  const db = getDb();
  
  try {
    await db.execute({
      sql: `INSERT INTO Customers (
        mobile_number, customer_name, father_husband_name, dob, gender, alternate_number,
        email, address, city, state, pin_code, occupation, aadhaar_number, pan_number,
        nominee_name, nominee_relation, notes, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        c.mobile_number, c.customer_name, c.father_husband_name, c.dob, c.gender, c.alternate_number,
        c.email, c.address, c.city, c.state, c.pin_code, c.occupation, c.aadhaar_number, c.pan_number,
        c.nominee_name, c.nominee_relation, c.notes, c.status || "Active"
      ]
    });

    await db.execute({
      sql: "INSERT INTO Activities (mobile_number, type, description) VALUES (?, ?, ?)",
      args: [c.mobile_number, "Customer Created", `Created profile for ${c.customer_name}`]
    });

    const rs = await db.execute({
      sql: "SELECT * FROM Customers WHERE mobile_number = ?",
      args: [c.mobile_number]
    });
    res.json(rs.rows[0]);
  } catch (err: any) {
    if (err.message.includes("UNIQUE constraint failed")) {
      return res.status(400).json({ error: "A customer with this mobile number already exists." });
    }
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/customers/:mobile", authenticateAdmin, async (req, res) => {
  const c = req.body;
  const db = getDb();
  
  try {
    await db.execute({
      sql: `UPDATE Customers SET
        customer_name = ?, father_husband_name = ?, dob = ?, gender = ?, alternate_number = ?,
        email = ?, address = ?, city = ?, state = ?, pin_code = ?, occupation = ?,
        aadhaar_number = ?, pan_number = ?, nominee_name = ?, nominee_relation = ?,
        notes = ?, status = ?, updated_at = CURRENT_TIMESTAMP
      WHERE mobile_number = ?`,
      args: [
        c.customer_name, c.father_husband_name, c.dob, c.gender, c.alternate_number,
        c.email, c.address, c.city, c.state, c.pin_code, c.occupation,
        c.aadhaar_number, c.pan_number, c.nominee_name, c.nominee_relation,
        c.notes, c.status, req.params.mobile
      ]
    });

    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/customers/:mobile", authenticateAdmin, async (req, res) => {
  const db = getDb();
  await db.execute({
    sql: "DELETE FROM Customers WHERE mobile_number = ?",
    args: [req.params.mobile]
  });
  res.json({ success: true });
});

// --- Policies API ---
app.post("/api/policies", authenticateAdmin, async (req, res) => {
  const p = req.body;
  if (!p.mobile_number || !p.policy_number) {
    return res.status(400).json({ error: "Mobile number and policy number are required." });
  }

  const db = getDb();
  const id = "pol_" + Math.random().toString(36).substr(2, 9);
  
  try {
    await db.execute({
      sql: `INSERT INTO Policies (
        id, mobile_number, policy_number, policy_type, insurance_company, plan_name,
        sum_assured, premium_amount, premium_frequency, policy_start_date,
        policy_maturity_date, premium_due_date, status, agent_remarks
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        id, p.mobile_number, p.policy_number, p.policy_type, p.insurance_company, p.plan_name,
        p.sum_assured, p.premium_amount, p.premium_frequency, p.policy_start_date,
        p.policy_maturity_date, p.premium_due_date, p.status || "Active", p.agent_remarks
      ]
    });
    
    await db.execute({
      sql: "INSERT INTO Activities (mobile_number, type, description) VALUES (?, ?, ?)",
      args: [p.mobile_number, "Policy Added", `Added policy ${p.policy_number}`]
    });

    const rs = await db.execute({
      sql: "SELECT * FROM Policies WHERE id = ?",
      args: [id]
    });
    res.json(rs.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/policies/:id", authenticateAdmin, async (req, res) => {
  const p = req.body;
  const db = getDb();
  
  try {
    await db.execute({
      sql: `UPDATE Policies SET
        policy_number = ?, policy_type = ?, insurance_company = ?, plan_name = ?,
        sum_assured = ?, premium_amount = ?, premium_frequency = ?, policy_start_date = ?,
        policy_maturity_date = ?, premium_due_date = ?, status = ?, agent_remarks = ?
      WHERE id = ?`,
      args: [
        p.policy_number, p.policy_type, p.insurance_company, p.plan_name,
        p.sum_assured, p.premium_amount, p.premium_frequency, p.policy_start_date,
        p.policy_maturity_date, p.premium_due_date, p.status, p.agent_remarks, req.params.id
      ]
    });

    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/policies/:id", authenticateAdmin, async (req, res) => {
  const db = getDb();
  await db.execute({
    sql: "DELETE FROM Policies WHERE id = ?",
    args: [req.params.id]
  });
  res.json({ success: true });
});

// --- Premium Payments API ---
app.post("/api/payments", authenticateAdmin, async (req, res) => {
  const p = req.body;
  const db = getDb();
  const id = "pay_" + Math.random().toString(36).substr(2, 9);
  
  await db.execute({
    sql: `INSERT INTO PremiumPayments (id, policy_id, amount, due_date, paid_date, status)
     VALUES (?, ?, ?, ?, ?, ?)`,
    args: [id, p.policy_id, p.amount, p.due_date, p.paid_date, p.status]
  });
  
  res.json({ success: true });
});

// --- Documents API ---
app.post("/api/documents", authenticateAdmin, async (req, res) => {
  const d = req.body;
  const db = getDb();
  const id = "doc_" + Math.random().toString(36).substr(2, 9);
  
  await db.execute({
    sql: `INSERT INTO Documents (id, mobile_number, file_name, file_type, file_url)
     VALUES (?, ?, ?, ?, ?)`,
    args: [id, d.mobile_number, d.file_name, d.file_type, d.file_url]
  });
  
  res.json({ success: true });
});


// ==========================================
// Vite Dev Server Integration
// ==========================================
async function startServer() {
  await initDb();
  
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    
    // In middlewareMode, we MUST serve index.html ourselves
    app.use("*", async (req, res) => {
      try {
        let template = fs.readFileSync(path.resolve(process.cwd(), "index.html"), "utf-8");
        template = await vite.transformIndexHtml(req.originalUrl, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        res.status(500).end(e.message);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

// Only start the server automatically if not running in a Serverless Function (Netlify/AWS)
if (!process.env.LAMBDA_TASK_ROOT) {
  startServer();
}
