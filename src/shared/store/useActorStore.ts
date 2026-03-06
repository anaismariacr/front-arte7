import { create } from "zustand";
import { Actor, fetchActors, deleteActor, updateActor, CreateActorPayload } from "@/modules/actors/services/actorService";

interface ActorState {
  actors: Actor[];
  loading: boolean;

  //actions que tiene el store
  loadActors: () => Promise<void>;
  removeActor: (id: string) => Promise<void>;
  editActor: (id: string, data: CreateActorPayload) => Promise<void>;
}

export const useActorStore = create<ActorState>((set) => ({
  //initial state
  actors: [],
  loading: false,

  //llama fetch actors del servicio y setea el estado de actors y loading
  loadActors: async () => {
    set({ loading: true });
    const actors = await fetchActors();
    set({ actors, loading: false, });
  },

  //llama remove actor del servicio
  //actualiza estado de actors filtrando el eliminado
  removeActor: async (id: string) => {
    await deleteActor(id);
    set((state) => ({
      actors: state.actors.filter((actor) => actor.id !== id),
    }));
  },
  
  //llama update actor del servicio
  //actualiza el estado de actors mapeando el actualizado
  editActor: async (id, data) => {
    const updated = await updateActor(id, data);

    set((state) => ({
      actors: state.actors.map((actor) =>
        actor.id === id ? updated : actor
      ),
    }));
  },
}));