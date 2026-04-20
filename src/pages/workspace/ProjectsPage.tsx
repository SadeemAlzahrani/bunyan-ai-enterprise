import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import PageHeader from "@/components/app/PageHeader";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { workspaceProjects } from "@/lib/workspace-data";
import { can, useCurrentRole } from "@/lib/permissions";
import { toast } from "sonner";

const ProjectsPage = () => {
  const { t } = useTranslation();
  const role = useCurrentRole();
  const canCreate = can(role, "createProject");

  return (
    <div>
      <PageHeader
        eyebrow={t("common.workspace")}
        title={t("projects.title")}
        description={t("projects.subtitle")}
        actions={canCreate && (
          <Button onClick={() => toast.success(t("projects.createProject"))} className="rounded-full bg-gradient-accent text-accent-foreground border-0 shadow-card">
            <Plus className="h-4 w-4 me-1.5" /> {t("projects.createProject")}
          </Button>
        )}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {workspaceProjects.map((p) => (
          <div key={p.id} className="bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-elevated transition-smooth">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display font-semibold text-lg">{p.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{t("projects.manager")}: {p.manager}</p>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${p.status === "active" ? "bg-success/15 text-success" : "bg-warning/15 text-warning"}`}>
                {t(`common.${p.status === "active" ? "active" : "pending"}`)}
              </span>
            </div>

            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{t("projects.progress")}</span>
                <span className="font-semibold">{p.progress}%</span>
              </div>
              <Progress value={p.progress} className="h-2" />
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-muted-foreground">{t("projects.issues")}</span>
                <span className="font-semibold">{p.issues}</span>
              </div>
            </div>

            <Button variant="outline" size="sm" className="mt-5 w-full rounded-full">
              {t("projects.overview")}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
