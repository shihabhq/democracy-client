import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en", "bn"],
  defaultLocale: "bn",
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
