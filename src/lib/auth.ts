// Mock auth store. In production this comes from Lovable Cloud (Supabase).
// Roles are NEVER user-selectable — they're read from the stored account record.

export type Role = "super_admin" | "company_admin" | "project_manager" | "project_engineer";

export interface Account {
  email: string;
  password: string; // demo only
  name: string;
  role: Role;
  company: string;
}

export const DEMO_ACCOUNTS: Account[] = [
  { email: "admin@bunyan.ai", password: "demo", name: "Sara Al-Mansouri", role: "super_admin", company: "Bunyan AI" },
  { email: "ceo@northbuild.com", password: "demo", name: "Khalid Rahman", role: "company_admin", company: "NorthBuild Construction" },
  { email: "pm@northbuild.com", password: "demo", name: "Layla Hassan", role: "project_manager", company: "NorthBuild Construction" },
  { email: "eng@northbuild.com", password: "demo", name: "Omar Said", role: "project_engineer", company: "NorthBuild Construction" },
];

const KEY = "bunyan_session";

export interface Session {
  email: string;
  name: string;
  role: Role;
  company: string;
}

export const login = (email: string, password: string): Session | null => {
  const acc = DEMO_ACCOUNTS.find((a) => a.email.toLowerCase() === email.toLowerCase() && a.password === password);
  if (!acc) return null;
  const session: Session = { email: acc.email, name: acc.name, role: acc.role, company: acc.company };
  localStorage.setItem(KEY, JSON.stringify(session));
  return session;
};

export const getSession = (): Session | null => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
};

export const logout = () => localStorage.removeItem(KEY);

export const roleHome = (role: Role): string => {
  switch (role) {
    case "super_admin": return "/admin";
    case "company_admin": return "/workspace";
    case "project_manager": return "/workspace/projects";
    case "project_engineer": return "/workspace/issues";
  }
};

export const roleLabel = (role: Role): string => ({
  super_admin: "Super Admin",
  company_admin: "Company Admin",
  project_manager: "Project Manager",
  project_engineer: "Project Engineer",
}[role]);
