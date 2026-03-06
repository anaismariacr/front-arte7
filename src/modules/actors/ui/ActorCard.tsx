import { Actor } from "../services/actorService";

interface Props {
  actor: Actor;
}

export default function ActorCard({ actor }: Props) {
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
        </div>
    );
}
//date 'es-CO' para formato espanol
//date 'es-US para formato ingles