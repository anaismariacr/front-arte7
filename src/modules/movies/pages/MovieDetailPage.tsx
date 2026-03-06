"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchMovieById, Movie } from "../services/movieService"
import MovieDetail from "../ui/MovieDetail";

export default function MovieDetailPage() {
    const [movie, setMovie] = useState< Movie | undefined>();
    const params = useParams();

    useEffect(() => {
      fetchMovieById(params.id as string).then((data) => {
        console.log("Fetched movie data:", data);
        setMovie({
          id: data.id,  
          title: data.title,
          poster: data.poster,
          duration: data.duration,
          country: data.country,
          releaseDate: data.releaseDate,
          popularity: data.popularity,
          director: data.director,
          actors: data.actors,
        });
      });
    }, [params.id]);

    if (!movie) return <p>Loading...</p>;

    return(
        <div>
            <MovieDetail movie={movie!} /> 
        </div>
    )
}
