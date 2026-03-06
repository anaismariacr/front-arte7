import { Movie } from "../services/movieService";

interface Props {
  movie: Movie;
}

export default function MovieDetail({ movie }: Props) {
    return(
        <div>
            <h1>{movie.title}</h1>
            <img src={movie.poster} alt={movie.title} />
            <p>Duration: {movie.duration} minutes</p>
            <p>Country: {movie.country}</p>
            <p>Release Date: {movie.releaseDate}</p>
            <p>Popularity: {movie.popularity}</p>
            <p>Director: {movie.director}</p>
            <h2>Actors:</h2>
            <ul>
                {movie.actors.map((actor) => (
                    <li key={actor.id}>{actor.name}</li>
                ))}
            </ul>
        </div>
    )
    
}