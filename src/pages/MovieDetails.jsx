import React from "react";
import { useParams, Link } from "react-router-dom";
import { dummyShowsData } from "../assets/assets";

const MovieDetails = () => {
  const { id } = useParams();
  const movie = dummyShowsData.find(m => m.id.toString() === id);

  if (!movie) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Movie Not Found</h1>
          <Link to="/movies" className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg">
            Back to Movies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <img 
              src={movie.poster_path} 
              alt={movie.title}
              className="w-full rounded-lg shadow-2xl"
            />
          </div>
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
            <p className="text-gray-300 mb-6">{movie.overview}</p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center">
                <span className="text-yellow-400 mr-2">⭐</span>
                <span className="text-white">{movie.vote_average}/10</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-400 mr-2">Duration:</span>
                <span className="text-white">{movie.runtime} minutes</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-400 mr-2">Release Date:</span>
                <span className="text-white">{movie.release_date}</span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Genres:</h3>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span key={genre.id} className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Link 
                to={`/movies/${movie.id}/2025-07-24`}
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
              >
                Book Tickets
              </Link>
              <Link 
                to="/movies"
                className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
              >
                Back to Movies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;