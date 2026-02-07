import { useTranslations } from "next-intl";
import Link from "next/link";

export default function HomePage() {
  const t = useTranslations("Home");
  return (
    <>
      <header className="text-center mb-8 relative">
        {/* <div className="inline-block bg-accent px-4 py-1 rounded-full border-2 border-black mb-6 -rotate-2 shadow-retro">
          <span className="font-display font-bold text-sm uppercase">
            {t("label")}
          </span>
        </div> */}

        <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl leading-tight">
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

        <div className="max-w-3xl py-6 md:py-2 mx-auto">
          <img
            src="https://ik.imagekit.io/bua2b1x6j/kashful/ballot-box.png"
            alt=""
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link href="/quiz/take">
            <HeroButton
              label={t("quiz")}
              icon="quiz"
              bg="bg-red-600 text-white"
            />
          </Link>
        </div>
      </header>
      <p className="text-lg text-center sm:text-xl md:text-2xl text-primary font-bold max-w-xl mx-auto">
        {t("description")}
      </p>
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
      className={`group px-6 sm:px-8 cursor-pointer py-3 ${bg} font-display font-bold text-xl sm:text-2xl rounded-2xl border-2 border-black shadow-retro hover:shadow-retro-hover hover:translate-x-1 hover:translate-y-1 active:shadow-retro-hover active:translate-x-1 active:translate-y-1 transition-all`}
    >
      <span className="flex items-center justify-center gap-2">
        {label}
        {/* <span className="material-symbols-rounded">{icon}</span> */}
      </span>
    </button>
  );
}
