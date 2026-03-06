"use client";

import { useEffect } from "react";
import ActorCard from "./ActorCard";
import { useActorStore } from "@/shared/store/useActorStore";

export default function ActorList() {
  const { actors, loading, loadActors, removeActor } = useActorStore();

  useEffect(() => {
    loadActors();
  }, [loadActors]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="actors-container">
      <div className="actors-grid">
        {actors.map((actor) => (
          <ActorCard 
            key={actor.id} 
            actor={actor}
            onDelete={removeActor}/>
        ))}
      </div>
    </div>
  );
}
