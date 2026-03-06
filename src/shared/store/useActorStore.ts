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

  loadActors: async () => {
    set({ loading: true });

    const actors = await fetchActors();

    set({
      actors,
      loading: false,
    });
  },

  removeActor: async (id: string) => {
    await deleteActor(id);

    set((state) => ({
      actors: state.actors.filter((actor) => actor.id !== id),
    }));
  },

  editActor: async (id, data) => {
    const updated = await updateActor(id, data);

    set((state) => ({
      actors: state.actors.map((actor) =>
        actor.id === id ? updated : actor
      ),
    }));
  },
}));