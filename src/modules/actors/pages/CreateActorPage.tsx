"use client";

import { useState } from "react";
import ActorForm from "../ui/ActorForm";
import { ActorFormData } from "../validation/actorFormSchema";
import { createActor } from "../services/actorService";

export default function CreateActorPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateActor = async (data: ActorFormData) => {
    setIsSubmitting(true);
    console.log("Data to submit:", data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await createActor(data);
    console.log("Actor created successfully");
    setIsSubmitting(false);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Crear Nuevo Servicio</h1>
      <ActorForm onSubmit={handleCreateActor} isSubmitting={isSubmitting} />
    </div>
  );
}

/*"use client";

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
}*/