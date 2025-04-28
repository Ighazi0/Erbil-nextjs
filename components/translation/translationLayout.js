"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { IntlProvider } from "react-intl";

// Import translations
import en from "@/local/en/translation.json";
import ar from "@/local/ar/translation.json";
import kr from "@/local/kr/translation.json";

import Loader from "../../components/elements/Preloader";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../app/firebase"; 
import dayjs from "dayjs";

const messages = {
  en,
  ar,
  kr,
};

export const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export default function TranslationLayout({ children }) {
  // State for locale and loading
  const [locale, setLocale] = useState("en"); // Default to "ar"
  const [code, setCode] = useState("AED");
  const [rate, setRate] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [startDate, setStartDate] = useState(dayjs().toDate());
  const [endDate, setEndDate] = useState(dayjs().add(7, 'days').toDate());
  const [numberOfDays, setNumberOfDays] = useState(7);
  const [isInitialized, setIsInitialized] = useState(false); // Prevent rendering until locale is determined

  // Effect to synchronize locale from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLocale = localStorage.getItem("locale") || "en";
      setLocale(savedLocale);
      const savedCode = localStorage.getItem("code") || "AED";
      setCode(savedCode);
      const savedRate = localStorage.getItem("rate") || 1;
      setRate(savedRate);
      setIsInitialized(true); // Indicate that the locale has been initialized
    }
  }, []);

  // Effect to update HTML "dir" attribute
  useEffect(() => {
    if (typeof window !== "undefined") {
      const htmlElement = window.document.documentElement;
      htmlElement.setAttribute("dir", locale === 'en' ? 'ltr' : 'rtl');
    }
  }, [locale]);

  useEffect(() => {
    if (typeof window !== "undefined" && startDate && endDate) {      
      setNumberOfDays(dayjs(endDate).diff(startDate, 'day'))
    }
  }, [startDate, endDate]);

  // Function to switch language
  const switchLanguage = async (language) => {
    setLocale(language);
    if (typeof window !== "undefined") {
      localStorage.setItem("locale", language);
    }
  };

  const switchCode = async (newCode, newRate) => {
    setCode(newCode);
    setRate(newRate);
    if (typeof window !== "undefined") {
      localStorage.setItem("code", newCode);
      localStorage.setItem("rate", newRate);
    }
  };

  // Show loader until locale is initialized
  if (!isInitialized) {
    return <Loader />;
  }

  return (
    <LanguageContext.Provider value={{ locale, switchLanguage, code, switchCode, rate, selectedLocation, setSelectedLocation, startDate, setStartDate, endDate, setEndDate, numberOfDays }}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
}
