import React, { useState } from 'react';

const Feedback = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/submit-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, message }),
      });

      const data = await response.json();
      if (data.status === "success") {
        alert('Thank you for your feedback!');
        // Reset form
        setEmail('');
        setMessage('');
      } else {
        alert('Error submitting feedback. Please try again.');
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert('Error submitting feedback. Please try again.');
    }
  };

  return (
    <div className="container mx-auto my-10 p-4">
      <h1 className="text-2xl font-bold mb-4">Feedback</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="w-full border rounded p-2"
            rows="4"
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Feedback;

