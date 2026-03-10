"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import MovieCard from "../ui/MovieCard";
import { useMovieStore } from "@/shared/store/useMovieStore";

export default function MovieList() {
  const t = useTranslations("common");
  const { movies, loading, loadMovies} = useMovieStore();

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  if (loading) return <p>{t("loading")}</p>;

  return (
    <div className="actors-container">
      <div className="actors-grid">
        {movies.map((movie) => (
          <MovieCard 
            key={movie.id} 
            movie={movie}
            />
        ))}
      </div>
    </div>
  );
}
//onDelete={removeActor}
