import { Activity, AlertTriangle, FolderKanban, ShieldCheck, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import StatCard from "@/components/app/StatCard";
import PageHeader from "@/components/app/PageHeader";
import { getSession } from "@/lib/auth";
import { workspaceStats, workspaceActivity } from "@/lib/workspace-data";

const WorkspaceDashboard = () => {
  const { t } = useTranslation();
  const session = getSession();

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow={t("workspace.title")}
        title={session?.company ?? ""}
        description={t("workspace.subtitle")}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label={t("workspace.activeProjects")} value={String(workspaceStats.activeProjects)} delta="+3" icon={FolderKanban} />
        <StatCard label={t("workspace.openIssues")} value={String(workspaceStats.openIssues)} delta="-5" icon={AlertTriangle} trend="down" />
        <StatCard label={t("workspace.complianceScore")} value={`${workspaceStats.complianceScore}%`} delta="+2" icon={ShieldCheck} />
        <StatCard label={t("workspace.pendingApprovals")} value={String(workspaceStats.pendingApprovals)} delta="2 new" icon={Clock} trend="neutral" />
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
        <div className="p-6 border-b border-border flex items-center gap-2">
          <Activity className="h-4 w-4 text-accent" />
          <h2 className="font-display font-semibold text-lg">{t("workspace.recentActivity")}</h2>
        </div>
        <ul className="divide-y divide-border">
          {workspaceActivity.map((a) => (
            <li key={a.id} className="px-6 py-4 flex items-center justify-between hover:bg-secondary/30 transition-smooth">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-gradient-accent text-accent-foreground flex items-center justify-center text-xs font-display font-semibold">
                  {a.actor.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div className="text-sm">
                  <span className="font-medium">{a.actor}</span>{" "}
                  <span className="text-muted-foreground">{a.action}</span>{" "}
                  <span className="font-medium">{a.target}</span>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">{a.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WorkspaceDashboard;
