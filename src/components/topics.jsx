import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Topics = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get('https://blogweb-9heo.onrender.com/tags'); // Adjust this endpoint as needed
        setTopics(response.data); // Set the unique tags directly
      } catch (err) {
        console.error('Error fetching topics:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading topics</div>;

  return (
    <div className="container mx-auto my-10 p-4">
      <h1 className="text-2xl font-bold mb-4">Topics</h1>
      <ul className="list-disc pl-5">
        {topics.length > 0 ? (
          topics.map((topic) => (
            <li key={topic} className="mb-2">
              <Link to={`/topics/${topic}`} className="text-blue-500 hover:underline">
                {topic}
              </Link>
            </li>
          ))
        ) : (
          <li>No topics available</li>
        )}
      </ul>
    </div>
  );
};

export default Topics;
