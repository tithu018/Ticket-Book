import React from "react";

const BlurCircle = ({ top = "auto", left = "auto", right = "auto", bottom = "auto" }) => {
  return (
    <div
      className="absolute -z-50 w-60 h-60 aspect-square rounded-full bg-red-500/30 blur-3xl"
      style={{ top, left, right, bottom }}
    />
  );
};

export default BlurCircle;
