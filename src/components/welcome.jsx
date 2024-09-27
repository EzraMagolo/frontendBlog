import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();
  const [isScrolling, setIsScrolling] = useState(false);

  // Function to handle scroll and navigation
  const scrollDownAndNavigate = (path) => {
    if (!isScrolling) {
      setIsScrolling(true);
      // Smoothly scroll down by the viewport height
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
      // Delay navigation to allow scroll to finish
      setTimeout(() => {
        navigate(path); // Navigate to the desired path
        setIsScrolling(false); // Reset scroll flag
      }, 500); // Adjust the delay as per scroll speed
    }
  };

  return (
    <div className="container mx-auto my-10 p-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Our Community</h1>
      <p className="text-lg mb-6">
        We're so happy you found us! Whether you're here to explore, share, or connect,
        you’re always welcome. Join our growing family and let’s make something wonderful together.
        Sign in to continue, or register if you're new!
      </p>
      <div className="space-x-4">
        <button
          onClick={() => scrollDownAndNavigate('/login')}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>
        <button
          onClick={() => scrollDownAndNavigate('/register')}
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition duration-300"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Welcome;


