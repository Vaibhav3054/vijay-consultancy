import { useState, useEffect } from "react";

const AUTH_EVENT = "vijay_consultancy_auth_changed";

function dispatchAuthChange() {
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export interface AdminUser {
  email: string;
  displayName: string;
  uid: string;
}

export function useAuth() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          if (isMounted) setUser(data);
        } else {
          if (isMounted) setUser(null);
        }
      } catch (err) {
        if (isMounted) setUser(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    checkAuth();

    const handleCustomAuthChange = () => {
      checkAuth();
    };

    window.addEventListener(AUTH_EVENT, handleCustomAuthChange);

    return () => {
      isMounted = false;
      window.removeEventListener(AUTH_EVENT, handleCustomAuthChange);
    };
  }, []);

  return { user, loading };
}

export async function loginAdmin(email: string, password: string): Promise<AdminUser> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) {
    let rawText = "";
    try {
      rawText = await res.text();
      const errorData = JSON.parse(rawText);
      throw new Error(errorData.error || "Invalid credentials.");
    } catch (e: any) {
      if (e.message !== "Invalid credentials.") {
        throw new Error(`Server returned ${res.status}: ${rawText.substring(0, 100)}... Check Netlify Function logs.`);
      }
      throw e;
    }
  }

  const adminUser: AdminUser = await res.json();
  dispatchAuthChange();
  return adminUser;
}

export async function logoutAdmin(): Promise<void> {
  await fetch("/api/auth/logout", { method: "POST" });
  dispatchAuthChange();
}

export async function changeAdminPassword(password: string): Promise<void> {
  const res = await fetch("/api/auth/change-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to change admin password.");
  }
}

export async function updateAdminProfile(displayName: string): Promise<void> {
  const res = await fetch("/api/auth/update-profile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ displayName })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to update profile.");
  }

  dispatchAuthChange();
}
