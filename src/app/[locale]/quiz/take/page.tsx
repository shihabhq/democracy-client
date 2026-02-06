"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { getQuizQuestions, submitQuizAttempt, Question } from "@/lib/api";

type Step = "info" | "quiz" | "submitting";

export default function TakeQuizPage() {
  const t = useTranslations("Quiz");
  const router = useRouter();
  const [step, setStep] = useState<Step>("info");
  const [name, setName] = useState("");
  const [district, setDistrict] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState("");

  const handleStart = async () => {
    if (!name.trim() || !district.trim()) {
      setError(t("enterNameAndDistrict"));
      return;
    }
    setError("");
    try {
      const fetchedQuestions = await getQuizQuestions();
      setQuestions(fetchedQuestions);
      setStep("quiz");
    } catch {
      setError(t("failedToLoadQuestions"));
    }
  };

  const handleAnswerSelect = (optionId: string) => {
    const questionId = questions[currentQuestionIndex].id;
    setAnswers({ ...answers, [questionId]: optionId });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleFinish = async () => {
    if (Object.keys(answers).length !== questions.length) {
      setError(t("answerAllQuestions"));
      return;
    }

    setStep("submitting");
    setError("");

    try {
      const answerArray = questions.map((q) => ({
        questionId: q.id,
        optionId: answers[q.id],
      }));

      const result = await submitQuizAttempt(name, district, answerArray);
      router.push(`/quiz/results/${result.id}`);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : t("failedToSubmitQuiz")
      );
      setStep("quiz");
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = currentQuestion
    ? answers[currentQuestion.id]
    : undefined;

  if (step === "info") {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white border-2 border-black rounded-2xl shadow-retro p-6 sm:p-8">
          <h1 className="font-display font-black text-3xl sm:text-4xl mb-6 text-center">
            {t("title")}
          </h1>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block font-display font-bold text-lg mb-2">
                {t("name")}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("enterName")}
                className="w-full px-4 py-3 border-2 border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block font-display font-bold text-lg mb-2">
                {t("district")}
              </label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder={t("enterDistrict")}
                className="w-full px-4 py-3 border-2 border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border-2 border-red-500 rounded-xl text-red-700">
              {error}
            </div>
          )}

          <button
            onClick={handleStart}
            className="w-full px-6 py-4 bg-accent text-black font-display font-bold text-lg rounded-xl border-2 border-black shadow-retro hover:shadow-retro-hover hover:translate-x-1 hover:translate-y-1 active:shadow-retro-hover active:translate-x-1 active:translate-y-1 transition-all"
          >
            {t("start")}
          </button>
        </div>
      </div>
    );
  }

  if (step === "submitting") {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white border-2 border-black rounded-2xl shadow-retro p-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-lg font-medium">{t("submittingQuiz")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white border-2 border-black rounded-2xl shadow-retro p-6 sm:p-8">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="font-display font-bold">
              {t("question")} {currentQuestionIndex + 1} {t("of")}{" "}
              {questions.length}
            </span>
            <span className="text-sm text-gray-600">
              {Math.round(
                ((currentQuestionIndex + 1) / questions.length) * 100
              )}
              %
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all"
              style={{
                width: `${
                  ((currentQuestionIndex + 1) / questions.length) * 100
                }%`,
              }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h2 className="font-display font-bold text-2xl sm:text-3xl mb-6">
            {currentQuestion?.text}
          </h2>

          <div className="space-y-3">
            {currentQuestion?.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleAnswerSelect(option.id)}
                className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${
                  currentAnswer === option.id
                    ? "bg-primary text-white border-primary shadow-retro"
                    : "bg-white border-black hover:bg-gray-50"
                }`}
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border-2 border-red-500 rounded-xl text-red-700">
            {error}
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="px-6 py-3 bg-white text-black font-display font-bold rounded-xl border-2 border-black shadow-retro hover:shadow-retro-hover hover:translate-x-1 hover:translate-y-1 active:shadow-retro-hover active:translate-x-1 active:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:active:translate-x-0 disabled:active:translate-y-0"
          >
            {t("previous")}
          </button>

          {currentQuestionIndex === questions.length - 1 ? (
            <button
              onClick={handleFinish}
              className="px-6 py-3 bg-accent text-black font-display font-bold rounded-xl border-2 border-black shadow-retro hover:shadow-retro-hover hover:translate-x-1 hover:translate-y-1 active:shadow-retro-hover active:translate-x-1 active:translate-y-1 transition-all"
            >
              {t("finish")}
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!currentAnswer}
              className="px-6 py-3 bg-primary text-white font-display font-bold rounded-xl border-2 border-primary shadow-retro hover:shadow-retro-hover hover:translate-x-1 hover:translate-y-1 active:shadow-retro-hover active:translate-x-1 active:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:active:translate-x-0 disabled:active:translate-y-0"
            >
              {t("next")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
