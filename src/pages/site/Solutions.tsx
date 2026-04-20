import { Building2, HardHat, Briefcase, Compass, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const solutions = [
  {
    icon: Building2,
    title: "For Real-Estate Developers",
    desc: "Track every asset across the portfolio. Get AI-driven valuations, contractor performance scores, and compliance status in one dashboard.",
    points: ["Portfolio-wide oversight", "Vendor scorecards", "Capital deployment tracking"],
  },
  {
    icon: HardHat,
    title: "For Construction Companies",
    desc: "Automate snag lists, RFIs, and quality inspections. Catch contract deviations before they become claims.",
    points: ["AI snag detection", "Daily site reports", "Subcontractor compliance"],
  },
  {
    icon: Briefcase,
    title: "For Engineering Consultants",
    desc: "Deliver evaluation reports faster. Bunyan AI standardises your inspection workflow across every client engagement.",
    points: ["Standard evaluation templates", "Client-ready reports in minutes", "Multi-client workspace"],
  },
  {
    icon: Compass,
    title: "For Project Owners",
    desc: "Independent verification of contractor claims. AI cross-checks invoices against actual work-in-place.",
    points: ["Claim verification", "Schedule vs. progress", "Independent QA"],
  },
];

const Solutions = () => (
  <>
    <section className="bg-gradient-soft border-b border-border">
      <div className="container py-20 md:py-28">
        <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">Solutions</span>
        <h1 className="mt-3 font-display font-bold text-4xl md:text-6xl tracking-tight max-w-3xl">Built for every role in the project lifecycle</h1>
        <p className="mt-5 text-muted-foreground text-lg max-w-2xl leading-relaxed">
          Whether you own the asset, build it, design it, or audit it — Bunyan AI gives your team a single source of truth.
        </p>
      </div>
    </section>

    <section className="container py-20">
      <div className="grid gap-6 md:grid-cols-2">
        {solutions.map((s) => (
          <div key={s.title} className="group p-8 rounded-3xl border border-border bg-card hover:shadow-elevated hover:border-accent/40 transition-smooth">
            <div className="h-12 w-12 rounded-xl bg-accent-soft flex items-center justify-center mb-5">
              <s.icon className="h-5 w-5 text-accent" />
            </div>
            <h3 className="font-display font-bold text-2xl">{s.title}</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">{s.desc}</p>
            <ul className="mt-5 space-y-2">
              {s.points.map((p) => (
                <li key={p} className="text-sm flex items-center gap-2 text-foreground/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />{p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Button asChild size="lg" className="rounded-full bg-gradient-accent text-accent-foreground border-0 h-12 px-7 shadow-glow">
          <Link to="/request-demo">See it in action <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
        </Button>
      </div>
    </section>
  </>
);

export default Solutions;
