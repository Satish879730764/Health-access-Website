import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpenCheck, MapPin, Mic, ShieldCheck, Siren } from "lucide-react";
import { useLang } from "@/lib/lang";
import { t } from "@/lib/i18n";
import { user, facilities } from "@/data/mock";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HealthAccess — Voice-first health navigation for rural India" },
      {
        name: "description",
        content:
          "Ask in Hindi or English and find nearby clinics, hospitals, pharmacies, emergency help and government health schemes.",
      },
      { property: "og:title", content: "HealthAccess — Voice-first health navigation" },
      {
        property: "og:description",
        content:
          "Bilingual health navigation for rural India: nearby facilities, routes, emergency numbers and scheme information.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const { lang } = useLang();

  const quick = [
    { key: "findFacility" as const, icon: MapPin, to: "/facilities", tone: "brand" },
    { key: "emergencyHelp" as const, icon: Siren, to: "/emergency", tone: "danger" },
    { key: "healthInfo" as const, icon: BookOpenCheck, to: "/health-info", tone: "warm" },
    { key: "schemes" as const, icon: ShieldCheck, to: "/health-info", tone: "brand" },
  ];

  return (
    <>
      <section className="bg-brand-gradient text-brand-foreground">
        <div className="animate-rise-in mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:items-center md:py-24">
          <div>
            <p className="text-sm font-medium opacity-90">
              {t("greeting", lang)}, {user.name[lang]}
            </p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
              {t("appTitle", lang)}
            </h1>
            <p className="mt-4 max-w-xl text-sm opacity-90 md:text-base">{t("appSubtitle", lang)}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/voice"
                className="inline-flex items-center gap-2 rounded-full bg-background px-6 py-3.5 text-sm font-semibold text-brand shadow-soft transition hover:-translate-y-0.5"
              >
                <Mic className="size-5" />
                {t("tapSpeak", lang)}
              </Link>
              <Link
                to="/facilities"
                className="inline-flex items-center gap-2 rounded-full border border-brand-foreground/40 px-6 py-3.5 text-sm font-semibold transition hover:bg-brand-foreground/10"
              >
                {t("findFacility", lang)}
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <Link
              to="/voice"
              className="relative flex size-52 flex-col items-center justify-center gap-3 rounded-full bg-brand-foreground/15 md:size-64"
            >
              <span className="animate-mic-ring absolute inset-6 rounded-full bg-brand-foreground/25" />
              <span className="relative flex size-24 items-center justify-center rounded-full bg-background text-brand shadow-soft md:size-28">
                <Mic className="size-11" />
              </span>
              <span className="relative text-sm font-semibold">{t("tapSpeakHint", lang)}</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quick.map(({ key, icon: Icon, to, tone }) => (
            <Link
              key={key}
              to={to}
              className={`flex min-h-36 flex-col justify-between rounded-3xl border p-5 transition hover:-translate-y-1 hover:shadow-soft ${
                tone === "danger"
                  ? "border-danger/25 bg-danger-soft"
                  : tone === "warm"
                    ? "border-warm/30 bg-warm-soft"
                    : "border-brand/20 bg-card"
              }`}
            >
              <Icon
                className={`size-7 ${tone === "danger" ? "text-danger" : tone === "warm" ? "text-warm-foreground" : "text-brand"}`}
              />
              <span className="text-base font-semibold leading-snug">{t(key, lang)}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-6">
        <h2 className="text-xl font-semibold tracking-tight">{t("nearbyFacilities", lang)}</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {facilities.slice(0, 3).map((f) => (
            <Link
              key={f.id}
              to="/facilities/$facilityId"
              params={{ facilityId: f.id }}
              className="rounded-3xl border border-border bg-card p-5 transition hover:-translate-y-1 hover:shadow-soft"
            >
              <p className="text-sm font-semibold leading-snug">{f.name[lang]}</p>
              <p className="mt-1 text-xs text-muted-foreground">{f.type[lang]}</p>
              <p className="mt-3 text-xs font-medium text-brand">
                {f.distanceKm} km {t("away", lang)} · {f.minutes} {t("minsWalk", lang)}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
