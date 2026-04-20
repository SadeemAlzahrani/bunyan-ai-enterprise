import { Download, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import PageHeader from "@/components/app/PageHeader";
import { Button } from "@/components/ui/button";
import { workspaceReports } from "@/lib/workspace-data";
import { can, useCurrentRole } from "@/lib/permissions";
import { toast } from "sonner";

const ReportsPage = () => {
  const { t } = useTranslation();
  const role = useCurrentRole();
  const canApprove = can(role, "approveReport");
  const canExport = can(role, "exportReport");

  return (
    <div>
      <PageHeader
        eyebrow={t("common.workspace")}
        title={t("reports.title")}
        description={t("reports.subtitle")}
      />

      <div className="grid gap-4 md:grid-cols-2">
        {workspaceReports.map((r) => (
          <div key={r.id} className="bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-elevated transition-smooth">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display font-semibold">{r.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{r.project} · {r.date}</p>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${r.status === "approved" ? "bg-success/15 text-success" : "bg-warning/15 text-warning"}`}>
                {t(r.status === "approved" ? "reports.approved" : "reports.pendingApproval")}
              </span>
            </div>

            <div className="mt-5 flex items-end justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">{t("workspace.complianceScore")}</p>
                <p className="text-3xl font-display font-bold mt-1">{r.score}%</p>
              </div>
              <div className="flex gap-2">
                {canApprove && r.status === "pending" && (
                  <Button size="sm" className="rounded-full bg-gradient-accent text-accent-foreground border-0" onClick={() => toast.success(t("reports.approveReport"))}>
                    <Check className="h-4 w-4 me-1.5" /> {t("reports.approveReport")}
                  </Button>
                )}
                {canExport && (
                  <Button variant="outline" size="sm" className="rounded-full" onClick={() => toast.success(t("reports.exportPdf"))}>
                    <Download className="h-4 w-4 me-1.5" /> {t("reports.exportPdf")}
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsPage;
