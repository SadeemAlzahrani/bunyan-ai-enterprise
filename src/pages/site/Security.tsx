import { ShieldCheck, Lock, Server, FileCheck, Eye, KeyRound } from "lucide-react";

const items = [
  { icon: ShieldCheck, title: "SOC 2 Type II", desc: "Annually audited controls covering security, availability and confidentiality." },
  { icon: FileCheck, title: "ISO 27001", desc: "Certified information security management system across the entire platform." },
  { icon: Lock, title: "Tenant Isolation", desc: "Strict logical isolation per company. No data, model weights, or logs are ever shared across tenants." },
  { icon: Server, title: "Data Residency", desc: "Choose your region. EU, GCC, and North America deployments available for regulated customers." },
  { icon: KeyRound, title: "SSO & SCIM", desc: "Enterprise SSO via SAML 2.0 and OIDC. Automated user provisioning with SCIM 2.0." },
  { icon: Eye, title: "Full Audit Trail", desc: "Every action — read, write, export, share — is logged and queryable for compliance teams." },
];

const Security = () => (
  <>
    <section className="bg-gradient-hero text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-60" />
      <div className="container relative py-20 md:py-28">
        <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">Security & Trust</span>
        <h1 className="mt-3 font-display font-bold text-4xl md:text-6xl tracking-tight max-w-3xl">Enterprise security is the baseline.</h1>
        <p className="mt-5 text-primary-foreground/75 text-lg max-w-2xl leading-relaxed">
          Bunyan AI was built for regulated industries from day one. Every control, every certification, every audit — engineered in, not bolted on.
        </p>
      </div>
    </section>

    <section className="container py-20">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((i) => (
          <div key={i.title} className="p-7 rounded-2xl border border-border bg-card hover:shadow-elevated transition-smooth">
            <div className="h-12 w-12 rounded-xl bg-accent-soft flex items-center justify-center mb-5">
              <i.icon className="h-5 w-5 text-accent" />
            </div>
            <h3 className="font-display font-semibold text-lg">{i.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{i.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 p-8 md:p-10 rounded-3xl bg-secondary/60 border border-border">
        <h3 className="font-display font-bold text-2xl">Need our compliance documentation?</h3>
        <p className="mt-2 text-muted-foreground">Customers and prospects under NDA can request our SOC 2 report, pen-test summary, and DPIA.</p>
      </div>
    </section>
  </>
);

export default Security;
