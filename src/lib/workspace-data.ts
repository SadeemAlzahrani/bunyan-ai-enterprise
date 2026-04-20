import type { Role } from "./auth";

export interface WorkspaceUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: "active" | "inactive" | "pending";
  lastActive: string;
}

export interface WorkspaceProject {
  id: string;
  name: string;
  manager: string;
  progress: number;
  issues: number;
  status: "active" | "on_hold" | "completed";
}

export interface WorkspaceContract {
  id: string;
  name: string;
  project: string;
  uploadedAt: string;
  status: "analyzed" | "analyzing" | "queued";
  findings: number;
}

export interface WorkspaceIssue {
  id: string;
  title: string;
  project: string;
  priority: "high" | "medium" | "low";
  status: "open" | "pending" | "resolved";
  assignee: string;
}

export interface WorkspaceReport {
  id: string;
  title: string;
  project: string;
  date: string;
  status: "approved" | "pending";
  score: number;
}

export const workspaceStats = {
  activeProjects: 18,
  openIssues: 47,
  complianceScore: 94,
  pendingApprovals: 6,
  teamMembers: 32,
};

export const workspaceUsers: WorkspaceUser[] = [
  { id: "u1", name: "Khalid Rahman", email: "ceo@northbuild.com", role: "company_admin", status: "active", lastActive: "2 min ago" },
  { id: "u2", name: "Layla Hassan", email: "pm@northbuild.com", role: "project_manager", status: "active", lastActive: "5 min ago" },
  { id: "u3", name: "Tariq Nasser", email: "tariq@northbuild.com", role: "project_manager", status: "active", lastActive: "1 h ago" },
  { id: "u4", name: "Omar Said", email: "eng@northbuild.com", role: "project_engineer", status: "active", lastActive: "12 min ago" },
  { id: "u5", name: "Yara Mostafa", email: "yara@northbuild.com", role: "project_engineer", status: "active", lastActive: "3 h ago" },
  { id: "u6", name: "Hadi Saleh", email: "hadi@northbuild.com", role: "project_engineer", status: "pending", lastActive: "—" },
  { id: "u7", name: "Noura Adel", email: "noura@northbuild.com", role: "project_engineer", status: "inactive", lastActive: "12 d ago" },
];

export const workspaceProjects: WorkspaceProject[] = [
  { id: "p1", name: "Riyadh Tower 04", manager: "Layla Hassan", progress: 72, issues: 8, status: "active" },
  { id: "p2", name: "Jeddah Coastal Plaza", manager: "Tariq Nasser", progress: 45, issues: 14, status: "active" },
  { id: "p3", name: "Dammam Logistics Hub", manager: "Layla Hassan", progress: 88, issues: 3, status: "active" },
  { id: "p4", name: "Mecca Residential Block C", manager: "Tariq Nasser", progress: 30, issues: 19, status: "active" },
  { id: "p5", name: "Neom Pilot Site", manager: "Layla Hassan", progress: 12, issues: 3, status: "on_hold" },
];

export const workspaceContracts: WorkspaceContract[] = [
  { id: "c1", name: "Main Construction Agreement v3", project: "Riyadh Tower 04", uploadedAt: "Mar 12", status: "analyzed", findings: 7 },
  { id: "c2", name: "Subcontractor Scope — MEP", project: "Jeddah Coastal Plaza", uploadedAt: "Mar 14", status: "analyzed", findings: 12 },
  { id: "c3", name: "Variation Order #18", project: "Dammam Logistics Hub", uploadedAt: "Mar 18", status: "analyzing", findings: 0 },
  { id: "c4", name: "Penalty Clause Addendum", project: "Mecca Residential Block C", uploadedAt: "Mar 20", status: "queued", findings: 0 },
];

export const workspaceIssues: WorkspaceIssue[] = [
  { id: "i1", title: "Concrete strength below spec on level 12", project: "Riyadh Tower 04", priority: "high", status: "open", assignee: "Omar Said" },
  { id: "i2", title: "Missing waterproofing layer — basement", project: "Jeddah Coastal Plaza", priority: "high", status: "pending", assignee: "Yara Mostafa" },
  { id: "i3", title: "Late delivery penalty clause ambiguity", project: "Mecca Residential Block C", priority: "medium", status: "open", assignee: "Omar Said" },
  { id: "i4", title: "Fire safety drawings outdated", project: "Dammam Logistics Hub", priority: "medium", status: "open", assignee: "Yara Mostafa" },
  { id: "i5", title: "Minor finish defect — lobby tiles", project: "Riyadh Tower 04", priority: "low", status: "resolved", assignee: "Hadi Saleh" },
  { id: "i6", title: "Insurance certificate expired", project: "Jeddah Coastal Plaza", priority: "high", status: "pending", assignee: "Layla Hassan" },
];

export const workspaceReports: WorkspaceReport[] = [
  { id: "r1", title: "Monthly compliance — March", project: "Riyadh Tower 04", date: "Apr 02", status: "pending", score: 92 },
  { id: "r2", title: "Contract analysis report", project: "Jeddah Coastal Plaza", date: "Mar 28", status: "approved", score: 88 },
  { id: "r3", title: "Site inspection summary", project: "Dammam Logistics Hub", date: "Mar 25", status: "approved", score: 96 },
  { id: "r4", title: "Quarterly safety audit", project: "Mecca Residential Block C", date: "Apr 05", status: "pending", score: 81 },
];

export const workspaceActivity = [
  { id: "a1", actor: "Layla Hassan", action: "approved compliance report", target: "Riyadh Tower 04", time: "10 min ago" },
  { id: "a2", actor: "Omar Said", action: "submitted inspection feedback", target: "Jeddah Coastal Plaza", time: "1 h ago" },
  { id: "a3", actor: "Khalid Rahman", action: "invited new engineer", target: "Hadi Saleh", time: "3 h ago" },
  { id: "a4", actor: "AI Engine", action: "completed contract analysis", target: "Subcontractor Scope — MEP", time: "5 h ago" },
];
