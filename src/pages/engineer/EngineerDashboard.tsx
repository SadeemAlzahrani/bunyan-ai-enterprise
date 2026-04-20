import { ClipboardList, FileSearch, AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";
import StatCard from "@/components/app/StatCard";
import { Button } from "@/components/ui/button";

const tasks = [
  { id: "EVL-2041", title: "Structural evaluation — Cedar Tower L12", project: "CDR-02", priority: "High", due: "Today" },
  { id: "EVL-2038", title: "Drywall finish QA — Riverside Block A", project: "RVR-01", priority: "Med", due: "Tomorrow" },
  { id: "EVL-2031", title: "MEP shaft compliance check", project: "MLH-04", priority: "Med", due: "Apr 22" },
  { id: "EVL-2027", title: "Facade glazing inspection report", project: "DOC-07", priority: "Low", due: "Apr 24" },
];

const recent = [
  { project: "Cedar Tower L11", finding: "3 minor finishing defects detected", status: "Submitted", time: "2h ago" },
  { project: "Riverside Block B", finding: "Contract clause 4.2.1 satisfied", status: "Approved", time: "Yesterday" },
  { project: "Marina Hub Bay 4", finding: "Safety rail height non-compliant", status: "Flagged", time: "2 days ago" },
];

const priorityStyle = (p: string) =>
  p === "High" ? "bg-destructive/10 text-destructive" :
  p === "Med" ? "bg-warning/10 text-warning" :
  "bg-secondary text-muted-foreground";

const EngineerDashboard = () => (
  <div className="space-y-8">
    <div>
      <p className="text-xs uppercase tracking-wider text-accent font-semibold">Engineer Workspace</p>
      <h1 className="mt-1 font-display font-bold text-3xl md:text-4xl tracking-tight">Today's evaluations</h1>
      <p className="mt-1.5 text-muted-foreground">Your assigned inspections, evaluations, and compliance checks.</p>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard label="Open tasks" value="12" delta="4 high priority" icon={ClipboardList} trend="neutral" />
      <StatCard label="Completed (week)" value="28" delta="+6 vs last week" icon={CheckCircle2} />
      <StatCard label="Evaluations run" value="142" delta="This month" icon={FileSearch} trend="neutral" />
      <StatCard label="Findings flagged" value="9" delta="Needs review" icon={AlertCircle} trend="down" />
    </div>

    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 bg-card border border-border rounded-2xl shadow-card overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="font-display font-semibold text-lg">My queue</h2>
            <p className="text-sm text-muted-foreground">Assigned to you</p>
          </div>
          <Button variant="ghost" size="sm" className="rounded-full">All tasks <ArrowRight className="ml-1 h-3.5 w-3.5" /></Button>
        </div>
        <div className="divide-y divide-border">
          {tasks.map((t) => (
            <div key={t.id} className="px-6 py-4 hover:bg-secondary/30 transition-smooth flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs text-muted-foreground">{t.id}</span>
                  <span className="text-xs text-muted-foreground">·</span>
                  <span className="text-xs text-muted-foreground">{t.project}</span>
                </div>
                <p className="mt-1 font-medium">{t.title}</p>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${priorityStyle(t.priority)}`}>{t.priority}</span>
              <div className="text-right text-sm">
                <p className="text-xs text-muted-foreground">Due</p>
                <p className="font-medium">{t.due}</p>
              </div>
              <Button size="sm" className="rounded-full bg-primary text-primary-foreground hidden sm:inline-flex">Open</Button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-card p-6">
        <h2 className="font-display font-semibold text-lg">Recent findings</h2>
        <p className="text-sm text-muted-foreground mt-0.5">Last 7 days</p>
        <div className="mt-5 space-y-4">
          {recent.map((r, i) => (
            <div key={i} className="pb-4 border-b border-border last:border-0 last:pb-0">
              <p className="font-medium text-sm">{r.project}</p>
              <p className="text-sm text-muted-foreground mt-0.5">{r.finding}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  r.status === "Approved" ? "bg-success/10 text-success" :
                  r.status === "Flagged" ? "bg-destructive/10 text-destructive" :
                  "bg-accent-soft text-accent"
                }`}>{r.status}</span>
                <span className="text-xs text-muted-foreground">{r.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default EngineerDashboard;
