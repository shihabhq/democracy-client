import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("Home");
  return (
    <>
      {/* NAVBAR */}

      {/* HERO */}
      <header className="text-center mb-16 relative">
        <div className="inline-block bg-accent px-4 py-1 rounded-full border-2 border-black mb-6 -rotate-2 shadow-retro">
          <span className="font-display font-bold text-sm uppercase">
            For Future Leaders
          </span>
        </div>

        <h2 className="font-display font-black text-5xl md:text-7xl mb-4 leading-tight">
          {t("title")} <br />
          <span className="text-primary relative inline-block">
            in 5 Minutes
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

        <p className="text-xl md:text-2xl text-gray-600 font-medium max-w-2xl mx-auto mb-10">
          Take quizzes. Earn badges. Vote smart. Your voice matters in building
          a better tomorrow.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-6">
          <HeroButton
            label="Start First Quiz"
            icon="play_arrow"
            bg="bg-secondary text-white"
          />
          <HeroButton
            label="I'm Voting Soon—Help!"
            icon="waving_hand"
            bg="bg-paper-blue text-black"
          />
          <HeroButton
            label="Check What I Know"
            icon="quiz"
            bg="bg-accent text-black"
          />
        </div>
      </header>
    </>
  );
}

function HeroButton({
  label,
  icon,
  bg,
}: {
  label: string;
  icon: string;
  bg: string;
}) {
  return (
    <button
      className={`group px-8 py-4 ${bg} font-display font-bold text-xl rounded-2xl border-2 border-black shadow-retro hover:shadow-retro-hover hover:translate-x-1 hover:translate-y-1 transition-all`}
    >
      <span className="flex items-center justify-center gap-2">
        {label}
        <span className="material-symbols-rounded">{icon}</span>
      </span>
    </button>
  );
}
