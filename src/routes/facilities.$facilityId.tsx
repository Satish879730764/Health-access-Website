import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock, MapPin, Navigation, Phone } from "lucide-react";
import { PageHeader } from "@/components/health/SiteChrome";
import { useLang } from "@/lib/lang";
import { t } from "@/lib/i18n";
import { facilities } from "@/data/mock";

export const Route = createFileRoute("/facilities/$facilityId")({
  loader: ({ params }) => {
    const facility = facilities.find((f) => f.id === params.facilityId);
    if (!facility) throw notFound();
    return { facility };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Facility not found — HealthAccess" }, { name: "robots", content: "noindex" }],
      };
    }
    const name = loaderData.facility.name.en;
    return {
      meta: [
        { title: `${name} — HealthAccess` },
        {
          name: "description",
          content: `Route, hours, contact number and available services at ${name}.`,
        },
        { property: "og:title", content: `${name} — HealthAccess` },
        { property: "og:description", content: `Route, hours and services at ${name}.` },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: FacilityDetail,
});

function FacilityDetail() {
  const { lang } = useLang();
  const { facility } = Route.useLoaderData();

  return (
    <>
      <PageHeader title={facility.name[lang]} subtitle={facility.type[lang]} />

      <div className="mx-auto max-w-6xl px-5 py-10">
        <Link
          to="/facilities"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          {t("nearbyFacilities", lang)}
        </Link>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div className="relative h-72 overflow-hidden rounded-3xl border border-border bg-brand-soft md:h-96">
            <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(to_right,oklch(0.9_0.02_190)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.9_0.02_190)_1px,transparent_1px)] [background-size:34px_34px]" />
            <svg viewBox="0 0 600 340" className="absolute inset-0 h-full w-full">
              <path
                d="M70 280 C 180 280, 180 180, 300 170 S 460 120, 530 68"
                fill="none"
                stroke="oklch(0.58 0.09 189)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="1 18"
              />
            </svg>
            <span className="absolute bottom-12 left-10 flex size-5 rounded-full bg-foreground/80 ring-4 ring-background" />
            <span className="absolute right-12 top-10 text-danger">
              <MapPin className="size-9 fill-danger-soft" />
            </span>
            <span className="absolute bottom-4 right-4 rounded-full bg-card px-4 py-1.5 text-sm font-semibold shadow-soft">
              {facility.distanceKm} km · {facility.minutes} {t("minsWalk", lang)}
            </span>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <dl className="space-y-3 text-sm">
              <div className="flex gap-3">
                <MapPin className="size-5 shrink-0 text-brand" />
                <dd>{facility.address[lang]}</dd>
              </div>
              <div className="flex gap-3">
                <Clock className="size-5 shrink-0 text-brand" />
                <dd>
                  {t("hours", lang)}: {facility.hours[lang]}
                </dd>
              </div>
              <div className="flex gap-3">
                <Phone className="size-5 shrink-0 text-brand" />
                <dd>
                  {t("contact", lang)}: {facility.phone}
                </dd>
              </div>
            </dl>

            <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {t("services", lang)}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {facility.services.map((s) => (
                <span key={s.en} className="rounded-full bg-secondary px-3 py-1.5 text-xs">
                  {s[lang]}
                </span>
              ))}
            </div>

            <a
              href={`tel:${facility.phone}`}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand py-4 text-sm font-semibold text-brand-foreground"
            >
              <Navigation className="size-4" />
              {t("getDirections", lang)}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
