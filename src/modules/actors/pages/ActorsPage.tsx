import ActorList from "@/modules/actors/ui/ActorList";
import { useTranslations } from "next-intl";

export default function ActorsPage() {
  const t = useTranslations("actors");

  return (
    <main>
      <h1>{t("pageTitle")}</h1>
      <ActorList />
    </main>
  );
}
