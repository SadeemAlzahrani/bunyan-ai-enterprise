import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Growth",
    desc: "For mid-size contractors and consulting firms.",
    price: "Custom",
    features: ["Up to 25 projects", "Up to 50 users", "AI evaluation engine", "Standard SLA", "Email support"],
    highlight: false,
  },
  {
    name: "Enterprise",
    desc: "For large developers and multi-region operators.",
    price: "Custom",
    features: ["Unlimited projects & users", "Dedicated workspace", "SSO + SCIM", "Custom AI models", "99.9% SLA", "Dedicated CSM"],
    highlight: true,
  },
  {
    name: "Sovereign",
    desc: "For government and regulated entities.",
    price: "Custom",
    features: ["In-region deployment", "Air-gapped option", "Bring-your-own-keys", "Custom DPA", "24/7 priority support"],
    highlight: false,
  },
];

const Pricing = () => (
  <>
    <section className="bg-gradient-soft border-b border-border">
      <div className="container py-20 md:py-28 text-center">
        <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">Pricing</span>
        <h1 className="mt-3 font-display font-bold text-4xl md:text-6xl tracking-tight">Simple, enterprise pricing.</h1>
        <p className="mt-5 text-muted-foreground text-lg max-w-2xl mx-auto">
          All plans are tailored to your portfolio size, deployment region, and integration needs. No public signup, no self-serve tiers.
        </p>
      </div>
    </section>

    <section className="container py-20">
      <div className="grid gap-6 md:grid-cols-3">
        {tiers.map((t) => (
          <div
            key={t.name}
            className={`p-8 rounded-3xl border transition-smooth ${
              t.highlight
                ? "border-accent bg-card shadow-elevated relative"
                : "border-border bg-card hover:shadow-elevated"
            }`}
          >
            {t.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-accent text-accent-foreground text-xs font-semibold">
                Most popular
              </span>
            )}
            <h3 className="font-display font-bold text-2xl">{t.name}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{t.desc}</p>
            <p className="mt-6 font-display font-bold text-4xl tracking-tight">{t.price}</p>
            <p className="text-sm text-muted-foreground">contact for quote</p>
            <Button asChild className={`mt-6 w-full rounded-full ${t.highlight ? "bg-gradient-accent text-accent-foreground border-0" : ""}`} variant={t.highlight ? "default" : "outline"}>
              <Link to="/contact">Contact Sales</Link>
            </Button>
            <ul className="mt-7 space-y-3">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm">
                  <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  </>
);

export default Pricing;
