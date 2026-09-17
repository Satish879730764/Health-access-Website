import { createFileRoute, Link } from "@tanstack/react-router";
import { Ambulance, Phone } from "lucide-react";
import { PageHeader } from "@/components/health/SiteChrome";
import { useLang } from "@/lib/lang";
import { t } from "@/lib/i18n";
import { emergencyContacts, facilities } from "@/data/mock";

export const Route = createFileRoute("/emergency")({
  head: () => ({
    meta: [
      { title: "Emergency Help — HealthAccess" },
      {
        name: "description",
        content:
          "Call an ambulance on 108, see the nearest emergency hospital and reach health helplines and your local ASHA worker.",
      },
      { property: "og:title", content: "Emergency Help — HealthAccess" },
      {
        property: "og:description",
        content: "Ambulance 108, nearest emergency hospital and health helpline numbers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EmergencyPage,
});

function EmergencyPage() {
  const { lang } = useLang();
  const nearest = facilities.find((f) => f.id === "dh-sitapur")!;

  return (
    <>
      <PageHeader tone="danger" title={t("emergencyTitle", lang)} subtitle={t("emergencyNote", lang)} />

      <div className="mx-auto grid max-w-6xl gap-6 px-5 py-12 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-6">
          <a
            href="tel:108"
            className="bg-danger-gradient flex w-full items-center justify-center gap-4 rounded-3xl py-10 text-xl font-bold text-danger-foreground shadow-soft transition hover:-translate-y-0.5"
          >
            <Ambulance className="size-9" />
            {t("callAmbulance", lang)}
          </a>

          <Link
            to="/facilities/$facilityId"
            params={{ facilityId: nearest.id }}
            className="block rounded-3xl border border-danger/20 bg-danger-soft p-6 transition hover:-translate-y-0.5"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-danger">
              {t("nearestEmergency", lang)}
            </p>
            <p className="mt-2 text-lg font-semibold">{nearest.name[lang]}</p>
            <p className="text-sm text-muted-foreground">
              {nearest.distanceKm} km {t("away", lang)} · {nearest.minutes} {t("minsWalk", lang)}
            </p>
          </Link>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {t("emergencyContacts", lang)}
          </p>
          <div className="mt-4 space-y-3">
            {emergencyContacts.map((c) => (
              <a
                key={c.number}
                href={`tel:${c.number}`}
                className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 transition hover:-translate-y-0.5"
              >
                <span className="text-sm font-medium">{c.label[lang]}</span>
                <span className="flex items-center gap-2 rounded-full bg-danger-soft px-3.5 py-1.5 text-sm font-semibold text-danger">
                  <Phone className="size-4" />
                  {c.number}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
