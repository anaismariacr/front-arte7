import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "./LocaleSwitcher";

export default function Navbar() {
  const t = useTranslations("nav");

  return (
    <div className="navbar px-6 py-4">
      <nav className="flex items-center gap-4" aria-label={t("mainNavigation")}>
        <Link href="/actors" aria-label={t("actors")}>
          {t("actors")}
        </Link>
        <Link href="/crear" aria-label={t("createActor")}>
          {t("createActor")}
        </Link>
        <Link href="/movies" aria-label={t("movies")}>
          {t("movies")}
        </Link>
        <LocaleSwitcher />
      </nav>
    </div>
  );
}
