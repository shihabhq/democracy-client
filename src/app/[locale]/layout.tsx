import Navbar from "@/components/Navbar";
import "../../styles/globals.css";
import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import {
  Hind_Siliguri,
  Fredoka,
  Nunito,
  Noto_Sans_Bengali,
} from "next/font/google";

// Default body font
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-body",
});

// English locale font
const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-locale",
});

// Bengali locale font
const notoSansBengali = Noto_Sans_Bengali({
  weight: ["300", "400", "600", "700"],
  subsets: ["bengali"],
  variable: "--font-locale",
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

  const localeFont = locale === "bn" ? notoSansBengali : fredoka;
  const fontClasses = `${nunito.variable} ${localeFont.variable}`;

  return (
    <html lang={locale} className={fontClasses}>
      <body className="bg-background-light text-gray-900 min-h-screen relative overflow-x-hidden selection:bg-accent selection:text-black">
        {/* Background grid */}
        <div className="fixed inset-0 grid-pattern pointer-events-none z-0 opacity-40" />
        <NextIntlClientProvider>
          <Navbar />

          {/* Page content */}
          <main className="relative mt-20 md:mt-24 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
