import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "./LocaleSwitcher";

export default function Navbar() {
  const t = useTranslations("nav");

  return (
    <div className="navbar px-6 py-4">
      <nav className="flex items-center gap-4">
        <Link href="/">{t("home")}</Link>
        <Link href="/actors">{t("actors")}</Link>
        <Link href="/crear">{t("createActor")}</Link>
        <Link href="/movies">{t("movies")}</Link>
        <LocaleSwitcher />
      </nav>
    </div>
  );
}
