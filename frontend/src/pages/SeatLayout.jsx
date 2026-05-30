import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowRightIcon, ClockIcon } from "lucide-react";
import { assets } from "../assets/assets";
import Loading from "../components/Loading";
import isoTimeFormat from "../lib/isoTimeFormat";
import BlurCircle from "../components/BlurCircle";
import { api } from "../lib/api";
import { getAuthUser } from "../lib/auth";

const SeatLayout = () => {
  const groupRows = [["A", "B"], ["C", "D"], ["E", "F"], ["G", "H"], ["I", "J"]];

  const { id, date } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [occupiedSeats, setOccupiedSeats] = useState({});
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    Promise.all([
      api.getMovie(id),
      api.getMovieShowTimes(id),
    ])
      .then(([movie, dateTime]) => {
        if (mounted) {
          setShow({ movie, dateTime });
        }
      })
      .catch((error) => {
        toast.error(error.message);
        if (mounted) {
          setShow(null);
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [id]);

  const loadOccupiedSeats = async (time) => {
    setSelectedTime(time);
    setSelectedSeats([]);
    try {
      const seats = await api.getOccupiedSeats(time.showId);
      setOccupiedSeats(seats);
    } catch (error) {
      toast.error(error.message);
      setOccupiedSeats({});
    }
  };

  const handleProceed = async () => {
    if (!getAuthUser()) {
      toast.error("Login before booking seats");
      navigate("/login");
      return;
    }

    if (!selectedTime) {
      toast.error("Please select a show time");
      return;
    }

    if (selectedSeats.length === 0) {
      toast.error("Please select at least one seat");
      return;
    }

    try {
      setSubmitting(true);
      await api.createBooking({
        showId: Number(selectedTime.showId),
        seats: selectedSeats,
      });
      toast.success("Seats reserved");
      navigate("/my-bookings");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSeatClick = (seatId) => {
    if (!selectedTime) {
      return toast("Please select a time");
    }
    if (occupiedSeats[seatId]) {
      return toast.error("Seat is already booked");
    }
    if (!selectedSeats.includes(seatId) && selectedSeats.length > 4) {
      return toast("You can only select 5 seats.");
    }

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : [...prev, seatId]
    );
  };

  const renderSeats = (row, count = 9) => (
    <div key={row} className="flex gap-2 mt-2">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {Array.from({ length: count }, (_, i) => {
          const seatId = `${row}${i + 1}`;
          const isOccupied = Boolean(occupiedSeats[seatId]);
          const isSelected = selectedSeats.includes(seatId);
          return (
            <button
              key={seatId}
              type="button"
              onClick={() => handleSeatClick(seatId)}
              disabled={isOccupied}
              className={`w-8 h-8 rounded border border-primary/60 transition-colors duration-200 ${
                isOccupied
                  ? "cursor-not-allowed bg-gray-700 text-gray-500"
                  : isSelected
                    ? "bg-red-600 text-white"
                    : "cursor-pointer"
              }`}
            >
              {seatId}
            </button>
          );
        })}
      </div>
    </div>
  );

  if (loading) {
    return <Loading />;
  }

  if (!show) {
    return (
      <main className="flex min-h-[80vh] items-center justify-center px-6 pt-28 text-center">
        <p className="text-gray-400">Show times are not available for this movie.</p>
      </main>
    );
  }

  const availableTimes = show.dateTime[date] || [];

  return (
    <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50">
      <div className="w-60 bg-primary/10 border border-primary/20 rounded-lg py-10 h-max md:sticky md:top-30">
        <p className="text-lg font-semibold px-6">Available Timings</p>
        <div className="mt-5 space-y-1">
          {availableTimes.length > 0 ? (
            availableTimes.map((item) => (
              <button
                key={item.showId}
                type="button"
                onClick={() => loadOccupiedSeats(item)}
                className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition ${
                  selectedTime?.showId === item.showId
                    ? "bg-red-600 text-white"
                    : "hover:bg-red-100"
                }`}
              >
                <ClockIcon className="w-4 h-4" />
                <span className="text-sm">{isoTimeFormat(item.time)}</span>
              </button>
            ))
          ) : (
            <p className="px-6 text-sm text-gray-400">No shows on this date.</p>
          )}
        </div>
      </div>

      <div className="relative flex-1 flex flex-col items-center max-md:mt-16">
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle bottom="0px" right="0px" />
        <h1 className="text-2xl font-semibold mb-4">Select Your Seats</h1>
        <img src={assets.screenImage} alt="screen" />
        <p className="text-gray-400 text-sm mb-6">SCREEN SIDE</p>

        <div className="flex flex-col items-center mt-10 text-xs text-gray-300">
          <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6">
            {groupRows[0].map((row) => renderSeats(row))}
          </div>

          <div className="grid grid-cols-2 gap-11">
            {groupRows.slice(1).map((group, idx) => (
              <div key={idx}>
                {group.map((row) => renderSeats(row))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 rounded-lg border border-white/10 bg-gray-900/80 px-5 py-4 text-sm text-gray-300">
          <p>Selected Seats: <span className="text-white">{selectedSeats.length ? selectedSeats.join(", ") : "None"}</span></p>
          <p className="mt-1">Show Time: <span className="text-white">{selectedTime ? isoTimeFormat(selectedTime.time) : "Not selected"}</span></p>
        </div>

        <button
          type="button"
          onClick={handleProceed}
          disabled={submitting}
          className="flex items-center gap-1 mt-8 px-10 py-3 transition rounded-full font-medium cursor-pointer active:scale-105 hover:bg-red-700 bg-red-600 text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Reserving..." : "Proceed to Payment"}
          <ArrowRightIcon strokeWidth={3} className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default SeatLayout;
