import { useEffect, useState } from "react";
import { Download, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import PageHeader from "@/components/app/PageHeader";
import { Button } from "@/components/ui/button";
import { can } from "@/lib/permissions";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Report {
  id: string;
  project_name: string;
  compliance_score: number;
  status: "approved" | "pending";
  created_at: string;
}

// Reports are derived per-project from compliance scores (no reports table in schema).
const ReportsPage = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const canApprove = can(user?.role, "approveReport");
  const canExport = can(user?.role, "exportReport");
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      let q = supabase.from("projects").select("id, project_name, compliance_score, created_at");
      if (user.role !== "super_admin" && user.companyId) q = q.eq("company_id", user.companyId);
      const { data } = await q;
      const rows = (data ?? []).map((p) => ({
        id: p.id,
        project_name: p.project_name,
        compliance_score: Number(p.compliance_score ?? 0),
        status: (Number(p.compliance_score ?? 0) >= 90 ? "approved" : "pending") as "approved" | "pending",
        created_at: p.created_at ?? "",
      }));
      setReports(rows);
    };
    void load();
  }, [user]);

  return (
    <div>
      <PageHeader
        eyebrow={t("common.workspace")}
        title={t("reports.title")}
        description={t("reports.subtitle")}
      />

      <div className="grid gap-4 md:grid-cols-2">
        {reports.map((r) => (
          <div key={r.id} className="bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-elevated transition-smooth">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display font-semibold">{r.project_name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {r.created_at ? new Date(r.created_at).toLocaleDateString() : "—"}
                </p>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${r.status === "approved" ? "bg-success/15 text-success" : "bg-warning/15 text-warning"}`}>
                {t(r.status === "approved" ? "reports.approved" : "reports.pendingApproval")}
              </span>
            </div>

            <div className="mt-5 flex items-end justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">{t("workspace.complianceScore")}</p>
                <p className="text-3xl font-display font-bold mt-1">{r.compliance_score}%</p>
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
        {reports.length === 0 && (
          <div className="col-span-full text-center py-12 text-sm text-muted-foreground">{t("reports.subtitle")}</div>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;
