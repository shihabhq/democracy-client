"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageToggle from "./LanguageToggle";



const Navbar = () => {
    const navLinks = [
      {
        lable: "Home",
        href: "/",
      },
      {
        lable: "Quizzes",
        href: "/quizzes",
      },
      {
        lable: "Quick Tools",
        href: "/quick-tools",
      },
    ];
  const pathname = usePathname();
  return (
    <nav className="flex fixed top-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 z-50 flex-col md:flex-row justify-between items-center mb-12 gap-4">
      <div className="flex items-center gap-2">
        <div className="w-12 h-12 bg-primary rounded-full border-4 border-black flex items-center justify-center shadow-retro">
          <img
            src="/navbar/how_to_vote.svg"
            alt="VoteSmart BD"
            className="w-8 h-8 object-contain "
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
            className={`px-4 py-2 rounded-xl font-bold font-display hover:bg-gray-800 hover:text-white transition-colors ${
              pathname === item.href ? "bg-gray-900 text-white" : ""
            }`}
          >
            {item.lable}
          </Link>
        ))}
      </div>

      <LanguageToggle />
    </nav>
  );
};

export default Navbar;
