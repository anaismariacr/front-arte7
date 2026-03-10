"use client";

import { useLocale, useTranslations } from "next-intl";
import { Movie } from "../services/movieService";

interface Props {
  movie: Movie;
}

export default function MovieDetail({ movie }: Props) {
    const locale = useLocale();
    const t = useTranslations("movies");
    const formatLocale = locale === "es" ? "es-CO" : "en-US";

    return(
        <div>
            <h1>{movie.title}</h1>
            <p>{t("duration")}: {movie.duration} {t("minutes")}</p>
            <p>{t("country")}: {movie.country}</p>
            <p>{t("releaseDate")}: {new Date(movie.releaseDate).toLocaleDateString(formatLocale)}</p>
            <p>{t("popularity")}: {movie.popularity}</p>
            <p>{t("director")}: {movie.director}</p>
            <h2>{t("actors")}:</h2>
            <ul>
                {movie.actors.map((actor) => (
                    <li key={actor.id}>{actor.name}</li>
                ))}
            </ul>
        </div>
    )
    
}
