import { createFileRoute, Link } from "@tanstack/react-router";
import { Hospital, Pill, Stethoscope } from "lucide-react";
import { PageHeader } from "@/components/health/SiteChrome";
import { useLang } from "@/lib/lang";
import { t } from "@/lib/i18n";
import { facilities, transcript } from "@/data/mock";

export const Route = createFileRoute("/facilities/")({
  head: () => ({
    meta: [
      { title: "Nearby Facilities — HealthAccess" },
      {
        name: "description",
        content:
          "Community health centres, primary health centres, district hospitals and Jan Aushadhi stores near you, with distance, hours and services.",
      },
      { property: "og:title", content: "Nearby Facilities — HealthAccess" },
      {
        property: "og:description",
        content: "Find nearby clinics, hospitals and pharmacies with distance, hours and services.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FacilitiesPage,
});

const kindIcon = { hospital: Hospital, phc: Stethoscope, pharmacy: Pill };

function FacilitiesPage() {
  const { lang } = useLang();

  return (
    <>
      <PageHeader title={t("nearbyFacilities", lang)} subtitle={transcript[lang]} />

      <div className="mx-auto grid max-w-6xl gap-5 px-5 py-12 md:grid-cols-2">
        {facilities.map((f) => {
          const Icon = kindIcon[f.kind];
          return (
            <Link
              key={f.id}
              to="/facilities/$facilityId"
              params={{ facilityId: f.id }}
              className="flex gap-4 rounded-3xl border border-border bg-card p-5 transition hover:-translate-y-1 hover:shadow-soft"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                <Icon className="size-6" />
              </span>
              <div className="min-w-0">
                <p className="text-base font-semibold leading-snug">{f.name[lang]}</p>
                <p className="text-xs text-muted-foreground">{f.type[lang]}</p>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                  <span className="rounded-full bg-secondary px-2.5 py-1 font-medium">
                    {f.distanceKm} km {t("away", lang)}
                  </span>
                  <span className="rounded-full bg-secondary px-2.5 py-1 font-medium">
                    {f.minutes} {t("minsWalk", lang)}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-1 font-medium ${
                      f.open ? "bg-brand-soft text-brand" : "bg-danger-soft text-danger"
                    }`}
                  >
                    {f.open ? t("open", lang) : t("closed", lang)}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  <span className="font-medium text-warm-foreground">{t("matched", lang)}: </span>
                  {f.reason[lang]}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
