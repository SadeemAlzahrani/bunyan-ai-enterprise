import { Link } from "react-router-dom";
import { ArrowRight, Building2, ShieldCheck, FileSearch, BarChart3, Cpu, Lock, Globe2, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  { icon: FileSearch, title: "AI Building Evaluation", desc: "Computer vision and ML models assess structural, MEP, and finishing quality from drawings, BIM and site photos." },
  { icon: ShieldCheck, title: "Contract Compliance", desc: "Automated clause-by-clause verification of deliverables against the master contract — with full audit trail." },
  { icon: BarChart3, title: "Portfolio Intelligence", desc: "Real-time KPIs across every project, every site — cost variance, schedule risk, and quality scores in one view." },
  { icon: Cpu, title: "Workflow Automation", desc: "Site reports, RFIs, snag lists and approvals routed automatically to the right engineer or PM." },
  { icon: Lock, title: "Tenant Isolation", desc: "Each company workspace is fully isolated. Data, models, and access logs never cross tenant boundaries." },
  { icon: Globe2, title: "Built for Scale", desc: "Trusted by enterprise developers managing 10 to 10,000 active projects across multiple regions." },
];

const logos = ["NorthBuild", "Sahara Dev", "Atlas Engineering", "Meridian Group", "Cedar & Stone", "Vanguard Realty"];

const Home = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
        <div className="absolute inset-0 bg-gradient-mesh opacity-60" />
        <div className="absolute inset-0 grid-pattern opacity-[0.04]" />
        <div className="container relative py-24 md:py-32 lg:py-40">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/15 text-xs font-medium animate-fade-in">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              Enterprise AI for the built environment
            </div>
            <h1 className="mt-6 font-display font-bold text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight animate-fade-up">
              Evaluate every building.<br />
              <span className="text-accent">Enforce every contract.</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-primary-foreground/75 max-w-2xl leading-relaxed animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Bunyan AI is the building evaluation and contract compliance platform built for construction enterprises, real-estate developers, and engineering consultants.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <Button asChild size="lg" className="rounded-full bg-accent hover:bg-accent/90 text-accent-foreground border-0 h-12 px-7 text-base shadow-glow">
                <Link to="/request-demo">Request a Demo <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full h-12 px-7 text-base bg-white/5 hover:bg-white/10 border-white/20 text-primary-foreground hover:text-primary-foreground">
                <Link to="/contact">Talk to Sales</Link>
              </Button>
            </div>
            <p className="mt-6 text-xs text-primary-foreground/50 flex items-center gap-2 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <Lock className="h-3 w-3" /> Access by invitation only · No public signup
            </p>
          </div>
        </div>
      </section>

      {/* Logos */}
      <section className="border-y border-border bg-background py-10">
        <div className="container">
          <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium mb-6">Trusted by enterprise builders</p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {logos.map((l) => (
              <span key={l} className="font-display font-semibold text-muted-foreground/70 text-sm md:text-base tracking-tight">{l}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container py-24 md:py-32">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">The Platform</span>
          <h2 className="mt-3 font-display font-bold text-3xl md:text-5xl tracking-tight">One system for evaluation, compliance, and oversight</h2>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
            Bunyan AI replaces the patchwork of spreadsheets, PDF reviews, and manual site reports with a unified, AI-driven workflow.
          </p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="group p-7 rounded-2xl border border-border bg-card hover:border-accent/40 hover:shadow-elevated transition-smooth">
              <div className="h-12 w-12 rounded-xl bg-accent-soft flex items-center justify-center mb-5 group-hover:bg-accent group-hover:text-accent-foreground transition-smooth">
                <f.icon className="h-5 w-5 text-accent group-hover:text-accent-foreground transition-smooth" />
              </div>
              <h3 className="font-display font-semibold text-lg">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Multi-tenant */}
      <section className="bg-secondary/40 border-y border-border py-24 md:py-32">
        <div className="container grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">Architecture</span>
            <h2 className="mt-3 font-display font-bold text-3xl md:text-5xl tracking-tight">Multi-tenant by design.<br />Isolated by default.</h2>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              Every client company runs in its own dedicated workspace. Data, AI models, audit logs, and user access are completely separated — never shared, never co-mingled.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                "Dedicated workspace per company",
                "Row-level security on every record",
                "Per-tenant audit trail and access logs",
                "Region-pinned data residency available",
              ].map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-gradient-hero p-8 shadow-elevated relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
              <div className="relative h-full grid grid-cols-2 gap-4">
                {["NorthBuild", "Sahara Dev", "Atlas Eng.", "Meridian"].map((name, i) => (
                  <div key={name} className="rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-5 flex flex-col justify-between animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                    <Building2 className="h-6 w-6 text-accent" />
                    <div>
                      <p className="text-primary-foreground font-display font-semibold text-sm">{name}</p>
                      <p className="text-primary-foreground/50 text-xs">Isolated workspace</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-24 md:py-32">
        <div className="rounded-3xl bg-gradient-hero p-12 md:p-16 text-center text-primary-foreground relative overflow-hidden shadow-elevated">
          <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
          <div className="relative max-w-2xl mx-auto">
            <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight">Ready to see Bunyan AI in your workflow?</h2>
            <p className="mt-4 text-primary-foreground/75 text-lg">
              Book a 30-minute walkthrough with our solutions team. We'll tailor the demo to your project portfolio.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="rounded-full bg-accent hover:bg-accent/90 text-accent-foreground border-0 h-12 px-7 shadow-glow">
                <Link to="/request-demo">Request Demo</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full h-12 px-7 bg-white/5 hover:bg-white/10 border-white/20 text-primary-foreground hover:text-primary-foreground">
                <Link to="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
