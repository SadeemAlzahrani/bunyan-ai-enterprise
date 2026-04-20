import { useTranslation } from "react-i18next";
import PageHeader from "@/components/app/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { getSession } from "@/lib/auth";
import { toast } from "sonner";

const SettingsPage = () => {
  const { t } = useTranslation();
  const session = getSession();

  return (
    <div className="max-w-3xl">
      <PageHeader
        eyebrow={t("common.workspace")}
        title={t("settings.title")}
        description={t("settings.subtitle")}
      />

      <div className="space-y-6">
        <section className="bg-card border border-border rounded-2xl shadow-card p-6">
          <h2 className="font-display font-semibold text-lg">{t("settings.organization")}</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="org">{t("settings.organizationName")}</Label>
              <Input id="org" defaultValue={session?.company} className="rounded-xl h-11" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="region">{t("settings.region")}</Label>
              <Input id="region" defaultValue="GCC (Riyadh)" className="rounded-xl h-11" />
            </div>
          </div>
        </section>

        <section className="bg-card border border-border rounded-2xl shadow-card p-6">
          <h2 className="font-display font-semibold text-lg">{t("settings.accessConfiguration")}</h2>
          <div className="mt-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{t("settings.ssoEnabled")}</p>
                <p className="text-xs text-muted-foreground">SAML / OIDC</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{t("settings.enforceMfa")}</p>
                <p className="text-xs text-muted-foreground">All users must enable multi-factor authentication</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </section>

        <section className="bg-card border border-border rounded-2xl shadow-card p-6">
          <h2 className="font-display font-semibold text-lg">{t("settings.generalPreferences")}</h2>
          <p className="text-xs text-muted-foreground mt-1">{t("common.language")} & {t("common.theme")} are configured per user via the header toggles.</p>
        </section>

        <div className="flex justify-end">
          <Button onClick={() => toast.success(t("common.save"))} className="rounded-full bg-gradient-accent text-accent-foreground border-0 shadow-card">
            {t("common.save")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
