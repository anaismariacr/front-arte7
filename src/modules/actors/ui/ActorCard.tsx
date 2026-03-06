"use client";

import { useRouter }from "next/navigation";
import { Actor } from "../services/actorService";

interface Props {
  actor: Actor;
  onDelete: (id: string) => void;
}

export default function ActorCard({ actor, onDelete }: Props) {
    const router = useRouter();

    return (
        <div className="actor-card">
            <div style={{ color: "black" }} >
                <img src={actor.photo} alt={actor.name} />
                <h2>{actor.name}</h2>
                <p>{actor.nationality}</p>
                <p>{new Date(actor.birthDate).toLocaleDateString('es-CO', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}</p>
            </div>
            <button
                onClick={() => router.push(`/actors/edit/${actor.id}`)}
                className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
            >
                Editar
            </button>
            <button
          onClick={() => onDelete(actor.id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Eliminar
        </button>
        </div>
    );
}
//date 'es-CO' para formato espanol
//date 'es-US para formato ingles