import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import PageHeader from "@/components/app/PageHeader";
import { Button } from "@/components/ui/button";
import { workspaceUsers } from "@/lib/workspace-data";
import { roleLabel } from "@/lib/auth";
import { can, useCurrentRole } from "@/lib/permissions";
import { toast } from "sonner";

const statusStyle = (s: string) =>
  s === "active" ? "bg-success/15 text-success" :
  s === "pending" ? "bg-warning/15 text-warning" :
  "bg-muted text-muted-foreground";

const UsersPage = () => {
  const { t } = useTranslation();
  const role = useCurrentRole();
  const canManage = can(role, "manageUsers");

  return (
    <div>
      <PageHeader
        eyebrow={t("common.workspace")}
        title={t("users.title")}
        description={t("users.subtitle")}
        actions={canManage && (
          <Button onClick={() => toast.success(t("users.inviteUser"))} className="rounded-full bg-gradient-accent text-accent-foreground border-0 shadow-card">
            <Plus className="h-4 w-4 me-1.5" /> {t("users.inviteUser")}
          </Button>
        )}
      />

      <div className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="text-start px-6 py-3 font-medium">{t("common.name")}</th>
                <th className="text-start px-6 py-3 font-medium">{t("common.role")}</th>
                <th className="text-start px-6 py-3 font-medium">{t("common.status")}</th>
                <th className="text-start px-6 py-3 font-medium">{t("users.lastActive")}</th>
                {canManage && <th className="text-end px-6 py-3 font-medium">{t("common.actions")}</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {workspaceUsers.map((u) => (
                <tr key={u.id} className="hover:bg-secondary/30 transition-smooth">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-gradient-accent text-accent-foreground flex items-center justify-center text-xs font-display font-semibold">
                        {u.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-medium">{u.name}</p>
                        <p className="text-xs text-muted-foreground">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{roleLabel(u.role)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle(u.status)}`}>
                      {t(`common.${u.status}`)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{u.lastActive}</td>
                  {canManage && (
                    <td className="px-6 py-4 text-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-full"
                        onClick={() => toast.success(u.status === "active" ? t("users.deactivate") : t("users.activate"))}
                      >
                        {u.status === "active" ? t("users.deactivate") : t("users.activate")}
                      </Button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
