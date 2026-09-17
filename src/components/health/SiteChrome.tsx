import { Link } from "@tanstack/react-router";
import { HeartPulse, Menu, X } from "lucide-react";
import { useState } from "react";
import { useLang } from "@/lib/lang";
import { t, type Lang } from "@/lib/i18n";

const nav: { to: string; label: Record<Lang, string> }[] = [
  { to: "/", label: { en: "Home", hi: "होम" } },
  { to: "/voice", label: { en: "Ask by Voice", hi: "आवाज़ से पूछें" } },
  { to: "/facilities", label: { en: "Facilities", hi: "सुविधाएँ" } },
  { to: "/emergency", label: { en: "Emergency", hi: "आपातकाल" } },
  { to: "/health-info", label: { en: "Health Info", hi: "स्वास्थ्य जानकारी" } },
];

export function SiteHeader() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3.5">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex size-10 items-center justify-center rounded-2xl bg-brand-gradient text-brand-foreground shadow-soft">
            <HeartPulse className="size-5" />
          </span>
          <span className="text-base font-semibold tracking-tight">HealthAccess</span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              activeProps={{ className: "bg-brand-soft text-brand" }}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
            >
              {n.label[lang]}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <div className="flex rounded-full border border-border p-1">
            {(["en", "hi"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`rounded-full px-3 py-1 text-sm font-semibold transition ${
                  lang === l ? "bg-brand text-brand-foreground" : "text-muted-foreground"
                }`}
              >
                {l === "en" ? "EN" : "हिं"}
              </button>
            ))}
          </div>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            className="flex size-10 items-center justify-center rounded-xl border border-border md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="grid gap-1 border-t border-border px-5 py-3 md:hidden">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              activeOptions={{ exact: n.to === "/" }}
              activeProps={{ className: "bg-brand-soft text-brand" }}
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground"
            >
              {n.label[lang]}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}

export function SiteFooter() {
  const { lang } = useLang();
  return (
    <footer className="mt-20 border-t border-border bg-card/50">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-8 text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} HealthAccess · {t("appSubtitle", lang)}</p>
        <p>{t("infoOnly", lang)}</p>
      </div>
    </footer>
  );
}

export function PageHeader({
  title,
  subtitle,
  tone = "brand",
}: {
  title: string;
  subtitle?: string;
  tone?: "brand" | "danger";
}) {
  return (
    <section
      className={`${tone === "danger" ? "bg-danger-gradient text-danger-foreground" : "bg-brand-gradient text-brand-foreground"}`}
    >
      <div className="animate-rise-in mx-auto max-w-6xl px-5 py-12 md:py-16">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h1>
        {subtitle ? <p className="mt-3 max-w-2xl text-sm opacity-90 md:text-base">{subtitle}</p> : null}
      </div>
    </section>
  );
}
