import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-[80vh] bg-black">
      <div className="animate-spin rounded-full h-14 w-14 border-4 border-red-500 border-t-transparent"></div>
    </div>
  );
};

export default Loading;
