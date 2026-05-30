import React, { useMemo, useState } from "react";
import BlurCircle from "./BlurCircle";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const DateSelect = ({ dateTime, id }) => {
  const navigate = useNavigate();
  const dates = useMemo(() => Object.keys(dateTime), [dateTime]);
  const [selected, setSelected] = useState(null);

  const selectedIndex = selected ? dates.indexOf(selected) : -1;

  const selectDateByOffset = (offset) => {
    if (dates.length === 0) {
      return;
    }

    const currentIndex = selectedIndex === -1 ? 0 : selectedIndex;
    const nextIndex = Math.min(Math.max(currentIndex + offset, 0), dates.length - 1);
    setSelected(dates[nextIndex]);
  };

  const onBookHandler = () => {
    if (!selected) {
      toast.error("Please select a date");
      return;
    }
    navigate(`/movies/${id}/${selected}`);
    window.scrollTo(0, 0);
  };

  return (
    <div id="dateSelect" className="pt-20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative p-8 bg-[#1a0f13]/70 border border-red-500/10 rounded-lg shadow-lg backdrop-blur-sm">
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle top="100px" right="0px" />

        <div className="w-full md:w-auto">
          <p className="text-lg font-semibold text-white">Choose Date</p>
          <div className="flex items-center gap-4 text-sm mt-5">
            <button
              type="button"
              onClick={() => selectDateByOffset(-1)}
              className="p-2 rounded-full hover:bg-red-500/20 transition disabled:opacity-40"
              disabled={selectedIndex <= 0}
              aria-label="Previous date"
            >
              <ChevronLeftIcon width={24} className="text-red-400" />
            </button>

            <span className="flex flex-wrap gap-3">
              {dates.map((date) => (
                <button
                  type="button"
                  key={date}
                  onClick={() => setSelected(date)}
                  className={`flex flex-col items-center justify-center h-14 w-14 rounded-md border text-sm transition-all ${
                    selected === date
                      ? "bg-gradient-to-b from-red-600 to-red-700 text-white border-red-500 shadow-md"
                      : "border-red-500/30 text-red-200 hover:border-red-500/60 hover:text-white hover:bg-red-500/10"
                  }`}
                >
                  <span className="font-medium">{new Date(date).getDate()}</span>
                  <span className="text-xs opacity-90">
                    {new Date(date).toLocaleDateString("en-US", { month: "short" })}
                  </span>
                </button>
              ))}
            </span>

            <button
              type="button"
              onClick={() => selectDateByOffset(1)}
              className="p-2 rounded-full hover:bg-red-500/20 transition disabled:opacity-40"
              disabled={selectedIndex === dates.length - 1}
              aria-label="Next date"
            >
              <ChevronRightIcon width={24} className="text-red-400" />
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={onBookHandler}
          className="bg-gradient-to-r from-red-600 to-pink-500 text-white px-8 py-2 rounded-lg hover:from-red-700 hover:to-pink-600 transition-all duration-300 cursor-pointer active:scale-95 shadow-md"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default DateSelect;
