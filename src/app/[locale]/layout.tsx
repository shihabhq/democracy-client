import Navbar from "@/components/Navbar";
import "../../styles/globals.css";
import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Inter, Hind_Siliguri, Nunito } from "next/font/google";

// English font
const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-english",
});

// Bengali font
const hindSiliguri = Hind_Siliguri({
  weight: ["300", "400", "600", "700"],
  subsets: ["bengali"],
  variable: "--font-bengali",
});

export const metadata: Metadata = {
  title: "VoteSmart BD",
  description: "Democracy Practice Platform",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const fontClass = locale === "bn" ? hindSiliguri.variable : nunito.variable;

  return (
    <html lang={locale} className={fontClass}>
      <body
        style={{
          fontFamily:
            locale === "bn" ? "var(--font-bengali)" : "var(--font-english)",
        }}
        className="bg-background-light text-gray-900 min-h-screen relative overflow-x-hidden selection:bg-accent selection:text-black"
      >
        {/* Background grid */}
        <div className="fixed inset-0 grid-pattern pointer-events-none z-0 opacity-40" />
        <NextIntlClientProvider>
          <Navbar />

          {/* Page content */}
          <main className="relative mt-24 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
