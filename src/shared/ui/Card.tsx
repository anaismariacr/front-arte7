// src/shared/ui/Card.tsx
import Image from "next/image";

interface MovieItem {
  id: string;
  title: string;
  poster: string;
  duration: number;
  country: string;
  releaseDate: string;
  popularity: number;
}

interface ActorCardProps {
  variant: "actor";
  id: string;
  name: string;
  photo: string;
  nationality: string;
  birthDate: string;
  biography: string;
  movies: MovieItem[];
  onClick?: (id: string) => void;
}

interface MovieCardProps {
  variant: "movie";
  id: string;
  title: string;
  poster: string;
  duration: number;
  country: string;
  releaseDate: string;
  popularity: number;
  onClick?: (id: string) => void;
}

type CardProps = ActorCardProps | MovieCardProps;

const formatDate = (dateStr: string): string =>
  new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const StarRating = ({ score }: { score: number }) => {
  const filled = Math.round(score);
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 ${i < filled ? "text-amber-400" : "text-zinc-600"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
};


const ActorCard = ({
  id,
  name,
  photo,
  nationality,
  birthDate,
  biography,
  movies,
  onClick,
}: Omit<ActorCardProps, "variant">) => (
  <article
    onClick={() => onClick?.(id)}
    className={`
      group relative bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden
      transition-all duration-300 hover:border-zinc-600 hover:shadow-2xl hover:shadow-black/60
      hover:-translate-y-1 ${onClick ? "cursor-pointer" : ""}
    `}
  >
    {/* Photo */}
    <div className="relative h-56 w-full overflow-hidden bg-zinc-800">
      <img
        src={photo}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />

      {/* Nationality badge */}
      <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-zinc-300 text-xs font-medium px-2.5 py-1 rounded-full border border-zinc-700">
        {nationality}
      </span>
    </div>

    {/* Body */}
    <div className="p-4 flex flex-col gap-3">
      <div>
        <h3 className="text-white font-semibold text-lg leading-tight">{name}</h3>
        <p className="text-zinc-500 text-xs mt-0.5">Born {formatDate(birthDate)}</p>
      </div>

      <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2">{biography}</p>

      {/* Movies list */}
      {movies.length > 0 && (
        <div>
          <p className="text-zinc-500 text-xs uppercase tracking-widest mb-2">
            Films · {movies.length}
          </p>
          <ul className="flex flex-col gap-1.5">
            {movies.slice(0, 3).map((m) => (
              <li
                key={m.id}
                className="flex items-center gap-2 text-sm text-zinc-300"
              >
                <img
                  src={m.poster}
                  alt={m.title}
                  className="w-7 h-7 rounded object-cover flex-shrink-0 bg-zinc-800"
                />
                <span className="truncate">{m.title}</span>
                <span className="ml-auto text-zinc-600 text-xs flex-shrink-0">
                  {new Date(m.releaseDate).getFullYear()}
                </span>
              </li>
            ))}
            {movies.length > 3 && (
              <li className="text-zinc-600 text-xs pl-9">
                +{movies.length - 3} more
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  </article>
);


const MovieCard = ({
  id,
  title,
  poster,
  duration,
  country,
  releaseDate,
  popularity,
  onClick,
}: Omit<MovieCardProps, "variant">) => (
  <article
    onClick={() => onClick?.(id)}
    className={`
      group relative bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden
      transition-all duration-300 hover:border-zinc-600 hover:shadow-2xl hover:shadow-black/60
      hover:-translate-y-1 ${onClick ? "cursor-pointer" : ""}
    `}
  >
    {/* Poster */}
    <div className="relative h-56 w-full overflow-hidden bg-zinc-800">
      <img
        src={poster}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />

      {/* Duration badge */}
      <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-zinc-300 text-xs font-medium px-2.5 py-1 rounded-full border border-zinc-700">
        {duration}h
      </span>
    </div>

    {/* Body */}
    <div className="p-4 flex flex-col gap-3">
      <div>
        <h3 className="text-white font-semibold text-lg leading-tight">{title}</h3>
        <p className="text-zinc-500 text-xs mt-0.5">
          {country} · {formatDate(releaseDate)}
        </p>
      </div>

      <StarRating score={popularity} />
    </div>
  </article>
);


export const Card = (props: CardProps) => {
  if (props.variant === "actor") {
    const { variant, ...rest } = props;
    return <ActorCard {...rest} />;
  }
  const { variant, ...rest } = props;
  return <MovieCard {...rest} />;
};
