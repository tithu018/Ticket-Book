import React from "react";
import { Link } from "react-router-dom";
import { dummyShowsData } from "../assets/assets";

const Movies = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Now Showing
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {dummyShowsData.map((movie) => (
            <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img 
                src={movie.poster_path} 
                alt={movie.title}
                className="w-full h-80 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-white mb-2">{movie.title}</h3>
                <p className="text-gray-400 text-sm mb-3 line-clamp-3">{movie.overview}</p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-yellow-400 text-sm">⭐ {movie.vote_average}</span>
                  <span className="text-gray-400 text-sm">{movie.runtime} min</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-4">
                  {movie.genres.slice(0, 2).map((genre) => (
                    <span key={genre.id} className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                      {genre.name}
                    </span>
                  ))}
                </div>
                <Link 
                  to={`/movies/${movie.id}`}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg text-center block transition-colors duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movies;
