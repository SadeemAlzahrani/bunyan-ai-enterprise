import { useMemo, useState } from "react";
import { Building2, Search, Eye, Edit, Pause, Play, Plus, Filter } from "lucide-react";
import PageHeader from "@/components/app/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { tenants as seedTenants, type Tenant, type TenantStatus } from "@/lib/admin-data";
import { toast } from "sonner";

const statusBadge = (s: TenantStatus) => {
  if (s === "active") return "bg-success/10 text-success";
  if (s === "suspended") return "bg-destructive/10 text-destructive";
  return "bg-warning/10 text-warning";
};

const planBadge = (p: string) => {
  if (p === "Enterprise") return "bg-primary text-primary-foreground";
  if (p === "Pro") return "bg-accent-soft text-accent";
  return "bg-secondary text-secondary-foreground";
};

const TenantsPage = () => {
  const [tenants, setTenants] = useState<Tenant[]>(seedTenants);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | TenantStatus>("all");

  const filtered = useMemo(() => {
    return tenants.filter((t) => {
      const matchesQuery = t.name.toLowerCase().includes(query.toLowerCase()) || t.id.includes(query);
      const matchesStatus = filter === "all" || t.status === filter;
      return matchesQuery && matchesStatus;
    });
  }, [tenants, query, filter]);

  const toggleStatus = (id: string, action: "suspend" | "activate") => {
    setTenants((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: action === "suspend" ? "suspended" : "active" } : t
      )
    );
    toast.success(`Tenant ${action === "suspend" ? "suspended" : "activated"}`);
  };

  return (
    <>
      <PageHeader
        eyebrow="Tenant Management"
        title="Companies"
        description="All client companies provisioned on the Bunyan platform."
        actions={
          <Button onClick={() => toast.info("Provisioning flow coming soon")} className="rounded-full bg-gradient-accent text-accent-foreground border-0 shadow-card">
            <Plus className="h-4 w-4 mr-1.5" /> Provision tenant
          </Button>
        }
      />

      {/* Filter bar */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by company name or tenant ID…"
            className="pl-10 h-11 rounded-xl"
          />
        </div>
        <div className="flex items-center gap-1 p-1 bg-secondary rounded-xl">
          {(["all", "active", "suspended", "onboarding"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium capitalize transition-smooth ${
                filter === f ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f === "all" ? "All" : f}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="text-left px-6 py-3 font-medium">Company</th>
                <th className="text-left px-6 py-3 font-medium">Plan</th>
                <th className="text-left px-6 py-3 font-medium">Status</th>
                <th className="text-right px-6 py-3 font-medium">Users</th>
                <th className="text-right px-6 py-3 font-medium">Projects</th>
                <th className="text-right px-6 py-3 font-medium">AI / mo</th>
                <th className="text-left px-6 py-3 font-medium">Last activity</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id} className="border-t border-border hover:bg-secondary/30 transition-smooth">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-accent-soft flex items-center justify-center shrink-0">
                        <Building2 className="h-4 w-4 text-accent" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium">{t.name}</p>
                        <p className="text-xs text-muted-foreground font-mono">{t.id} · {t.region}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${planBadge(t.plan)}`}>{t.plan}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusBadge(t.status)}`}>{t.status}</span>
                  </td>
                  <td className="px-6 py-4 text-right tabular-nums">{t.users}</td>
                  <td className="px-6 py-4 text-right tabular-nums">{t.projects}</td>
                  <td className="px-6 py-4 text-right tabular-nums">{t.monthlyAi.toLocaleString()}</td>
                  <td className="px-6 py-4 text-muted-foreground">{t.lastActivity}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg" onClick={() => toast.info(`Viewing ${t.name}`)}>
                        <Eye className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg" onClick={() => toast.info(`Editing ${t.name}`)}>
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                      {t.status === "active" ? (
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => toggleStatus(t.id, "suspend")}>
                          <Pause className="h-3.5 w-3.5" />
                        </Button>
                      ) : (
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-success hover:text-success hover:bg-success/10" onClick={() => toggleStatus(t.id, "activate")}>
                          <Play className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-16 text-center text-muted-foreground text-sm">
                    <Filter className="h-5 w-5 mx-auto mb-2 opacity-40" />
                    No tenants match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 border-t border-border text-xs text-muted-foreground flex justify-between">
          <span>Showing {filtered.length} of {tenants.length} tenants</span>
          <span>Each tenant runs in an isolated workspace</span>
        </div>
      </div>
    </>
  );
};

export default TenantsPage;
