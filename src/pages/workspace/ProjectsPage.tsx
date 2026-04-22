import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import PageHeader from "@/components/app/PageHeader";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { can } from "@/lib/permissions";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Project {
  id: string;
  project_name: string;
  status: string | null;
  compliance_score: number | null;
  issueCount: number;
}

const ProjectsPage = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const canCreate = can(user?.role, "createProject");
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      let q = supabase.from("projects").select("id, project_name, status, compliance_score");
      if (user.role !== "super_admin" && user.companyId) q = q.eq("company_id", user.companyId);
      const { data } = await q;
      const rows = data ?? [];
      // fetch issue counts in one query per project (small N) — could be optimized server-side later
      const withCounts: Project[] = await Promise.all(rows.map(async (p) => {
        const { count } = await supabase.from("issues").select("*", { count: "exact", head: true })
          .eq("project_id", p.id).neq("issue_status", "resolved");
        return { ...p, issueCount: count ?? 0 };
      }));
      setProjects(withCounts);
    };
    void load();
  }, [user]);

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
        {projects.map((p) => {
          const progress = Number(p.compliance_score ?? 0);
          return (
            <div key={p.id} className="bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-elevated transition-smooth">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display font-semibold text-lg">{p.project_name}</h3>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${p.status === "active" ? "bg-success/15 text-success" : "bg-warning/15 text-warning"}`}>
                  {t(`common.${p.status === "active" ? "active" : "pending"}`)}
                </span>
              </div>

              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{t("projects.progress")}</span>
                  <span className="font-semibold">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-muted-foreground">{t("projects.issues")}</span>
                  <span className="font-semibold">{p.issueCount}</span>
                </div>
              </div>

              <Button variant="outline" size="sm" className="mt-5 w-full rounded-full">
                {t("projects.overview")}
              </Button>
            </div>
          );
        })}
        {projects.length === 0 && (
          <div className="col-span-full text-center py-12 text-sm text-muted-foreground">
            {t("projects.subtitle")}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
