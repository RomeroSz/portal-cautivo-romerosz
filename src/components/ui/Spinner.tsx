import React from 'react';

const Spinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-600">
      <div className="w-6 h-6 border-4 border-t-teal-800 dark:border-t-gray-100 border-t-4 border-gray-400 border-opacity-80 rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;