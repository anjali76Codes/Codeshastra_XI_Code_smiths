import React from 'react';

const QueryMaker = () => {
  const handleRedirect = () => {
    // Redirect to the SQL Simulator URL
    window.location.href = 'http://localhost:5000/';
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex items-center justify-center">
      <button
        onClick={handleRedirect}
        className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-600"
      >
        Go to SQL Simulator
      </button>
    </div>
  );
};

export default QueryMaker;
