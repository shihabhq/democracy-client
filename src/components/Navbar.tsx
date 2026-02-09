"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageToggle from "./LanguageToggle";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

const Navbar = () => {
  const t = useTranslations("navbar");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll(); // run once in case we're already scrolled
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    {
      lable: t("home"),
      href: "/",
    },
    {
      lable: t("quizzes"),
      href: "/quizzes",
    },
    // {
    //   lable: t("quick-tools"),
    //   href: "/quick-tools",
    // },
    {
      lable: t("about"),
      href: "/about",
    },
  ];

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSidebarOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 w-full px-4 py-3 sm:px-6 sm:py-4 lg:px-8 transition-[background,backdrop-filter] duration-300 ${
          isScrolled ? "bg-background-light/80 backdrop-blur-sm" : ""
        }`}
      >
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto min-w-0">
          {/* Mobile: logo, language, hamburger */}
          <div className="flex md:hidden items-center justify-between w-full min-w-0 gap-2">
            <Link href="/" className="shrink-0 flex items-center" aria-label="Home">
              <img
                src="https://ik.imagekit.io/bua2b1x6j/kashful/democracy.png"
                alt="VoteSmart BD"
                className="h-10 w-auto max-w-[165px] object-contain sm:h-12"
              />
            </Link>
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <LanguageToggle />
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-1 sm:p-2.5 sm:min-w-[44px] sm:min-h-[44px] min-w-[36px] min-h-[36px] flex items-center justify-center bg-white border-2 border-black rounded-xl shadow-retro hover:shadow-retro-hover active:shadow-retro-hover transition-all touch-manipulation"
                aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
                aria-expanded={isSidebarOpen}
              >
                <svg
                  className="w-6 h-6 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  {isSidebarOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Desktop / tablet: 3-column layout */}
          <div className="hidden md:flex w-full items-center justify-between gap-3 lg:gap-6 min-w-0">
            <Link href="/" className="shrink-0 flex items-center" aria-label="Home">
              <img
                src="/navbar/ddi.png"
                alt="Digital Democracy Initiative"
                className="h-10 w-auto max-w-[180px] object-contain md:max-w-[200px] lg:max-w-[224px]"
              />
            </Link>

            <div className="flex flex-wrap justify-center gap-2 lg:gap-3 bg-white p-1.5 sm:p-2 rounded-2xl border-2 border-black shadow-retro shrink-0 min-w-0 max-w-full">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-xl font-bold font-display text-sm sm:text-base hover:bg-primary hover:text-white transition-colors whitespace-nowrap ${
                    pathname === item.href ? "bg-primary text-white" : ""
                  }`}
                >
                  {item.lable}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4 lg:gap-6 shrink-0">
              <Link href="/" className="hidden sm:block" aria-label="My First Ballot">
                <img
                  src="/navbar/my-ballot.png"
                  alt="My First Ballot"
                  className="h-12 w-auto object-contain md:h-14 lg:h-16"
                />
              </Link>
              <LanguageToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile sidebar overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          isSidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpen(false)}
        aria-hidden={!isSidebarOpen}
      >
        <div className="absolute inset-0 bg-black/50" />

        <div
          className={`absolute top-0 left-0 h-full w-[min(20rem,85vw)] max-w-full bg-background-light border-r-2 border-black shadow-retro transform transition-transform duration-300 ease-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className="p-4 pt-20 pb-8 sm:p-6 overflow-y-auto h-full flex flex-col gap-3 sm:gap-4">
            <nav className="flex flex-col gap-3 sm:gap-4">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`px-5 py-4 rounded-xl font-bold font-display text-base sm:text-lg border-2 border-black shadow-retro hover:shadow-retro-hover active:shadow-retro-hover transition-all touch-manipulation min-h-[48px] flex items-center ${
                    pathname === item.href
                      ? "bg-gray-900 text-white"
                      : "bg-white"
                  }`}
                >
                  {item.lable}
                </Link>
              ))}
            </nav>
            <Link
              href="/"
              onClick={() => setIsSidebarOpen(false)}
              className=" flex items-center justify-center p-4 rounded-xl transition-all touch-manipulation"
              aria-label="My First Ballot"
            >
              <img
                src="/navbar/my-ballot.png"
                alt="My First Ballot"
                className="h-18 w-auto object-contain sm:h-16"
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
