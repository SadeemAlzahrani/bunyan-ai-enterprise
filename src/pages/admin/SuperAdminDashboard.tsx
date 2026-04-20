import { Building2, Users, FolderKanban, Sparkles, ShieldAlert, CheckCircle2, Activity } from "lucide-react";
import StatCard from "@/components/app/StatCard";
import PageHeader from "@/components/app/PageHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { auditEvents, monthlyAiUsage, platformStats, tenants } from "@/lib/admin-data";

const fmt = (n: number) => n.toLocaleString();

const SuperAdminDashboard = () => {
  const max = Math.max(...monthlyAiUsage.map((m) => m.value));
  const recentTenants = [...tenants].slice(0, 4);
  const recentEvents = auditEvents.slice(0, 5);

  return (
    <>
      <PageHeader
        eyebrow="Platform Overview"
        title="Platform Dashboard"
        description="System-wide statistics across all tenant companies."
        actions={
          <Button asChild className="rounded-full bg-gradient-accent text-accent-foreground border-0 shadow-card">
            <Link to="/admin/tenants">+ Provision tenant</Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard label="Total companies" value={fmt(platformStats.totalCompanies)} delta="+1 this month" icon={Building2} />
        <StatCard label="Active subscriptions" value={fmt(platformStats.activeSubscriptions)} delta="98% retention" icon={CheckCircle2} />
        <StatCard label="Suspended" value={fmt(platformStats.suspendedTenants)} delta="Needs review" icon={ShieldAlert} trend="down" />
        <StatCard label="Total users" value={fmt(platformStats.totalUsers)} delta="+128 this week" icon={Users} />
        <StatCard label="Total projects" value={fmt(platformStats.totalProjects)} delta="Across platform" icon={FolderKanban} trend="neutral" />
        <StatCard label="AI analyses (mo)" value={fmt(platformStats.monthlyAi)} delta="+12% MoM" icon={Sparkles} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* AI usage chart */}
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl shadow-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display font-semibold text-lg">Monthly AI usage</h2>
              <p className="text-sm text-muted-foreground">Last 12 months, in thousands of analyses</p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-success/10 text-success font-medium">+12% MoM</span>
          </div>
          <div className="h-56 flex items-end gap-2">
            {monthlyAiUsage.map((m) => (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-gradient-to-t from-accent to-accent/40 rounded-md transition-smooth hover:opacity-80"
                  style={{ height: `${(m.value / max) * 100}%`, minHeight: "4px" }}
                  title={`${m.value}k`}
                />
                <span className="text-[10px] text-muted-foreground font-medium">{m.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="bg-card border border-border rounded-2xl shadow-card p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-display font-semibold text-lg">Recent activity</h2>
              <p className="text-sm text-muted-foreground">Platform-wide</p>
            </div>
            <Button asChild variant="ghost" size="sm" className="rounded-full text-xs">
              <Link to="/admin/audit">View all</Link>
            </Button>
          </div>
          <div className="space-y-4">
            {recentEvents.map((e) => (
              <div key={e.id} className="flex gap-3">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
                  e.severity === "critical" ? "bg-destructive/10 text-destructive" :
                  e.severity === "warning" ? "bg-warning/10 text-warning" :
                  "bg-accent-soft text-accent"
                }`}>
                  <Activity className="h-3.5 w-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{e.message}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{e.actor} · {e.ts}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top tenants */}
      <div className="mt-8 bg-card border border-border rounded-2xl shadow-card overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="font-display font-semibold text-lg">Top tenants by usage</h2>
            <p className="text-sm text-muted-foreground">This month</p>
          </div>
          <Button asChild variant="ghost" size="sm" className="rounded-full">
            <Link to="/admin/tenants">All tenants</Link>
          </Button>
        </div>
        <div className="divide-y divide-border">
          {recentTenants.map((t) => (
            <div key={t.id} className="px-6 py-4 flex items-center gap-4 hover:bg-secondary/30 transition-smooth">
              <div className="h-10 w-10 rounded-xl bg-accent-soft flex items-center justify-center shrink-0">
                <Building2 className="h-4 w-4 text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.plan} · {t.users} users · {t.projects} projects</p>
              </div>
              <div className="text-right">
                <p className="font-display font-semibold">{fmt(t.monthlyAi)}</p>
                <p className="text-xs text-muted-foreground">analyses</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SuperAdminDashboard;
