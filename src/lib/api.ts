const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export interface Question {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
  }[];
}

export interface QuizAttemptResponse {
  id: string;
  score: number;
  percentage: number;
  passed: boolean;
}

export interface QuizResult {
  id: string;
  name: string;
  district: string;
  ageGroup: string;
  score: number;
  percentage: number;
  passed: boolean;
  createdAt: string;
  results: {
    question: {
      id: string;
      text: string;
      explanation: string;
    };
    selectedOption: {
      id: string;
      text: string;
    } | null;
    correctOption: {
      id: string;
      text: string;
    } | null;
    isCorrect: boolean;
  }[];
  hasCertificate: boolean;
}

export async function getQuizQuestions(): Promise<Question[]> {
  const response = await fetch(`${API_URL}/quiz/questions`);
  if (!response.ok) {
    throw new Error("Failed to fetch questions");
  }
  return response.json();
}

export async function submitQuizAttempt(
  name: string,
  district: string,
  ageGroup: string,
  answers: { questionId: string; optionId: string }[]
): Promise<QuizAttemptResponse> {
  const response = await fetch(`${API_URL}/quiz/attempt`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, district, ageGroup, answers }),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to submit quiz attempt");
  }
  return response.json();
}

export async function getQuizResults(attemptId: string): Promise<QuizResult> {
  const response = await fetch(`${API_URL}/quiz/attempt/${attemptId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch quiz results");
  }
  return response.json();
}

export function getCertificateUrl(attemptId: string): string {
  return `${API_URL}/certificate/${attemptId}`;
}
