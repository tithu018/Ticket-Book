import React from "react";
import { useParams, Link } from "react-router-dom";
import { dummyShowsData } from "../assets/assets";

const SeatLayout = () => {
  const { id, date } = useParams();
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
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Select Your Seats</h1>
          <p className="text-gray-400">{movie.title} - {new Date(date).toLocaleDateString()}</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Screen */}
          <div className="text-center mb-8">
            <div className="bg-gray-700 text-white py-4 rounded-lg mx-auto max-w-md">
              <h3 className="text-lg font-semibold">SCREEN</h3>
            </div>
          </div>

          {/* Seat Layout */}
          <div className="grid grid-cols-10 gap-2 mb-8">
            {Array.from({ length: 80 }, (_, i) => {
              const row = String.fromCharCode(65 + Math.floor(i / 10));
              const seat = (i % 10) + 1;
              const seatId = `${row}${seat}`;
              
              return (
                <button
                  key={seatId}
                  className="w-8 h-8 bg-gray-600 hover:bg-green-500 text-white text-xs rounded transition-colors duration-200"
                  onClick={() => console.log(`Selected seat: ${seatId}`)}
                >
                  {seatId}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex justify-center space-x-8 mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-600 rounded"></div>
              <span className="text-gray-400">Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-gray-400">Selected</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-gray-400">Occupied</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <Link 
              to={`/movies/${id}`}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors duration-300"
            >
              Back to Movie
            </Link>
            <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300">
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatLayout;