import MovieList from "@/modules/movies/ui/MovieList";
import { useTranslations } from "next-intl";

export default function MoviesPage() {
  const t = useTranslations("movies");

  return (
    <main>
      <h1>{t("pageTitle")}</h1>
      <MovieList />
    </main>
  );
}
