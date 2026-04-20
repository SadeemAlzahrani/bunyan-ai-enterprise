import { useState } from "react";
import { useTranslation } from "react-i18next";
import PageHeader from "@/components/app/PageHeader";
import { Button } from "@/components/ui/button";
import { workspaceIssues } from "@/lib/workspace-data";
import { can, useCurrentRole } from "@/lib/permissions";
import { toast } from "sonner";

type Filter = "all" | "high" | "medium" | "low";

const priorityStyle = (p: string) =>
  p === "high" ? "bg-destructive/15 text-destructive" :
  p === "medium" ? "bg-warning/15 text-warning" :
  "bg-muted text-muted-foreground";

const statusStyle = (s: string) =>
  s === "resolved" ? "bg-success/15 text-success" :
  s === "pending" ? "bg-accent-soft text-accent" :
  "bg-muted text-muted-foreground";

const IssuesPage = () => {
  const { t } = useTranslation();
  const role = useCurrentRole();
  const canResolve = can(role, "resolveIssue");
  const canAssign = can(role, "assignIssue");
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = filter === "all" ? workspaceIssues : workspaceIssues.filter((i) => i.priority === filter);

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
          {filtered.map((i) => (
            <li key={i.id} className="px-6 py-4 flex flex-wrap items-center justify-between gap-3 hover:bg-secondary/30 transition-smooth">
              <div className="min-w-0 flex-1">
                <p className="font-medium truncate">{i.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{i.project} · {i.assignee}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${priorityStyle(i.priority)}`}>
                  {t(`common.${i.priority}`)}
                </span>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle(i.status)}`}>
                  {t(`common.${i.status}`)}
                </span>
                {canAssign && i.status !== "resolved" && (
                  <Button variant="ghost" size="sm" className="rounded-full" onClick={() => toast.success(t("issues.assignTo"))}>
                    {t("issues.assignTo")}
                  </Button>
                )}
                {canResolve && i.status !== "resolved" && (
                  <Button variant="outline" size="sm" className="rounded-full" onClick={() => toast.success(t("issues.markResolved"))}>
                    {t("issues.markResolved")}
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IssuesPage;
