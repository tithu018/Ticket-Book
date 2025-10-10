import React from "react";
import { Link } from "react-router-dom";

const Favorite = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          My Favorites
        </h1>
        
        <div className="text-center py-16">
          <div className="text-6xl mb-4">❤️</div>
          <h2 className="text-2xl font-semibold text-white mb-4">No Favorites Yet</h2>
          <p className="text-gray-400 mb-8">Add movies to your favorites to see them here!</p>
          <Link 
            to="/movies"
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
          >
            Browse Movies
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Favorite;