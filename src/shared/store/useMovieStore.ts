import { create } from "zustand";
import { Movie, fetchMovies } from "@/modules/movies/services/movieService";

interface MovieState {
  movies: Movie[];
  loading: boolean;

  //actions que tiene el store
  loadMovies: () => Promise<void>;
  //removeActor: (id: string) => Promise<void>;
  //editActor: (id: string, data: CreateActorPayload) => Promise<void>;
}

export const useMovieStore = create<MovieState>((set) => ({
  //initial state
  movies: [],
  loading: false,

  //llama fetch actors del servicio y setea el estado de actors y loading
  loadMovies: async () => {
    set({ loading: true });
    const movies = await fetchMovies();
    set({ movies, loading: false, });
  },

  //llama remove actor del servicio
  //actualiza estado de actors filtrando el eliminado
  /*removeActor: async (id: string) => {
    await deleteActor(id);
    set((state) => ({
      actors: state.actors.filter((actor) => actor.id !== id),
    }));
  },*/
  
  //llama update actor del servicio
  //actualiza el estado de actors mapeando el actualizado
  /*editActor: async (id, data) => {
    const updated = await updateActor(id, data);

    set((state) => ({
      actors: state.actors.map((actor) =>
        actor.id === id ? updated : actor
      ),
    }));
  },*/
}));