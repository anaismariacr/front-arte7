//src/modules/actors/services/actorService.ts
import { fetcher } from "@/shared/services/http";
import { Actor } from "@/modules/actors/services/actorService";

export interface Movie {
  id: string;
  title: string;
  poster: string;
  duration: number;
  country: string;
  releaseDate: string;
  popularity: number;
  director: string;
  actors: Actor[];
}

export const fetchMovies = (): Promise<Movie[]> => {
  // We call the GET /services endpoint.
  // The fetcher takes care of the base URL and error handling.
  return fetcher<Movie[]>("/api/v1/movies");
};

export const fetchMovieById = (id: string): Promise<Movie> => {
  return fetcher<Movie>(`/api/v1/movies/${id}`);
};

/*export const createMovie = (payload: CreateMoviePayload): Promise<Movie> => {
  return fetcher<Movie>("/api/v1/movies", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};

export const updateActor = (id: string, payload: CreateActorPayload): Promise<Actor> => {
  console.log("UPDATING ACTOR", id, payload);
  return fetcher<Actor>(`/api/v1/actors/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};

export const deleteActor = (id: string): Promise<void> => {
  return fetcher<void>(`/api/v1/actors/${id}`, {
    method: "DELETE",
  });
};

export const fetchActorById = (id: string): Promise<Actor> => {
  return fetcher<Actor>(`/api/v1/actors/${id}`);
};*/