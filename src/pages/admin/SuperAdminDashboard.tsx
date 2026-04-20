import { Building2, Users, Activity, ShieldCheck, MoreHorizontal, ArrowUpRight } from "lucide-react";
import StatCard from "@/components/app/StatCard";
import { Button } from "@/components/ui/button";

const tenants = [
  { name: "NorthBuild Construction", region: "GCC", users: 124, projects: 38, status: "Active", health: 98 },
  { name: "Sahara Developments", region: "MENA", users: 87, projects: 22, status: "Active", health: 96 },
  { name: "Atlas Engineering", region: "EU", users: 56, projects: 14, status: "Active", health: 92 },
  { name: "Meridian Group", region: "NA", users: 210, projects: 71, status: "Active", health: 99 },
  { name: "Cedar & Stone", region: "EU", users: 34, projects: 9, status: "Onboarding", health: 78 },
];

const SuperAdminDashboard = () => (
  <div className="space-y-8">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <p className="text-xs uppercase tracking-wider text-accent font-semibold">Platform Overview</p>
        <h1 className="mt-1 font-display font-bold text-3xl md:text-4xl tracking-tight">Super Admin Portal</h1>
        <p className="mt-1.5 text-muted-foreground">Cross-tenant visibility, system health, and platform operations.</p>
      </div>
      <Button className="rounded-full bg-gradient-accent text-accent-foreground border-0 shadow-card">+ Provision new tenant</Button>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard label="Active tenants" value="42" delta="+3 this month" icon={Building2} />
      <StatCard label="Total users" value="3,184" delta="+128 this week" icon={Users} />
      <StatCard label="Platform uptime" value="99.98%" delta="Last 30 days" icon={Activity} trend="neutral" />
      <StatCard label="Compliance score" value="A+" delta="SOC 2 · ISO 27001" icon={ShieldCheck} trend="neutral" />
    </div>

    <div className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
      <div className="p-6 flex items-center justify-between border-b border-border">
        <div>
          <h2 className="font-display font-semibold text-lg">Tenant workspaces</h2>
          <p className="text-sm text-muted-foreground">Isolated company environments</p>
        </div>
        <Button variant="ghost" size="sm" className="rounded-full">View all <ArrowUpRight className="ml-1 h-3.5 w-3.5" /></Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-secondary/50 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="text-left px-6 py-3 font-medium">Company</th>
              <th className="text-left px-6 py-3 font-medium">Region</th>
              <th className="text-left px-6 py-3 font-medium">Users</th>
              <th className="text-left px-6 py-3 font-medium">Projects</th>
              <th className="text-left px-6 py-3 font-medium">Status</th>
              <th className="text-left px-6 py-3 font-medium">Health</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {tenants.map((t) => (
              <tr key={t.name} className="border-t border-border hover:bg-secondary/30 transition-smooth">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-accent-soft flex items-center justify-center">
                      <Building2 className="h-4 w-4 text-accent" />
                    </div>
                    <span className="font-medium">{t.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-muted-foreground">{t.region}</td>
                <td className="px-6 py-4">{t.users}</td>
                <td className="px-6 py-4">{t.projects}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${t.status === "Active" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>
                    {t.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 rounded-full bg-secondary overflow-hidden">
                      <div className="h-full bg-gradient-accent" style={{ width: `${t.health}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground w-8">{t.health}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <Button variant="ghost" size="icon" className="rounded-full h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default SuperAdminDashboard;
