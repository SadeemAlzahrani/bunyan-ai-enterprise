import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, ArrowLeft } from "lucide-react";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { DEMO_ACCOUNTS, getSession, login, roleHome, roleLabel } from "@/lib/auth";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const s = getSession();
    if (s) navigate(roleHome(s.role), { replace: true });
  }, [navigate]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const s = login(email, password);
      setLoading(false);
      if (!s) {
        toast.error("Invalid credentials. Access is by invitation only.");
        return;
      }
      toast.success(`Welcome, ${s.name.split(" ")[0]}`);
      navigate(roleHome(s.role), { replace: true });
    }, 400);
  };

  const quickLogin = (e: string) => {
    setEmail(e);
    setPassword("demo");
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Left: brand panel */}
      <div className="hidden lg:flex relative bg-gradient-hero text-primary-foreground p-12 flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
        <div className="absolute inset-0 grid-pattern opacity-[0.04]" />
        <div className="relative">
          <Logo variant="light" />
        </div>
        <div className="relative max-w-md">
          <h2 className="font-display font-bold text-4xl leading-tight tracking-tight">
            "Bunyan replaced six tools and three weekly meetings. Our project oversight has never been sharper."
          </h2>
          <div className="mt-6 flex items-center gap-3">
            <div className="h-11 w-11 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center font-display font-semibold">KR</div>
            <div>
              <p className="font-display font-semibold">Khalid Rahman</p>
              <p className="text-sm text-primary-foreground/60">CEO · NorthBuild Construction</p>
            </div>
          </div>
        </div>
        <p className="relative text-xs text-primary-foreground/50 flex items-center gap-2">
          <Lock className="h-3 w-3" /> Authorised access only
        </p>
      </div>

      {/* Right: form */}
      <div className="flex flex-col justify-center p-6 md:p-12">
        <div className="w-full max-w-md mx-auto">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 mb-8">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to site
          </Link>
          <div className="lg:hidden mb-8"><Logo /></div>
          <h1 className="font-display font-bold text-3xl md:text-4xl tracking-tight">Sign in</h1>
          <p className="mt-2 text-muted-foreground">Access your company workspace.</p>

          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="email">Work email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="rounded-xl h-11" placeholder="you@company.com" />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-xs text-accent hover:underline">Forgot?</a>
              </div>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="rounded-xl h-11" />
            </div>
            <Button type="submit" disabled={loading} className="w-full h-11 rounded-full bg-gradient-accent text-accent-foreground border-0 shadow-card">
              {loading ? "Signing in…" : "Sign in"}
            </Button>
          </form>

          <div className="mt-8 p-5 rounded-2xl bg-secondary/60 border border-border">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Demo accounts</p>
            <p className="text-xs text-muted-foreground mt-1">Password for all: <code className="px-1.5 py-0.5 bg-background rounded text-foreground">demo</code></p>
            <div className="mt-3 space-y-1.5">
              {DEMO_ACCOUNTS.map((a) => (
                <button key={a.email} type="button" onClick={() => quickLogin(a.email)} className="w-full text-left flex items-center justify-between px-3 py-2 rounded-lg hover:bg-background transition-smooth text-xs">
                  <span className="font-medium">{a.email}</span>
                  <span className="text-accent font-medium">{roleLabel(a.role)}</span>
                </button>
              ))}
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don't have an account? Bunyan AI is invitation-only.{" "}
            <Link to="/contact" className="text-accent font-medium hover:underline">Contact Sales</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
