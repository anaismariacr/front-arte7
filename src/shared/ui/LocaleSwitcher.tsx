"use client";

import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { AppLocale, locales } from "@/i18n/routing";

function stripLocalePrefix(pathname: string, locale: string) {
  if (pathname === `/${locale}`) {
    return "/";
  }

  const prefix = `/${locale}/`;

  if (pathname.startsWith(prefix)) {
    return pathname.slice(locale.length + 1);
  }

  return pathname;
}

export default function LocaleSwitcher() {
  const locale = useLocale();
  const t = useTranslations("nav");
  const pathname = usePathname();
  const localizedPath = pathname ? stripLocalePrefix(pathname, locale) : "/";

  return (
    <div className="flex items-center gap-2" aria-label={t("languageSwitcher")}>
      {locales.map((targetLocale) => {
        const isActive = targetLocale === locale;
        const ariaLabel =
          targetLocale === "en" ? t("switchToEnglish") : t("switchToSpanish");

        return (
          <Link
            key={targetLocale}
            href={localizedPath}
            locale={targetLocale as AppLocale}
            aria-label={ariaLabel}
            aria-current={isActive ? "true" : undefined}
            className={isActive ? "font-bold underline" : "opacity-80"}
          >
            {targetLocale.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
