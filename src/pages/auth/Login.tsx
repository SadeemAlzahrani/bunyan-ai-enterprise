import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import Logo from "@/components/Logo";
import PreferenceToggles from "@/components/PreferenceToggles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
<<<<<<< Updated upstream
import { signIn, roleHome } from "@/lib/auth";
import { useAuth } from "@/hooks/useAuth";
=======
import { getSession, login, roleHome } from "@/lib/auth";
>>>>>>> Stashed changes

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
<<<<<<< Updated upstream
    if (user) navigate(roleHome(user.role), { replace: true });
  }, [user, navigate]);
=======
    const s = getSession();
    if (s) {
      navigate(roleHome(s.role), { replace: true });
    }
  }, [navigate]);
>>>>>>> Stashed changes

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
<<<<<<< Updated upstream
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      toast.error(t("login.invalidCredentials"));
      return;
    }
    toast.success(t("login.welcome"));
    // Navigation happens via the useEffect once useAuth hydrates.
=======

    const s = await login(email, password);

    setLoading(false);

    if (!s) {
      toast.error("Invalid email or password. Access is by invitation only.");
      return;
    }

    toast.success(`Welcome, ${s.full_name.split(" ")[0]}`);
    navigate(roleHome(s.role), { replace: true });
>>>>>>> Stashed changes
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
            {t("login.quote")}
          </h2>

          <div className="mt-6 flex items-center gap-3">
            <div className="h-11 w-11 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center font-display font-semibold">
              KR
            </div>
            <div>
<<<<<<< Updated upstream
              <p className="font-display font-semibold">{t("login.quoteAuthor")}</p>
              <p className="text-sm text-primary-foreground/60">{t("login.quoteTitle")}</p>
=======
              <p className="font-display font-semibold">Khalid Rahman</p>
              <p className="text-sm text-primary-foreground/60">
                CEO · NorthBuild Construction
              </p>
>>>>>>> Stashed changes
            </div>
          </div>
        </div>

        <p className="relative text-xs text-primary-foreground/50 flex items-center gap-2">
          <Lock className="h-3 w-3" /> {t("login.authorisedAccess")}
        </p>
      </div>

      {/* Right: form */}
      <div className="flex flex-col justify-center p-6 md:p-12 relative">
        <div className="absolute top-4 end-4">
          <PreferenceToggles />
        </div>
        <div className="w-full max-w-md mx-auto">
<<<<<<< Updated upstream
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 mb-8">
            <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" /> {t("common.backToSite")}
          </Link>
          <div className="lg:hidden mb-8"><Logo /></div>
          <h1 className="font-display font-bold text-3xl md:text-4xl tracking-tight">{t("login.signIn")}</h1>
          <p className="mt-2 text-muted-foreground">{t("login.accessSubtitle")}</p>

          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="email">{t("login.workEmail")}</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="rounded-xl h-11" placeholder={t("login.emailPlaceholder")} />
=======
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 mb-8"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to site
          </Link>

          <div className="lg:hidden mb-8">
            <Logo />
          </div>

          <h1 className="font-display font-bold text-3xl md:text-4xl tracking-tight">
            Sign in
          </h1>
          <p className="mt-2 text-muted-foreground">
            Access your company workspace.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="email">Work email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-xl h-11"
                placeholder="you@company.com"
              />
>>>>>>> Stashed changes
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
<<<<<<< Updated upstream
                <Label htmlFor="password">{t("login.password")}</Label>
                <a href="#" className="text-xs text-accent hover:underline">{t("login.forgot")}</a>
=======
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-xs text-accent hover:underline">
                  Forgot?
                </a>
>>>>>>> Stashed changes
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-xl h-11"
              />
            </div>
<<<<<<< Updated upstream
            <Button type="submit" disabled={loading} className="w-full h-11 rounded-full bg-gradient-accent text-accent-foreground border-0 shadow-card">
              {loading ? t("login.signingIn") : t("login.signIn")}
=======

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-full bg-gradient-accent text-accent-foreground border-0 shadow-card"
            >
              {loading ? "Signing in…" : "Sign in"}
>>>>>>> Stashed changes
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
<<<<<<< Updated upstream
            {t("login.noAccount")}{" "}
            <Link to="/contact" className="text-accent font-medium hover:underline">{t("login.contactSales")}</Link>
=======
            Don't have an account? Bunyan AI is invitation-only.{" "}
            <Link to="/contact" className="text-accent font-medium hover:underline">
              Contact Sales
            </Link>
>>>>>>> Stashed changes
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;