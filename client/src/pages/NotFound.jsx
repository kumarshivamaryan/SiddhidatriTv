import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 space-y-6">
      <h1 className="text-7xl font-extrabold text-brand-red font-mono">404</h1>
      <h2 className="text-2xl font-bold text-white">Page Not Found</h2>
      <p className="text-gray-400 max-w-md">The page you're searching for does not exist or has been relocated.</p>
      <Link to="/" className="px-6 py-3 rounded-xl bg-brand-red text-white font-semibold hover:bg-brand-red-light transition-colors">
        Return to Home
      </Link>
    </div>
  );
};

export default NotFound;