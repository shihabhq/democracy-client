"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { getQuizResults, getCertificateUrl, QuizResult } from "@/lib/api";
import { GENDER_LABEL_KEYS } from "@/lib/constants";
import type { Gender } from "@/lib/constants";
import Link from "next/link";

export default function QuizResultsPage() {
  const t = useTranslations("Quiz");
  const params = useParams();
  const attemptId = params.id as string;
  const [results, setResults] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    async function fetchResults() {
      try {
        const data = await getQuizResults(attemptId);
        setResults(data);
      } catch {
        setError("Failed to load results");
      } finally {
        setLoading(false);
      }
    }
    fetchResults();
  }, [attemptId]);

const handleDownloadCertificate = async () => {
  setDownloadError(null);
  setDownloading(true);

  const url = await getCertificateUrl(attemptId);

  // Open in a new tab
  window.open(url, "_blank", "noopener,noreferrer");

  // Optional UX cleanup
  setTimeout(() => setDownloading(false), 1000);
};


  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white border-2 border-black rounded-2xl shadow-retro p-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-lg font-medium">Loading results...</p>
        </div>
      </div>
    );
  }

  if (error || !results) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white border-2 border-black rounded-2xl shadow-retro p-8 text-center">
          <p className="text-red-600 mb-4">{error || "Results not found"}</p>
          <Link
            href="/quizzes"
            className="inline-block px-6 py-3 bg-primary text-white font-display font-bold rounded-xl border-2 border-primary shadow-retro hover:shadow-retro-hover hover:translate-x-1 hover:translate-y-1 active:shadow-retro-hover active:translate-x-1 active:translate-y-1 transition-all"
          >
            Back to Quizzes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Summary Card */}
      <div className="bg-white border-2 border-black rounded-2xl shadow-retro p-6 sm:p-8 mb-8">
        <div className="text-center mb-6">
          <h1 className="font-display font-black text-3xl sm:text-4xl mb-4">
            {results.passed ? t("congratulations") : t("betterLuck")}
          </h1>
          <p className="text-lg text-gray-600">
            {results.name} · {results.district} · {results.ageGroup}
            {results.gender
              ? ` · ${GENDER_LABEL_KEYS[results.gender as Gender] ? t(GENDER_LABEL_KEYS[results.gender as Gender]) : results.gender}`
              : ""}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-xl border-2 border-gray-200">
            <div className="text-sm text-gray-600 mb-1">{t("score")}</div>
            <div className="font-display font-bold text-2xl">
              {results.score}/20
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl border-2 border-gray-200">
            <div className="text-sm text-gray-600 mb-1">{t("percentage")}</div>
            <div className="font-display font-bold text-2xl">
              {results.percentage.toFixed(1)}%
            </div>
          </div>
        </div>

        {downloadError && (
          <div className="mb-4 p-3 bg-red-100 border-2 border-red-500 rounded-xl text-red-700 text-sm">
            {downloadError}
          </div>
        )}
        {results.passed ? (
          <button
            type="button"
            onClick={handleDownloadCertificate}
            disabled={downloading}
            className="w-full px-6 py-4 bg-accent text-white font-display font-bold text-lg rounded-xl border-2 border-black shadow-retro hover:shadow-retro-hover hover:translate-x-1 hover:translate-y-1 active:shadow-retro-hover active:translate-x-1 active:translate-y-1 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {downloading
              ? t("downloadingCertificate")
              : t("downloadCertificate")}
          </button>
        ) : (
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
            <p className="font-medium text-blue-900">
              {t("learningMaterials")}
            </p>
            <p className="text-sm text-blue-700 mt-2">
              Keep learning and try again to earn your certificate!
            </p>
          </div>
        )}
      </div>

      {/* Detailed Results */}
      <div className="space-y-4">
        <h2 className="font-display font-bold text-2xl mb-4">
          {t("viewResults")}
        </h2>

        {results.results.map((result, index) => (
          <div
            key={result.question.id}
            className="bg-white border-2 border-black rounded-2xl shadow-retro p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-display font-bold text-xl flex-1">
                {index + 1}. {result.question.text}
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-sm font-bold ${
                  result.isCorrect
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {result.isCorrect ? "✓" : "✗"}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div>
                <div className="text-sm font-medium text-gray-600 mb-1">
                  {t("yourAnswer")}:
                </div>
                <div
                  className={`p-3 rounded-xl border-2 ${
                    result.isCorrect
                      ? "bg-green-50 border-green-200"
                      : "bg-red-50 border-red-200"
                  }`}
                >
                  {result.selectedOption?.text || "No answer"}
                </div>
              </div>

              {!result.isCorrect && result.correctOption && (
                <div>
                  <div className="text-sm font-medium text-gray-600 mb-1">
                    {t("correctAnswer")}:
                  </div>
                  <div className="p-3 rounded-xl border-2 bg-green-50 border-green-200">
                    {result.correctOption.text}
                  </div>
                </div>
              )}
            </div>

            {result.question.explanation?.trim() && (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                <div className="text-sm font-medium text-blue-900 mb-1">
                  {t("explanation")}:
                </div>
                <div className="text-blue-800">
                  {result.question.explanation}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/quizzes"
          className="inline-block px-6 py-3 bg-primary text-white font-display font-bold rounded-xl border-2 border-primary shadow-retro hover:shadow-retro-hover hover:translate-x-1 hover:translate-y-1 transition-all"
        >
          Back to Quizzes
        </Link>
      </div>
    </div>
  );
}
