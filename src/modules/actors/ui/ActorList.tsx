"use client";

import { useEffect, useState } from "react";
import { fetchActors, Actor } from "../services/actorService";
import ActorCard from "./ActorCard";

export default function ActorList() {
  const [actors, setActors] = useState<Actor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchActors()
      .then((data) => setActors(data))
      .catch(() => setError("Failed to load actors"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="actors-container">
      <div className="actors-grid">
        {actors.map((actor) => (
          <ActorCard 
            key={actor.id} 
            actor={actor}/>
        ))}
      </div>
    </div>
  );
}
