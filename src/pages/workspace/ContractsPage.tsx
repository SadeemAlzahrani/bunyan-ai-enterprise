import { Upload, FileText } from "lucide-react";
import { useTranslation } from "react-i18next";
import PageHeader from "@/components/app/PageHeader";
import { Button } from "@/components/ui/button";
import { workspaceContracts } from "@/lib/workspace-data";
import { can, useCurrentRole } from "@/lib/permissions";
import { toast } from "sonner";

const ContractsPage = () => {
  const { t } = useTranslation();
  const role = useCurrentRole();
  const canUpload = can(role, "uploadContract");

  const statusKey = (s: string) =>
    s === "analyzed" ? "contracts.analyzed" :
    s === "analyzing" ? "contracts.analyzing" : "contracts.queued";

  const statusStyle = (s: string) =>
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
          {workspaceContracts.map((c) => (
            <li key={c.id} className="px-6 py-4 flex items-center justify-between gap-4 hover:bg-secondary/30 transition-smooth">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-10 w-10 rounded-xl bg-accent-soft text-accent flex items-center justify-center shrink-0">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium truncate">{c.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{c.project} · {c.uploadedAt}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <span className="hidden sm:inline text-xs text-muted-foreground">{c.findings} findings</span>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle(c.status)}`}>
                  {t(statusKey(c.status))}
                </span>
                <Button variant="ghost" size="sm" className="rounded-full">{t("common.view")}</Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContractsPage;
