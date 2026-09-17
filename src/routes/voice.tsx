import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, Loader2, Mic } from "lucide-react";
import { PageHeader } from "@/components/health/SiteChrome";
import { useLang } from "@/lib/lang";
import { t } from "@/lib/i18n";
import { agentSteps, transcript } from "@/data/mock";

export const Route = createFileRoute("/voice")({
  head: () => ({
    meta: [
      { title: "Ask by Voice — HealthAccess" },
      {
        name: "description",
        content:
          "Speak your health question in Hindi or English and watch HealthAccess understand it and find the right nearby care.",
      },
      { property: "og:title", content: "Ask by Voice — HealthAccess" },
      {
        property: "og:description",
        content: "Voice questions in Hindi or English, answered with nearby healthcare options.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VoicePage,
});

function VoicePage() {
  const { lang } = useLang();
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    setElapsed(0);
    const id = setInterval(() => setElapsed((e) => e + 200), 200);
    return () => clearInterval(id);
  }, [lang]);

  const done = elapsed > 4000;

  return (
    <>
      <PageHeader title={t("listening", lang)} subtitle={t("tapSpeakHint", lang)} />

      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-6">
          <div className="flex justify-center rounded-3xl border border-brand/20 bg-brand-soft py-12">
            <span className="relative flex size-28 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-soft">
              <span className="animate-mic-ring absolute inset-0 rounded-full bg-brand/40" />
              <Mic className="size-12" />
            </span>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {t("youSaid", lang)}
            </p>
            <p className="mt-2 text-lg leading-relaxed">{transcript[lang]}</p>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {t("agentsAtWork", lang)}
          </p>
          <ol className="mt-4 space-y-3">
            {agentSteps.map((step) => {
              const complete = elapsed >= step.ms;
              return (
                <li
                  key={step.label.en}
                  className={`flex items-start gap-3 rounded-2xl border p-4 transition ${
                    complete ? "border-brand/25 bg-brand-soft" : "border-border bg-card"
                  }`}
                >
                  <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-card">
                    {complete ? (
                      <Check className="size-4 text-brand" />
                    ) : (
                      <Loader2 className="size-4 animate-spin text-muted-foreground" />
                    )}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold">{step.label[lang]}</span>
                    <span className="block text-xs text-muted-foreground">{step.detail[lang]}</span>
                  </span>
                </li>
              );
            })}
          </ol>

          <Link
            to="/facilities"
            aria-disabled={!done}
            className={`mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-brand py-4 text-sm font-semibold text-brand-foreground transition ${
              done ? "" : "pointer-events-none opacity-40"
            }`}
          >
            {t("nearbyFacilities", lang)}
          </Link>
        </div>
      </div>
    </>
  );
}
