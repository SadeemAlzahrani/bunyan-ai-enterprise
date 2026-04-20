import { Link } from "react-router-dom";
import Logo from "@/components/Logo";

const SiteFooter = () => (
  <footer className="border-t border-border bg-secondary/40 mt-24">
    <div className="container py-14">
      <div className="grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 text-sm text-muted-foreground max-w-sm leading-relaxed">
            Enterprise-grade AI for building evaluation and contract compliance. Trusted by leading construction firms, developers, and engineering consultants.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold text-sm mb-3">Platform</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/solutions" className="hover:text-foreground transition-smooth">Solutions</Link></li>
            <li><Link to="/security" className="hover:text-foreground transition-smooth">Security</Link></li>
            <li><Link to="/pricing" className="hover:text-foreground transition-smooth">Pricing</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold text-sm mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/contact" className="hover:text-foreground transition-smooth">Contact Sales</Link></li>
            <li><Link to="/request-demo" className="hover:text-foreground transition-smooth">Request Demo</Link></li>
            <li><Link to="/login" className="hover:text-foreground transition-smooth">Customer Login</Link></li>
          </ul>
        </div>
      </div>
      <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Bunyan AI. All rights reserved.</p>
        <p>Access by invitation only · SOC 2 · ISO 27001</p>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
