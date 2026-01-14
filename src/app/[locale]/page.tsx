import { useTranslations } from "next-intl";
import Link from "next/link";

export default function HomePage() {
  const t = useTranslations("Home");
  return (
    <>
      <header className="text-center mb-16 relative">
        <div className="inline-block bg-accent px-4 py-1 rounded-full border-2 border-black mb-6 -rotate-2 shadow-retro">
          <span className="font-display font-bold text-sm uppercase">
            {t("label")}
          </span>
        </div>

        <h2 className="font-display font-black text-4xl sm:text-5xl md:text-7xl mb-4 leading-tight">
          {t("title")}
          <br />
          <span className="text-primary relative inline-block">
            {t("subtitle")}
            <svg
              className="absolute w-full h-3 -bottom-1 left-0 text-accent -z-10"
              viewBox="0 0 100 10"
              preserveAspectRatio="none"
            >
              <path
                d="M0 5 Q 50 10 100 5"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
              />
            </svg>
          </span>
        </h2>

        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 font-medium max-w-2xl mx-auto mb-10">
          {t("description")}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link href="/quiz/take">
            <HeroButton
              label={t("quiz")}
              icon="quiz"
              bg="bg-accent text-black"
            />
          </Link>
        </div>
      </header>

      {/* Additional Sections */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white border-2 border-black rounded-2xl shadow-retro p-6">
          <h3 className="font-display font-bold text-2xl mb-3">
            {t("learnPractice")}
          </h3>
          <p className="text-gray-600 mb-4">{t("learnPracticeDescription")}</p>
          <Link
            href="/quizzes"
            className="inline-block px-4 py-2 bg-primary text-white font-display font-bold rounded-xl border-2 border-primary shadow-retro hover:shadow-retro-hover hover:translate-x-1 hover:translate-y-1 active:shadow-retro-hover active:translate-x-1 active:translate-y-1 transition-all"
          >
            {t("exploreQuizzes")}
          </Link>
        </div>

        <div className="bg-white border-2 border-black rounded-2xl shadow-retro p-6">
          <h3 className="font-display font-bold text-2xl mb-3">
            {t("earnCertificates")}
          </h3>
          <p className="text-gray-600 mb-4">
            {t("earnCertificatesDescription")}
          </p>
          <Link
            href="/quiz/take"
            className="inline-block px-4 py-2 bg-accent text-black font-display font-bold rounded-xl border-2 border-black shadow-retro hover:shadow-retro-hover hover:translate-x-1 hover:translate-y-1 active:shadow-retro-hover active:translate-x-1 active:translate-y-1 transition-all"
          >
            {t("startQuiz")}
          </Link>
        </div>
      </div>
    </>
  );
}

function HeroButton({
  label,
  bg,
}: {
  label: string;
  icon?: string;
  bg: string;
}) {
  return (
    <button
      className={`group px-6 sm:px-8 cursor-pointer py-3 sm:py-4 ${bg} font-display font-bold text-lg sm:text-xl rounded-2xl border-2 border-black shadow-retro hover:shadow-retro-hover hover:translate-x-1 hover:translate-y-1 active:shadow-retro-hover active:translate-x-1 active:translate-y-1 transition-all`}
    >
      <span className="flex items-center justify-center gap-2">
        {label}
        {/* <span className="material-symbols-rounded">{icon}</span> */}
      </span>
    </button>
  );
}
