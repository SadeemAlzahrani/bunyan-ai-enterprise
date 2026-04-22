import { useEffect, useState } from "react";
import { Upload, FileText } from "lucide-react";
import { useTranslation } from "react-i18next";
import PageHeader from "@/components/app/PageHeader";
import { Button } from "@/components/ui/button";
import { can } from "@/lib/permissions";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Contract {
  id: string;
  contract_name: string;
  contract_status: string | null;
  upload_date: string | null;
  project_id: string;
  projectName?: string;
}

const ContractsPage = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const canUpload = can(user?.role, "uploadContract");
  const [contracts, setContracts] = useState<Contract[]>([]);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      let projQ = supabase.from("projects").select("id, project_name");
      if (user.role !== "super_admin" && user.companyId) projQ = projQ.eq("company_id", user.companyId);
      const { data: projects } = await projQ;
      const projectIds = (projects ?? []).map((p) => p.id);
      const projectMap = new Map((projects ?? []).map((p) => [p.id, p.project_name]));
      if (!projectIds.length) { setContracts([]); return; }

      const { data } = await supabase.from("contracts")
        .select("id, contract_name, contract_status, upload_date, project_id")
        .in("project_id", projectIds);

      setContracts((data ?? []).map((c) => ({ ...c, projectName: projectMap.get(c.project_id) ?? "—" })));
    };
    void load();
  }, [user]);

  const statusKey = (s: string | null) =>
    s === "analyzed" ? "contracts.analyzed" :
    s === "analyzing" ? "contracts.analyzing" : "contracts.queued";

  const statusStyle = (s: string | null) =>
    s === "analyzed" ? "bg-success/15 text-success" :
    s === "analyzing" ? "bg-accent-soft text-accent" :
    "bg-muted text-muted-foreground";

  return (
    <div>
      <PageHeader
        eyebrow={t("common.workspace")}
        title={t("contracts.title")}
        description={t("contracts.subtitle")}
        actions={canUpload && (
          <Button onClick={() => toast.success(t("contracts.uploadContract"))} className="rounded-full bg-gradient-accent text-accent-foreground border-0 shadow-card">
            <Upload className="h-4 w-4 me-1.5" /> {t("contracts.uploadContract")}
          </Button>
        )}
      />

      <div className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
        <ul className="divide-y divide-border">
          {contracts.map((c) => (
            <li key={c.id} className="px-6 py-4 flex items-center justify-between gap-4 hover:bg-secondary/30 transition-smooth">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-10 w-10 rounded-xl bg-accent-soft text-accent flex items-center justify-center shrink-0">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium truncate">{c.contract_name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {c.projectName} · {c.upload_date ? new Date(c.upload_date).toLocaleDateString() : "—"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle(c.contract_status)}`}>
                  {t(statusKey(c.contract_status))}
                </span>
                <Button variant="ghost" size="sm" className="rounded-full">{t("common.view")}</Button>
              </div>
            </li>
          ))}
          {contracts.length === 0 && (
            <li className="px-6 py-12 text-center text-sm text-muted-foreground">{t("contracts.subtitle")}</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ContractsPage;
