import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import PageHeader from "@/components/app/PageHeader";
import { Button } from "@/components/ui/button";
import { can } from "@/lib/permissions";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Filter = "all" | "high" | "medium" | "low";

interface Issue {
  id: string;
  issue_title: string;
  priority: string | null;
  issue_status: string | null;
  project_id: string;
  assigned_to: string | null;
  projectName?: string;
  assigneeName?: string;
}

const priorityKey = (p: string | null) => {
  if (p === "critical" || p === "high") return "high";
  if (p === "minor" || p === "low") return "low";
  return "medium";
};

const priorityStyle = (p: string) =>
  p === "high" ? "bg-destructive/15 text-destructive" :
  p === "medium" ? "bg-warning/15 text-warning" :
  "bg-muted text-muted-foreground";

const statusKey = (s: string | null) => {
  if (s === "resolved" || s === "closed") return "resolved";
  if (s === "in_progress" || s === "pending") return "pending";
  return "open";
};

const statusStyle = (s: string) =>
  s === "resolved" ? "bg-success/15 text-success" :
  s === "pending" ? "bg-accent-soft text-accent" :
  "bg-muted text-muted-foreground";

const IssuesPage = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const canResolve = can(user?.role, "resolveIssue");
  const canAssign = can(user?.role, "assignIssue");
  const [filter, setFilter] = useState<Filter>("all");
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      // Get scoped project ids
      let projQ = supabase.from("projects").select("id, project_name");
      if (user.role !== "super_admin" && user.companyId) projQ = projQ.eq("company_id", user.companyId);
      const { data: projects } = await projQ;
      const projectIds = (projects ?? []).map((p) => p.id);
      const projectMap = new Map((projects ?? []).map((p) => [p.id, p.project_name]));
      if (!projectIds.length) { setIssues([]); return; }

      let q = supabase.from("issues")
        .select("id, issue_title, priority, issue_status, project_id, assigned_to")
        .in("project_id", projectIds);

      // Engineers only see issues assigned to them
      if (user.role === "project_engineer") q = q.eq("assigned_to", user.id);

      const { data } = await q;
      const rows = data ?? [];
      const assigneeIds = Array.from(new Set(rows.map((i) => i.assigned_to).filter(Boolean) as string[]));
      let assigneeMap = new Map<string, string>();
      if (assigneeIds.length) {
        const { data: us } = await supabase.from("users").select("id, full_name").in("id", assigneeIds);
        assigneeMap = new Map((us ?? []).map((u) => [u.id, u.full_name]));
      }

      setIssues(rows.map((i) => ({
        ...i,
        projectName: projectMap.get(i.project_id) ?? "—",
        assigneeName: i.assigned_to ? (assigneeMap.get(i.assigned_to) ?? "—") : "—",
      })));
    };
    void load();
  }, [user]);

  const filtered = useMemo(() => {
    if (filter === "all") return issues;
    return issues.filter((i) => priorityKey(i.priority) === filter);
  }, [issues, filter]);

  return (
    <div>
      <PageHeader
        eyebrow={t("common.workspace")}
        title={t("issues.title")}
        description={t("issues.subtitle")}
      />

      <div className="flex flex-wrap items-center gap-2 mb-5">
        <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium me-2">{t("issues.filterByPriority")}:</span>
        {(["all", "high", "medium", "low"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-smooth ${
              filter === f ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {t(f === "all" ? "issues.all" : `common.${f}`)}
          </button>
        ))}
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
        <ul className="divide-y divide-border">
          {filtered.map((i) => {
            const pk = priorityKey(i.priority);
            const sk = statusKey(i.issue_status);
            return (
              <li key={i.id} className="px-6 py-4 flex flex-wrap items-center justify-between gap-3 hover:bg-secondary/30 transition-smooth">
                <div className="min-w-0 flex-1">
                  <p className="font-medium truncate">{i.issue_title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{i.projectName} · {i.assigneeName}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${priorityStyle(pk)}`}>{t(`common.${pk}`)}</span>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle(sk)}`}>{t(`common.${sk}`)}</span>
                  {canAssign && sk !== "resolved" && (
                    <Button variant="ghost" size="sm" className="rounded-full" onClick={() => toast.success(t("issues.assignTo"))}>
                      {t("issues.assignTo")}
                    </Button>
                  )}
                  {canResolve && sk !== "resolved" && (
                    <Button variant="outline" size="sm" className="rounded-full" onClick={() => toast.success(t("issues.markResolved"))}>
                      {t("issues.markResolved")}
                    </Button>
                  )}
                </div>
              </li>
            );
          })}
          {filtered.length === 0 && (
            <li className="px-6 py-12 text-center text-sm text-muted-foreground">{t("issues.subtitle")}</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default IssuesPage;
