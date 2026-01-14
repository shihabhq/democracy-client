"use client";

import { useTranslations } from "next-intl";

export default function QuickToolsPage() {
  const t = useTranslations("navbar");

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl mb-4">
          {t("quick-tools")}
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          Quick tools and resources coming soon
        </p>
      </div>

      <div className="bg-white border-2 border-black rounded-2xl shadow-retro p-8 text-center">
        <p className="text-gray-600">
          This page will contain tools like polling station finder, voter
          registration check, and more.
        </p>
      </div>
    </div>
  );
}
