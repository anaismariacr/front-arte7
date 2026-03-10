import { createNavigation } from "next-intl/navigation";
import { defaultLocale, locales } from "./routing";

export const { Link, useRouter, usePathname, redirect, getPathname } =
  createNavigation({
    locales,
    defaultLocale,
  });
