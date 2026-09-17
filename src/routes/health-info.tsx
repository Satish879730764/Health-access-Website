import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/health/SiteChrome";
import { useLang } from "@/lib/lang";
import { t } from "@/lib/i18n";
import { awarenessCards } from "@/data/mock";

export const Route = createFileRoute("/health-info")({
  head: () => ({
    meta: [
      { title: "Health Info & Schemes — HealthAccess" },
      {
        name: "description",
        content:
          "Plain-language health awareness and government scheme information in Hindi and English, for rural families.",
      },
      { property: "og:title", content: "Health Info & Schemes — HealthAccess" },
      {
        property: "og:description",
        content: "Bilingual health awareness and government health scheme guidance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HealthInfoPage,
});

function HealthInfoPage() {
  const { lang } = useLang();

  return (
    <>
      <PageHeader title={t("awareness", lang)} subtitle={t("infoOnly", lang)} />

      <div className="mx-auto grid max-w-6xl gap-5 px-5 py-12 md:grid-cols-2">
        {awarenessCards.map((c) => (
          <article key={c.title.en} className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <span className="inline-block rounded-full bg-warm-soft px-3 py-1 text-xs font-semibold text-warm-foreground">
              {c.tag[lang]}
            </span>
            <h2 className="mt-3 text-lg font-semibold">{c.title[lang]}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body[lang]}</p>
          </article>
        ))}
      </div>
    </>
  );
}
