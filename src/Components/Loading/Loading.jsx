import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600 mb-4"></div>
        {/* Loading Text */}
        <span className="text-lg font-semibold text-purple-700">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default Loading;
