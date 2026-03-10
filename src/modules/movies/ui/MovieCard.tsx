"use client";

import { useLocale, useTranslations } from "next-intl";
import { Movie } from "../services/movieService";

interface Props {
  movie: Movie;
}

export default function MovieCard({ movie }: Props) {
    const locale = useLocale();
    const t = useTranslations("movies");
    const formatLocale = locale === "es" ? "es-CO" : "en-US";

    return (
        <div className="actor-card">
            <div style={{ color: "black" }} >
                <h2>{ movie.title } </h2>
                <p>{t("releaseDate")}: { new Date(movie.releaseDate). toLocaleDateString(formatLocale, {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                })}</p>
                <p>{t("actors")}: {movie.actors.map((actor) => actor.name).join(", ")}</p>
            </div>
        </div>
    );
}
//date 'es-CO' para formato espanol
//date 'en-US para formato ingles
