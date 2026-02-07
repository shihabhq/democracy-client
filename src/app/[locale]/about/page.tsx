"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";

export default function AboutPage() {
  const t = useTranslations("About");

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero */}
      <header className="text-center mb-12 sm:mb-16">
        <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-gray-900 mb-4">
          {t("title")}
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          {t("subtitle")}
        </p>
      </header>

      {/* Mission */}
      <section className="mb-10 sm:mb-14">
        <div className="bg-white border-2 border-black rounded-2xl shadow-retro p-6 sm:p-8">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-primary mb-4">
            {t("missionTitle")}
          </h2>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
            {t("mission")}
          </p>
        </div>
      </section>

      {/* What We Do */}
      <section className="mb-10 sm:mb-14">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-gray-900 mb-6">
          {t("whatWeDoTitle")}
        </h2>
        <div className="grid sm:grid-cols-1 gap-4">
          <div className="bg-white border-2 border-black rounded-2xl shadow-retro p-5 sm:p-6 flex items-start gap-4">
            <span className="shrink-0 w-10 h-10 rounded-xl bg-primary text-white font-display font-bold flex items-center justify-center text-lg">
              1
            </span>
            <p className="text-gray-700 text-base sm:text-lg pt-1">
              {t("whatWeDo1")}
            </p>
          </div>
          <div className="bg-white border-2 border-black rounded-2xl shadow-retro p-5 sm:p-6 flex items-start gap-4">
            <span className="shrink-0 w-10 h-10 rounded-xl bg-primary text-white font-display font-bold flex items-center justify-center text-lg">
              2
            </span>
            <p className="text-gray-700 text-base sm:text-lg pt-1">
              {t("whatWeDo2")}
            </p>
          </div>
          <div className="bg-white border-2 border-black rounded-2xl shadow-retro p-5 sm:p-6 flex items-start gap-4">
            <span className="shrink-0 w-10 h-10 rounded-xl bg-primary text-white font-display font-bold flex items-center justify-center text-lg">
              3
            </span>
            <p className="text-gray-700 text-base sm:text-lg pt-1">
              {t("whatWeDo3")}
            </p>
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="mb-10 sm:mb-14">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-gray-900 mb-6">
          {t("valuesTitle")}
        </h2>
        <div className="space-y-4">
          <div className="bg-paper-green border-2 border-black rounded-2xl shadow-retro p-5 sm:p-6">
            <p className="font-display font-bold text-lg text-gray-900">
              {t("values1")}
            </p>
          </div>
          <div className="bg-paper-blue border-2 border-black rounded-2xl shadow-retro p-5 sm:p-6">
            <p className="font-display font-bold text-lg text-gray-900">
              {t("values2")}
            </p>
          </div>
          <div className="bg-paper-pink border-2 border-black rounded-2xl shadow-retro p-5 sm:p-6">
            <p className="font-display font-bold text-lg text-gray-900">
              {t("values3")}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <p className="font-display font-bold text-xl sm:text-2xl text-gray-900 mb-6">
          {t("cta")}
        </p>
        <Link
          href="/quiz/take"
          className="inline-block px-8 py-4 bg-accent text-black font-display font-bold text-lg rounded-2xl border-2 border-black shadow-retro hover:shadow-retro-hover hover:translate-x-1 hover:translate-y-1 active:shadow-retro-hover active:translate-x-1 active:translate-y-1 transition-all"
        >
          {t("ctaButton")}
        </Link>
      </section>
    </div>
  );
}
