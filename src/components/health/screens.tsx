import { useEffect, useState } from "react";
import {
  Ambulance,
  BookOpenCheck,
  Check,
  Clock,
  Hospital,
  Loader2,
  MapPin,
  Mic,
  Navigation,
  Phone,
  Pill,
  ShieldCheck,
  Siren,
  Stethoscope,
} from "lucide-react";
import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import {
  agentSteps,
  awarenessCards,
  emergencyContacts,
  facilities,
  transcript,
  user,
  type Facility,
} from "@/data/mock";

type P = { lang: Lang; go: (id: ScreenId) => void };
export type ScreenId = "home" | "voice" | "results" | "route" | "emergency" | "awareness";

const kindIcon = {
  hospital: Hospital,
  phc: Stethoscope,
  pharmacy: Pill,
};

function ScreenShell({
  title,
  subtitle,
  children,
  tone = "brand",
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  tone?: "brand" | "danger";
}) {
  return (
    <div className="animate-rise-in flex min-h-full flex-col">
      <div
        className={`${tone === "danger" ? "bg-danger-gradient text-danger-foreground" : "bg-brand-gradient text-brand-foreground"} px-5 pb-6 pt-4`}
      >
        <h2 className="text-lg font-semibold">{title}</h2>
        {subtitle ? <p className="mt-1 text-sm opacity-90">{subtitle}</p> : null}
      </div>
      <div className="-mt-4 flex-1 space-y-3 rounded-t-3xl bg-background px-4 pb-8 pt-5">
        {children}
      </div>
    </div>
  );
}

export function HomeScreen({ lang, go }: P) {
  const quick = [
    { key: "findFacility" as const, icon: MapPin, to: "results" as ScreenId, tone: "brand" },
    { key: "emergencyHelp" as const, icon: Siren, to: "emergency" as ScreenId, tone: "danger" },
    { key: "healthInfo" as const, icon: BookOpenCheck, to: "awareness" as ScreenId, tone: "warm" },
    { key: "schemes" as const, icon: ShieldCheck, to: "awareness" as ScreenId, tone: "brand" },
  ];

  return (
    <div className="animate-rise-in flex min-h-full flex-col">
      <div className="bg-brand-gradient px-5 pb-10 pt-4 text-brand-foreground">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-full bg-brand-foreground/20 text-lg font-semibold">
            {lang === "hi" ? "मी" : "M"}
          </div>
          <div>
            <p className="text-base font-semibold">
              {t("greeting", lang)}, {user.name[lang]}
            </p>
            <p className="text-xs opacity-90">{t("tapSpeakHint", lang)}</p>
          </div>
        </div>
      </div>

      <div className="-mt-6 flex-1 rounded-t-3xl bg-background px-4 pb-8 pt-6">
        <button
          onClick={() => go("voice")}
          className="relative mx-auto flex w-full flex-col items-center gap-3 rounded-3xl border border-brand/20 bg-brand-soft py-7 transition hover:bg-brand-soft/70"
        >
          <span className="relative flex size-20 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-soft">
            <span className="animate-mic-ring absolute inset-0 rounded-full bg-brand/40" />
            <Mic className="size-9" />
          </span>
          <span className="text-base font-semibold text-foreground">{t("tapSpeak", lang)}</span>
          <span className="text-xs text-muted-foreground">{t("tapSpeakHint", lang)}</span>
        </button>

        <div className="mt-5 grid grid-cols-2 gap-3">
          {quick.map(({ key, icon: Icon, to, tone }) => (
            <button
              key={key}
              onClick={() => go(to)}
              className={`flex min-h-28 flex-col items-start gap-3 rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 ${
                tone === "danger"
                  ? "border-danger/25 bg-danger-soft"
                  : tone === "warm"
                    ? "border-warm/30 bg-warm-soft"
                    : "border-brand/20 bg-card"
              }`}
            >
              <Icon
                className={`size-6 ${tone === "danger" ? "text-danger" : tone === "warm" ? "text-warm-foreground" : "text-brand"}`}
              />
              <span className="text-sm font-semibold leading-snug">{t(key, lang)}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function VoiceScreen({ lang, go }: P) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    setElapsed(0);
    const id = setInterval(() => setElapsed((e) => e + 200), 200);
    return () => clearInterval(id);
  }, [lang]);

  const done = elapsed > 4000;

  return (
    <ScreenShell title={t("listening", lang)} subtitle={t("tapSpeakHint", lang)}>
      <div className="flex flex-col items-center py-2">
        <span className="relative flex size-20 items-center justify-center rounded-full bg-brand text-brand-foreground">
          <span className="animate-mic-ring absolute inset-0 rounded-full bg-brand/40" />
          <Mic className="size-9" />
        </span>
      </div>

      <div className="rounded-2xl rounded-tl-sm border border-border bg-card p-4 shadow-soft">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {t("youSaid", lang)}
        </p>
        <p className="mt-1 text-sm leading-relaxed">{transcript[lang]}</p>
      </div>

      <p className="pt-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {t("agentsAtWork", lang)}
      </p>
      <ol className="space-y-2">
        {agentSteps.map((step) => {
          const complete = elapsed >= step.ms;
          return (
            <li
              key={step.label.en}
              className={`flex items-start gap-3 rounded-2xl border p-3 transition ${
                complete ? "border-brand/25 bg-brand-soft" : "border-border bg-card"
              }`}
            >
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-card">
                {complete ? (
                  <Check className="size-4 text-brand" />
                ) : (
                  <Loader2 className="size-4 animate-spin text-muted-foreground" />
                )}
              </span>
              <span>
                <span className="block text-sm font-medium">{step.label[lang]}</span>
                <span className="block text-xs text-muted-foreground">{step.detail[lang]}</span>
              </span>
            </li>
          );
        })}
      </ol>

      <button
        onClick={() => go("results")}
        disabled={!done}
        className="mt-2 w-full rounded-2xl bg-brand py-3 text-sm font-semibold text-brand-foreground transition disabled:opacity-40"
      >
        {t("nearbyFacilities", lang)}
      </button>
    </ScreenShell>
  );
}

export function ResultsScreen({
  lang,
  go,
  onSelect,
}: P & { onSelect: (f: Facility) => void }) {
  return (
    <ScreenShell title={t("nearbyFacilities", lang)} subtitle={transcript[lang]}>
      {facilities.map((f) => {
        const Icon = kindIcon[f.kind];
        return (
          <button
            key={f.id}
            onClick={() => {
              onSelect(f);
              go("route");
            }}
            className="w-full rounded-2xl border border-border bg-card p-4 text-left shadow-soft transition hover:-translate-y-0.5"
          >
            <div className="flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                <Icon className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold leading-snug">{f.name[lang]}</p>
                <p className="text-xs text-muted-foreground">{f.type[lang]}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                  <span className="rounded-full bg-secondary px-2 py-0.5 font-medium">
                    {f.distanceKm} km {t("away", lang)}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 font-medium ${
                      f.open ? "bg-brand-soft text-brand" : "bg-danger-soft text-danger"
                    }`}
                  >
                    {f.open ? t("open", lang) : t("closed", lang)}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  <span className="font-medium text-warm-foreground">{t("matched", lang)}: </span>
                  {f.reason[lang]}
                </p>
              </div>
            </div>
          </button>
        );
      })}
    </ScreenShell>
  );
}

export function RouteScreen({ lang, facility }: { lang: Lang; facility: Facility }) {
  return (
    <ScreenShell title={t("routeTitle", lang)} subtitle={facility.name[lang]}>
      <div className="relative h-44 overflow-hidden rounded-2xl border border-border bg-brand-soft">
        <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(to_right,oklch(0.9_0.02_190)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.9_0.02_190)_1px,transparent_1px)] [background-size:26px_26px]" />
        <svg viewBox="0 0 300 170" className="absolute inset-0 h-full w-full">
          <path
            d="M40 140 C 90 140, 90 90, 150 85 S 230 60, 262 34"
            fill="none"
            stroke="oklch(0.58 0.09 189)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="1 14"
          />
        </svg>
        <span className="absolute bottom-6 left-6 flex size-4 items-center justify-center rounded-full bg-foreground/80 ring-4 ring-background" />
        <span className="absolute right-6 top-5 text-danger">
          <MapPin className="size-7 fill-danger-soft" />
        </span>
        <span className="absolute bottom-3 right-3 rounded-full bg-card px-3 py-1 text-xs font-semibold shadow-soft">
          {facility.distanceKm} km · {facility.minutes} {t("minsWalk", lang)}
        </span>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
        <p className="text-sm font-semibold">{facility.name[lang]}</p>
        <p className="text-xs text-muted-foreground">{facility.type[lang]}</p>
        <dl className="mt-3 space-y-2 text-xs">
          <div className="flex gap-2">
            <MapPin className="size-4 shrink-0 text-brand" />
            <dd>{facility.address[lang]}</dd>
          </div>
          <div className="flex gap-2">
            <Clock className="size-4 shrink-0 text-brand" />
            <dd>
              {t("hours", lang)}: {facility.hours[lang]}
            </dd>
          </div>
          <div className="flex gap-2">
            <Phone className="size-4 shrink-0 text-brand" />
            <dd>
              {t("contact", lang)}: {facility.phone}
            </dd>
          </div>
        </dl>
        <p className="mt-3 text-xs font-semibold text-muted-foreground">{t("services", lang)}</p>
        <div className="mt-1 flex flex-wrap gap-1.5">
          {facility.services.map((s) => (
            <span key={s.en} className="rounded-full bg-secondary px-2.5 py-1 text-xs">
              {s[lang]}
            </span>
          ))}
        </div>
      </div>

      <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand py-3.5 text-sm font-semibold text-brand-foreground">
        <Navigation className="size-4" />
        {t("getDirections", lang)}
      </button>
    </ScreenShell>
  );
}

export function EmergencyScreen({ lang }: { lang: Lang }) {
  const nearest = facilities.find((f) => f.id === "dh-sitapur")!;
  return (
    <ScreenShell tone="danger" title={t("emergencyTitle", lang)} subtitle={t("emergencyNote", lang)}>
      <button className="bg-danger-gradient flex w-full items-center justify-center gap-3 rounded-3xl py-6 text-base font-bold text-danger-foreground shadow-soft">
        <Ambulance className="size-7" />
        {t("callAmbulance", lang)}
      </button>

      <div className="rounded-2xl border border-danger/20 bg-danger-soft p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-danger">
          {t("nearestEmergency", lang)}
        </p>
        <p className="mt-1 text-sm font-semibold">{nearest.name[lang]}</p>
        <p className="text-xs text-muted-foreground">
          {nearest.distanceKm} km {t("away", lang)} · {nearest.minutes} {t("minsWalk", lang)}
        </p>
      </div>

      <p className="pt-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {t("emergencyContacts", lang)}
      </p>
      {emergencyContacts.map((c) => (
        <div
          key={c.number}
          className="flex items-center justify-between rounded-2xl border border-border bg-card p-3.5"
        >
          <span className="text-sm font-medium">{c.label[lang]}</span>
          <span className="flex items-center gap-2 rounded-full bg-danger-soft px-3 py-1 text-xs font-semibold text-danger">
            <Phone className="size-3.5" />
            {c.number}
          </span>
        </div>
      ))}
    </ScreenShell>
  );
}

export function AwarenessScreen({ lang }: { lang: Lang }) {
  return (
    <ScreenShell title={t("awareness", lang)} subtitle={t("infoOnly", lang)}>
      {awarenessCards.map((c) => (
        <article
          key={c.title.en}
          className="rounded-2xl border border-border bg-card p-4 shadow-soft"
        >
          <span className="inline-block rounded-full bg-warm-soft px-2.5 py-1 text-xs font-semibold text-warm-foreground">
            {c.tag[lang]}
          </span>
          <h3 className="mt-2 text-sm font-semibold">{c.title[lang]}</h3>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{c.body[lang]}</p>
        </article>
      ))}
      <p className="pt-1 text-center text-[0.7rem] text-muted-foreground">{t("infoOnly", lang)}</p>
    </ScreenShell>
  );
}
