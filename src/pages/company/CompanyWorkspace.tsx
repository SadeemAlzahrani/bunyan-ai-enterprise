import { Building, Users, FolderKanban, ShieldCheck, ArrowUpRight, Plus } from "lucide-react";
import StatCard from "@/components/app/StatCard";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/auth";

const team = [
  { name: "Layla Hassan", role: "Project Manager", email: "pm@northbuild.com", projects: 8 },
  { name: "Omar Said", role: "Project Engineer", email: "eng@northbuild.com", projects: 5 },
  { name: "Yara Mostafa", role: "Project Engineer", email: "yara@northbuild.com", projects: 4 },
  { name: "Tariq Nasser", role: "Project Manager", email: "tariq@northbuild.com", projects: 6 },
];

const CompanyWorkspace = () => {
  const session = getSession();
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-accent font-semibold">Company Workspace</p>
          <h1 className="mt-1 font-display font-bold text-3xl md:text-4xl tracking-tight">{session?.company}</h1>
          <p className="mt-1.5 text-muted-foreground">Manage your team, projects, and company settings.</p>
        </div>
        <Button className="rounded-full bg-gradient-accent text-accent-foreground border-0 shadow-card">
          <Plus className="h-4 w-4 mr-1.5" /> Invite teammate
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active projects" value="38" delta="+4 this quarter" icon={FolderKanban} />
        <StatCard label="Team members" value="124" delta="+12 this month" icon={Users} />
        <StatCard label="Sites" value="22" delta="3 regions" icon={Building} trend="neutral" />
        <StatCard label="Compliance" value="98%" delta="Above target" icon={ShieldCheck} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl shadow-card overflow-hidden">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <div>
              <h2 className="font-display font-semibold text-lg">Team</h2>
              <p className="text-sm text-muted-foreground">Roles and access within {session?.company}</p>
            </div>
            <Button variant="ghost" size="sm" className="rounded-full">Manage <ArrowUpRight className="ml-1 h-3.5 w-3.5" /></Button>
          </div>
          <div className="divide-y divide-border">
            {team.map((m) => (
              <div key={m.email} className="flex items-center justify-between px-6 py-4 hover:bg-secondary/30 transition-smooth">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-accent text-accent-foreground flex items-center justify-center font-display font-semibold text-sm">
                    {m.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-medium">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <span className="px-2.5 py-1 rounded-full bg-accent-soft text-accent text-xs font-medium">{m.role}</span>
                  <span className="text-muted-foreground hidden sm:inline">{m.projects} projects</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl shadow-card p-6">
          <h2 className="font-display font-semibold text-lg">Workspace</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Tenant configuration</p>
          <dl className="mt-5 space-y-4 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Plan</dt><dd className="font-medium">Enterprise</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Region</dt><dd className="font-medium">GCC (Riyadh)</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">SSO</dt><dd className="font-medium text-success">Enabled</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Data residency</dt><dd className="font-medium">In-region</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Tenant ID</dt><dd className="font-mono text-xs">tn_8f3a…2c1</dd></div>
          </dl>
          <Button variant="outline" className="mt-6 w-full rounded-full">Workspace settings</Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyWorkspace;
