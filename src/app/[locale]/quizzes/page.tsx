"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";

export default function QuizzesPage() {
  const t = useTranslations("Quiz");

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl mb-4">
          {t("title")}
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          {t("description")}
        </p>
      </div>

      <div className="bg-white border-2 border-black rounded-2xl shadow-retro p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="font-display font-bold text-2xl mb-2">
              Democracy Knowledge Quiz
            </h2>
            <p className="text-gray-600">
              Test your knowledge about democracy, voting, and civic rights
            </p>
          </div>
          <Link
            href="/quiz/take"
            className="px-6 py-3 bg-accent text-black font-display font-bold text-lg rounded-xl border-2 border-black shadow-retro hover:shadow-retro-hover hover:translate-x-1 hover:translate-y-1 active:shadow-retro-hover active:translate-x-1 active:translate-y-1 transition-all whitespace-nowrap"
          >
            {t("start")}
          </Link>
        </div>
      </div>
    </div>
  );
}
