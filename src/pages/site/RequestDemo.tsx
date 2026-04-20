import { useState } from "react";
import { Calendar, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const RequestDemo = () => {
  const [done, setDone] = useState(false);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDone(true);
    toast.success("Demo requested — we'll email you to schedule.");
  };

  if (done) {
    return (
      <section className="container py-32 text-center max-w-xl mx-auto">
        <div className="h-16 w-16 mx-auto rounded-2xl bg-accent-soft flex items-center justify-center">
          <CheckCircle2 className="h-8 w-8 text-accent" />
        </div>
        <h1 className="mt-6 font-display font-bold text-3xl md:text-4xl">Request received</h1>
        <p className="mt-3 text-muted-foreground">A solutions engineer will email you within one business day to schedule your tailored walkthrough.</p>
      </section>
    );
  }

  return (
    <section className="container py-20 md:py-24 grid gap-12 lg:grid-cols-2">
      <div>
        <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">Request Demo</span>
        <h1 className="mt-3 font-display font-bold text-4xl md:text-5xl tracking-tight">See Bunyan AI on your projects.</h1>
        <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
          A 30-minute live walkthrough with one of our solutions engineers. We'll use a sample of your project documents (under NDA) to show you exactly what Bunyan can detect, evaluate, and automate.
        </p>
        <div className="mt-8 p-5 rounded-2xl bg-secondary/60 border border-border flex gap-4 items-start">
          <Calendar className="h-5 w-5 text-accent shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-display font-semibold">What to expect</p>
            <p className="text-muted-foreground mt-1">Live demo · Q&A with a solutions engineer · Tailored to your portfolio.</p>
          </div>
        </div>
      </div>

      <form onSubmit={onSubmit} className="p-8 rounded-3xl border border-border bg-card shadow-card">
        <div className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="fn">First name</Label>
              <Input id="fn" required className="rounded-xl h-11" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ln">Last name</Label>
              <Input id="ln" required className="rounded-xl h-11" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="em">Work email</Label>
            <Input id="em" type="email" required className="rounded-xl h-11" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="co">Company</Label>
            <Input id="co" required className="rounded-xl h-11" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="size">Active projects (approx)</Label>
            <Input id="size" placeholder="e.g. 12" className="rounded-xl h-11" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="notes">Anything specific you'd like to see?</Label>
            <Textarea id="notes" rows={3} className="rounded-xl" />
          </div>
          <Button type="submit" className="w-full h-11 rounded-full bg-gradient-accent text-accent-foreground border-0 shadow-card">
            Request my demo
          </Button>
          <p className="text-xs text-muted-foreground text-center">We respond within one business day.</p>
        </div>
      </form>
    </section>
  );
};

export default RequestDemo;
