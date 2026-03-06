"use client";

import { useState } from "react";
import { Actor } from "../services/actorService";
import ActorForm from "../ui/ActorForm";
import ActorCard from "../ui/ActorCard";

export default function CreateActorPage() {
  const [createdActors, setCreatedActors] = useState<Actor[]>([]);

  function handleActorCreated(newActor: Actor) {
    setCreatedActors((prev) => [newActor, ...prev]);
  }

  return (
    <main>
      <h1>Create Actor</h1>
      <ActorForm onActorCreated={handleActorCreated} />

      {createdActors.length > 0 && (
        <section>
          <h2>Recently Added</h2>
          {createdActors.map((actor) => (
            <ActorCard key={actor.id} actor={actor} />
          ))}
        </section>
      )}
    </main>
  );
}