"use client";

//import { useRouter }from "next/navigation";
import { Movie } from "../services/movieService";

interface Props {
  movie: Movie;
}

export default function MovieCard({ movie }: Props) {
    //const router = useRouter();

    return (
        <div className="actor-card">
            <div style={{ color: "black" }} >
                <h2>{ movie.title } </h2>
                <p>Release Date: { new Date(movie.releaseDate). toLocaleDateString('en-GB', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                })}</p>
                <p>Actor: {movie.actors.map((actor) => actor.name).join(", ")}</p>
            </div>
        </div>
    );
}
//date 'es-CO' para formato espanol
//date 'en-US para formato ingles
