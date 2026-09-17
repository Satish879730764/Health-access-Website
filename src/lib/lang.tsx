import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Lang } from "@/lib/i18n";

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "en",
  setLang: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("ha-lang");
    if (saved === "hi" || saved === "en") setLang(saved);
  }, []);

  const update = (l: Lang) => {
    setLang(l);
    localStorage.setItem("ha-lang", l);
  };

  return <LangContext.Provider value={{ lang, setLang: update }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
