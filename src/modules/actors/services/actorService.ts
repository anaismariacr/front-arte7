//src/modules/actors/services/actorService.ts
import { fetcher } from "@/shared/services/http";

//temp
export interface Movie {
  id: string;
  title: string;
  poster: string;
  duration: number;
  country: string;
  releaseDate: string;
  popularity: number;
}

export interface Actor {
  id: string;
  name: string;
  photo: string;
  nationality: string;
  birthDate: string;
  biography: string;
  movies: Movie[];
}

export interface CreateActorPayload {
  name: string;
  photo: string;
  nationality: string;
  birthDate: string;
  biography: string;
}

export const fetchActors = (): Promise<Actor[]> => {
  // We call the GET /services endpoint.
  // The fetcher takes care of the base URL and error handling.
  return fetcher<Actor[]>("/api/v1/actors");
};

export const createActor = (payload: CreateActorPayload): Promise<Actor> => {
  return fetcher<Actor>("/api/v1/actors", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};

export const updateActor = (id: string, payload: CreateActorPayload): Promise<Actor> => {
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
};