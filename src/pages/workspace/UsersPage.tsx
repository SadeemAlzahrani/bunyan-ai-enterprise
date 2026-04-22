import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import PageHeader from "@/components/app/PageHeader";
import { Button } from "@/components/ui/button";
import { roleLabel, type Role } from "@/lib/auth";
import { can } from "@/lib/permissions";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface UserRow {
  id: string;
  full_name: string;
  email: string;
  role: string;
  is_active: boolean | null;
  created_at: string | null;
}

const statusStyle = (active: boolean | null) =>
  active ? "bg-success/15 text-success" : "bg-muted text-muted-foreground";

const UsersPage = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const canManage = can(user?.role, "manageUsers");
  const [users, setUsers] = useState<UserRow[]>([]);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      let q = supabase.from("users").select("id, full_name, email, role, is_active, created_at");
      if (user.role !== "super_admin" && user.companyId) q = q.eq("company_id", user.companyId);
      const { data } = await q;
      setUsers(data ?? []);
    };
    void load();
  }, [user]);

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
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-secondary/30 transition-smooth">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-gradient-accent text-accent-foreground flex items-center justify-center text-xs font-display font-semibold">
                        {u.full_name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-medium">{u.full_name}</p>
                        <p className="text-xs text-muted-foreground">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{roleLabel(u.role as Role)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle(u.is_active)}`}>
                      {u.is_active ? t("common.active") : t("common.inactive")}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {u.created_at ? new Date(u.created_at).toLocaleDateString() : "—"}
                  </td>
                  {canManage && (
                    <td className="px-6 py-4 text-end">
                      <Button variant="ghost" size="sm" className="rounded-full" onClick={() => toast.success(u.is_active ? t("users.deactivate") : t("users.activate"))}>
                        {u.is_active ? t("users.deactivate") : t("users.activate")}
                      </Button>
                    </td>
                  )}
                </tr>
              ))}
              {users.length === 0 && (
                <tr><td colSpan={canManage ? 5 : 4} className="px-6 py-12 text-center text-sm text-muted-foreground">{t("users.subtitle")}</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
