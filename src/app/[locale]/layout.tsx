import Navbar from "@/components/Navbar";
import "../../styles/globals.css";
import type { Metadata, Viewport } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Fredoka, Nunito, Noto_Sans_Bengali } from "next/font/google";
import Footer from "@/components/Footer";
import Script from "next/script";

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://votekori.cloud";

export const viewport: Viewport = {
  themeColor: "#0d9488",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Vote Kori – Learn Democracy & Vote Smart",
    template: "%s | Vote Kori",
  },
  description:
    "Take a short democracy quiz, earn a certificate, and vote smart. Your voice matters in building a better Bangladesh.",
  keywords: [
    "democracy",
    "voting",
    "Bangladesh",
    "civic education",
    "vote smart",
    "quiz",
    "certificate",
  ],
  authors: [{ name: "Vote Kori" }],
  creator: "Vote Kori",
  publisher: "Vote Kori",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    alternateLocale: "bn_BD",
    siteName: "Vote Kori",
    title: "Vote Kori – Learn Democracy & Vote Smart",
    description:
      "Take a short democracy quiz, earn a certificate, and vote smart. Your voice matters in building a better Bangladesh.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Vote Kori – Learn Democracy & Vote Smart",
    description:
      "Take a short democracy quiz, earn a certificate, and vote smart.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const localeFont = locale === "bn" ? notoSansBengali : fredoka;
  const fontClasses = `${nunito.variable} ${localeFont.variable}`;

  return (
    <html lang={locale} className={fontClasses}>
      <head>
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-QQT3T1S82V"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QQT3T1S82V');
          `}
        </Script>
      </head>
      <body className="text-gray-900 min-h-screen relative overflow-x-hidden selection:text-white selection:bg-primary">
        {/* Background grid */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-40" />
        <NextIntlClientProvider>
          <Navbar />

          {/* Page content */}
          <main className="relative mt-20 md:mt-24 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </main>

          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
