import { useTranslations } from "next-intl";

export default function LocalizedHomePage() {
  const t = useTranslations("home");

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{t("title")}</h1>
      <p>{t("description")}</p>
    </main>
  );
}
