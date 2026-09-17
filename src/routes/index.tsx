import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  BookOpenCheck,
  HeartPulse,
  Hospital,
  Mic,
  Route as RouteIcon,
  Siren,
  Smartphone,
} from "lucide-react";
import { PhoneFrame } from "@/components/health/PhoneFrame";
import {
  AwarenessScreen,
  EmergencyScreen,
  HomeScreen,
  ResultsScreen,
  RouteScreen,
  VoiceScreen,
  type ScreenId,
} from "@/components/health/screens";
import { facilities, type Facility } from "@/data/mock";
import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HealthAccess — AI Health Navigation Prototype" },
      {
        name: "description",
        content:
          "Clickable bilingual prototype of HealthAccess: voice-first AI navigation to nearby clinics, emergency help and health schemes for rural India.",
      },
      { property: "og:title", content: "HealthAccess — AI Health Navigation Prototype" },
      {
        property: "og:description",
        content:
          "Voice-first, Hindi/English prototype connecting rural communities to nearby healthcare, emergency help and government schemes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const tabs: { id: ScreenId; icon: typeof Mic; label: Record<Lang, string>; sub: Record<Lang, string> }[] =
  [
    {
      id: "home",
      icon: Smartphone,
      label: { en: "Home", hi: "होम" },
      sub: { en: "Greeting & quick actions", hi: "अभिवादन और त्वरित विकल्प" },
    },
    {
      id: "voice",
      icon: Mic,
      label: { en: "Voice Query", hi: "आवाज़ से पूछें" },
      sub: { en: "Transcript & agent steps", hi: "लिखित पाठ और एजेंट चरण" },
    },
    {
      id: "results",
      icon: Hospital,
      label: { en: "Facility Results", hi: "सुविधा परिणाम" },
      sub: { en: "RAG-matched facilities", hi: "मिलान की गई सुविधाएँ" },
    },
    {
      id: "route",
      icon: RouteIcon,
      label: { en: "Route & Detail", hi: "रास्ता और विवरण" },
      sub: { en: "Map view & info", hi: "नक्शा और जानकारी" },
    },
    {
      id: "emergency",
      icon: Siren,
      label: { en: "Emergency", hi: "आपातकाल" },
      sub: { en: "Ambulance & contacts", hi: "एम्बुलेंस और संपर्क" },
    },
    {
      id: "awareness",
      icon: BookOpenCheck,
      label: { en: "Awareness", hi: "जागरूकता" },
      sub: { en: "Health info & schemes", hi: "जानकारी और योजनाएँ" },
    },
  ];

function Index() {
  const [lang, setLang] = useState<Lang>("en");
  const [screen, setScreen] = useState<ScreenId>("home");
  const [facility, setFacility] = useState<Facility>(facilities[0]);

  const go = (id: ScreenId) => setScreen(id);

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/70 px-5 py-5 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-4">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-brand-gradient text-brand-foreground shadow-soft">
            <HeartPulse className="size-6" />
          </span>
          <div className="min-w-0 flex-1">
            <h1 className="text-base font-semibold sm:text-lg">{t("appTitle", lang)}</h1>
            <p className="text-xs text-muted-foreground sm:text-sm">{t("appSubtitle", lang)}</p>
          </div>
          <div className="flex rounded-full border border-border bg-background p-1">
            {(["en", "hi"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                  lang === l ? "bg-brand text-brand-foreground" : "text-muted-foreground"
                }`}
              >
                {l === "en" ? "EN" : "हिं"}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-5xl gap-8 px-5 py-8 lg:grid-cols-[18rem_1fr]">
        <nav className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
          {tabs.map(({ id, icon: Icon, label, sub }) => {
            const active = screen === id;
            return (
              <button
                key={id}
                onClick={() => setScreen(id)}
                className={`flex min-w-[13rem] items-start gap-3 rounded-2xl border p-3.5 text-left transition lg:min-w-0 ${
                  active
                    ? "border-brand bg-brand-soft shadow-soft"
                    : "border-border bg-card hover:border-brand/40"
                }`}
              >
                <span
                  className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${
                    active ? "bg-brand text-brand-foreground" : "bg-secondary text-muted-foreground"
                  }`}
                >
                  <Icon className="size-4.5" />
                </span>
                <span>
                  <span className="block text-sm font-semibold">{label[lang]}</span>
                  <span className="block text-xs text-muted-foreground">{sub[lang]}</span>
                </span>
              </button>
            );
          })}
        </nav>

        <div className="flex justify-center">
          <PhoneFrame>
            {screen === "home" && <HomeScreen lang={lang} go={go} />}
            {screen === "voice" && <VoiceScreen lang={lang} go={go} />}
            {screen === "results" && (
              <ResultsScreen lang={lang} go={go} onSelect={setFacility} />
            )}
            {screen === "route" && <RouteScreen lang={lang} facility={facility} />}
            {screen === "emergency" && <EmergencyScreen lang={lang} />}
            {screen === "awareness" && <AwarenessScreen lang={lang} />}
          </PhoneFrame>
        </div>
      </div>
    </main>
  );
}
