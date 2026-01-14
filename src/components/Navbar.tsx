"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageToggle from "./LanguageToggle";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

const Navbar = () => {
  const t = useTranslations("navbar");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    {
      lable: t("home"),
      href: "/",
    },
    {
      lable: t("quizzes"),
      href: "/quizzes",
    },
    {
      lable: t("quick-tools"),
      href: "/quick-tools",
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
      <nav className="fixed top-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6 z-50 w-full">
        {/* Mobile: Logo and Language Toggle Row */}
        <div className="flex md:hidden items-center justify-between w-full mb-0">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-full border-4 border-black flex items-center justify-center shadow-retro">
              <img
                src="/navbar/how_to_vote.svg"
                alt="VoteSmart BD"
                className="w-6 h-6 object-contain"
              />
            </div>
            <h1 className="font-display font-bold text-lg tracking-tight">
              VoteSmart BD
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <LanguageToggle />
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 bg-white border-2 border-black rounded-xl shadow-retro hover:shadow-retro-hover hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-retro-hover active:translate-x-0.5 active:translate-y-0.5 transition-all"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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

        {/* Desktop: Original 3-column layout */}
        <div className="hidden md:flex justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 bg-primary rounded-full border-4 border-black flex items-center justify-center shadow-retro">
              <img
                src="/navbar/how_to_vote.svg"
                alt="VoteSmart BD"
                className="w-8 h-8 object-contain"
              />
            </div>
            <h1 className="font-display font-bold text-2xl tracking-tight">
              VoteSmart BD
            </h1>
          </div>

          <div className="flex flex-wrap justify-center gap-3 bg-white p-2 rounded-2xl border-2 border-black shadow-retro">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-xl font-bold font-display text-base hover:bg-gray-800 hover:text-white transition-colors ${
                  pathname === item.href ? "bg-gray-900 text-white" : ""
                }`}
              >
                {item.lable}
              </Link>
            ))}
          </div>

          <LanguageToggle />
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          isSidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Sidebar */}
        <div
          className={`absolute top-0 left-0 h-full w-80 max-w-[85vw] bg-background-light border-r-2 border-black shadow-retro transform transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 pt-20">
            <div className="flex flex-col gap-4">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`px-6 py-4 rounded-xl font-bold font-display text-lg border-2 border-black shadow-retro hover:shadow-retro-hover hover:translate-x-1 hover:translate-y-1 active:shadow-retro-hover active:translate-x-1 active:translate-y-1 transition-all ${
                    pathname === item.href
                      ? "bg-gray-900 text-white"
                      : "bg-white"
                  }`}
                >
                  {item.lable}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
