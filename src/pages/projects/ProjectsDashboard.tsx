import { FolderKanban, AlertTriangle, CheckCircle2, Clock, Plus } from "lucide-react";
import StatCard from "@/components/app/StatCard";
import { Button } from "@/components/ui/button";

const projects = [
  { name: "Cedar Tower — Phase 2", code: "CDR-02", progress: 72, status: "On track", risks: 2, due: "Aug 14" },
  { name: "Riverside Residences", code: "RVR-01", progress: 38, status: "At risk", risks: 5, due: "Nov 02" },
  { name: "Marina Logistics Hub", code: "MLH-04", progress: 91, status: "On track", risks: 1, due: "Jun 30" },
  { name: "Downtown Office Complex", code: "DOC-07", progress: 54, status: "Delayed", risks: 8, due: "Sep 21" },
  { name: "Greenfield Industrial Park", code: "GIP-03", progress: 22, status: "On track", risks: 0, due: "Jan 18" },
];

const statusStyle = (s: string) =>
  s === "On track" ? "bg-success/10 text-success" :
  s === "At risk" ? "bg-warning/10 text-warning" :
  "bg-destructive/10 text-destructive";

const ProjectsDashboard = () => (
  <div className="space-y-8">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <p className="text-xs uppercase tracking-wider text-accent font-semibold">Project Operations</p>
        <h1 className="mt-1 font-display font-bold text-3xl md:text-4xl tracking-tight">Project Manager Dashboard</h1>
        <p className="mt-1.5 text-muted-foreground">Oversee active projects, risks, and engineer assignments.</p>
      </div>
      <Button className="rounded-full bg-gradient-accent text-accent-foreground border-0 shadow-card">
        <Plus className="h-4 w-4 mr-1.5" /> New project
      </Button>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard label="Active projects" value="14" delta="2 closing this month" icon={FolderKanban} />
      <StatCard label="Open risks" value="23" delta="−4 this week" icon={AlertTriangle} trend="up" />
      <StatCard label="On-time %" value="86%" delta="Above target" icon={CheckCircle2} />
      <StatCard label="Avg cycle time" value="4.2d" delta="−0.6d MoM" icon={Clock} />
    </div>

    <div className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
      <div className="p-6 border-b border-border">
        <h2 className="font-display font-semibold text-lg">Portfolio</h2>
        <p className="text-sm text-muted-foreground">All projects under your management</p>
      </div>
      <div className="divide-y divide-border">
        {projects.map((p) => (
          <div key={p.code} className="px-6 py-5 hover:bg-secondary/30 transition-smooth">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-muted-foreground">{p.code}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyle(p.status)}`}>{p.status}</span>
                </div>
                <p className="mt-1 font-display font-semibold">{p.name}</p>
              </div>
              <div className="flex-1 max-w-sm">
                <div className="flex items-center justify-between mb-1.5 text-xs">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{p.progress}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full bg-gradient-accent" style={{ width: `${p.progress}%` }} />
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Risks</p>
                  <p className="font-semibold">{p.risks}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Due</p>
                  <p className="font-semibold">{p.due}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ProjectsDashboard;
