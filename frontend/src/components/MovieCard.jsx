import React from "react";
import { useNavigate } from "react-router-dom";
import { StarIcon } from "lucide-react";
import timeFormat from "../lib/timeFormat";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const openMovie = () => {
    navigate(`/movies/${movie._id}`);
    window.scrollTo(0, 0);
  };

  return (
    <article className="flex flex-col justify-between rounded-lg bg-gray-800 p-3 transition duration-300 hover:-translate-y-1 w-66">
      <button type="button" onClick={openMovie} className="text-left">
        <img
          src={movie.backdrop_path}
          alt={movie.title || "Movie poster"}
          className="rounded-lg h-52 w-full object-cover object-right-bottom"
        />
      </button>

      <p className="mt-2 truncate font-semibold">{movie.title}</p>

      <p className="mt-2 text-sm text-gray-400">
        {new Date(movie.release_date).getFullYear()} /{" "}
        {movie.genres?.slice(0, 2).map((genre) => genre.name).join(" | ")} /{" "}
        {timeFormat(movie.runtime)}
      </p>

      <div className="mt-2 flex items-center justify-between">
        <button
          type="button"
          onClick={openMovie}
          className="rounded-full bg-red-500 px-4 py-2 text-xs font-medium transition hover:bg-red-600"
        >
          Buy Tickets
        </button>

        <p className="flex items-center gap-1 pr-1 text-sm text-gray-400">
          <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          {movie.vote_average?.toFixed(1)}
        </p>
      </div>
    </article>
  );
};

export default MovieCard;
