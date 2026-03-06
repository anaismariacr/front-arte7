"use client";

import { useEffect } from "react";
import MovieCard from "../ui/MovieCard";
import { useMovieStore } from "@/shared/store/useMovieStore";

export default function MovieList() {
  const { movies, loading, loadMovies} = useMovieStore();

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  if (loading) return <p>Loading...</p>;

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