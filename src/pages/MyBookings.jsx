import React from "react";
import { Link } from "react-router-dom";
import { dummyBookingData } from "../assets/assets";

const MyBookings = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          My Bookings
        </h1>
        
        {dummyBookingData.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎫</div>
            <h2 className="text-2xl font-semibold text-white mb-4">No Bookings Yet</h2>
            <p className="text-gray-400 mb-8">Start booking your favorite movies!</p>
            <Link 
              to="/movies"
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
            >
              Browse Movies
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {dummyBookingData.map((booking, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-6 shadow-lg">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <img 
                      src={booking.show.movie.poster_path} 
                      alt={booking.show.movie.title}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                  <div className="md:col-span-2 text-white">
                    <h3 className="text-2xl font-bold mb-2">{booking.show.movie.title}</h3>
                    <p className="text-gray-400 mb-4">{booking.show.movie.overview}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center">
                        <span className="text-gray-400 mr-2">Show Date:</span>
                        <span className="text-white">{new Date(booking.show.showDateTime).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-400 mr-2">Show Time:</span>
                        <span className="text-white">{new Date(booking.show.showDateTime).toLocaleTimeString()}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-400 mr-2">Seats:</span>
                        <span className="text-white">{booking.bookedSeats.join(", ")}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-400 mr-2">Amount:</span>
                        <span className="text-white font-semibold">Rs.{booking.amount}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-400 mr-2">Status:</span>
                        <span className={`px-2 py-1 rounded text-sm ${booking.isPaid ? 'bg-green-500' : 'bg-yellow-500'}`}>
                          {booking.isPaid ? 'Paid' : 'Pending'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-300">
                        Download Ticket
                      </button>
                      {!booking.isPaid && (
                        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-300">
                          Pay Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;