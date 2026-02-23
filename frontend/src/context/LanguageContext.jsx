import { createContext, useContext, useMemo, useState } from "react";

const LanguageContext = createContext(null);

const translations = {
  en: {
    adminCenter: "Admin Control Center",
    subtitle: "Monitor village services, funds, and grievances.",
    logout: "Logout"
  },
  hi: {
    adminCenter: "प्रशासन नियंत्रण केंद्र",
    subtitle: "गांव सेवाओं, निधियों और शिकायतों की निगरानी करें।",
    logout: "लॉगआउट"
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");

  const value = useMemo(() => ({
    language,
    setLanguage,
    t: translations[language]
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);
