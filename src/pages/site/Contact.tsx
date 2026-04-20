import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Contact = () => {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    toast.success("Thanks — our sales team will be in touch within one business day.");
  };

  return (
    <>
      <section className="bg-gradient-soft border-b border-border">
        <div className="container py-20 md:py-24">
          <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">Contact Sales</span>
          <h1 className="mt-3 font-display font-bold text-4xl md:text-5xl tracking-tight max-w-3xl">Talk to our enterprise team.</h1>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl">
            We work with construction firms, developers, and consultancies of all sizes. Tell us about your portfolio.
          </p>
        </div>
      </section>

      <section className="container py-20 grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-6">
          {[
            { icon: Mail, label: "Email", value: "sales@bunyan.ai" },
            { icon: Phone, label: "Phone", value: "+1 (415) 555-0102" },
            { icon: MapPin, label: "HQ", value: "Riyadh · Dubai · London" },
          ].map((c) => (
            <div key={c.label} className="flex gap-4">
              <div className="h-11 w-11 rounded-xl bg-accent-soft flex items-center justify-center shrink-0">
                <c.icon className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</p>
                <p className="font-display font-semibold mt-1">{c.value}</p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={onSubmit} className="lg:col-span-2 p-8 md:p-10 rounded-3xl border border-border bg-card shadow-card">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="firstName">First name</Label>
              <Input id="firstName" required className="rounded-xl h-11" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="lastName">Last name</Label>
              <Input id="lastName" required className="rounded-xl h-11" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Work email</Label>
              <Input id="email" type="email" required className="rounded-xl h-11" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="company">Company</Label>
              <Input id="company" required className="rounded-xl h-11" />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="role">Your role</Label>
              <Input id="role" placeholder="e.g. CEO, Head of Development, Project Director" className="rounded-xl h-11" />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="message">How can we help?</Label>
              <Textarea id="message" rows={5} required className="rounded-xl" placeholder="Tell us about your portfolio and what you'd like to evaluate." />
            </div>
          </div>
          <Button type="submit" disabled={sent} className="mt-6 rounded-full h-11 px-7 bg-gradient-accent text-accent-foreground border-0 shadow-card">
            {sent ? "Sent" : (<>Send message <Send className="ml-2 h-4 w-4" /></>)}
          </Button>
        </form>
      </section>
    </>
  );
};

export default Contact;
