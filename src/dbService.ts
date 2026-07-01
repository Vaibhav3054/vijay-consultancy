import { CMSContent, InsuranceCompany, Inquiry } from "./types";

async function handleResponse(res: Response) {
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `Request failed with status ${res.status}`);
  }
  return res.json();
}

export async function seedInitialDataIfEmpty() {
  return Promise.resolve();
}

import { DEFAULT_CMS_CONTENT, DEFAULT_COMPANIES } from "./defaultData";

export async function getCMSContent(): Promise<CMSContent> {
  const res = await fetch("/api/cms");
  const data = await handleResponse(res);
  return Object.keys(data).length === 0 ? DEFAULT_CMS_CONTENT : data;
}

export async function getCompanies(): Promise<InsuranceCompany[]> {
  const res = await fetch("/api/companies");
  const data = await handleResponse(res);
  return data.length === 0 ? DEFAULT_COMPANIES : data;
}

export async function addInquiry(inq: Omit<Inquiry, "id" | "createdAt" | "status">): Promise<Inquiry> {
  const res = await fetch("/api/inquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(inq)
  });
  return handleResponse(res);
}
