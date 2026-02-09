"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { useTransition, useState, useEffect, useRef } from "react";

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: "en", name: "English" },
    { code: "bn", name: "বাংলা" },
  ];

  const currentLanguage = languages.find((lang) => lang.code === locale);

  const changeLanguage = (newLocale: string) => {
    if (newLocale === locale) {
      setIsOpen(false);
      return;
    }

    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
      setIsOpen(false);
    });
    localStorage.setItem("lang", locale);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className="flex items-center gap-1 px-2 py-1 bg-white border-2 border-black rounded-xl font-bold font-display shadow-retro hover:shadow-retro-hover hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-retro-hover active:translate-x-0.5 active:translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:active:translate-x-0 disabled:active:translate-y-0"
      >
        <span className="fill-primary">
          <img
            src="/navbar/language.svg"
            alt="Language"
            className="sm:w-8 sm:h-8 w-6 h-6 text-primary object-contain"
          />
        </span>
        <span className="text-lg">{currentLanguage?.name || "English"}</span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 left-0 w-full bg-white border-2 border-black rounded-xl shadow-retro overflow-hidden z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`w-full px-4 py-3 text-left font-bold font-display text-lg hover:bg-gray-100 transition-colors ${
                locale === lang.code ? "bg-gray-50 text-primary" : ""
              }`}
            >
              {lang.name}
              {locale === lang.code && (
                <span className="ml-2 text-primary">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
