import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BlogPost = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data for ID:', id); // Log the ID being used
        const response = await axios.get(`https://blogweb-9heo.onrender.com/${id}`);
        console.log('API Response:', response.data); // Log response
        if (response.data.status === 'ok') {
          setData(response.data.data);
        } else {
          console.error('Failed to fetch blog post, status not OK');
        }
      } catch (error) {
        console.error('Failed to fetch blog post', error);
      }
    };

    fetchData();
  }, [id]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const formattedDate = data.date ? new Date(data.date).toLocaleDateString() : 'No Date Provided';
  const tag = data.tag || 'No Tag';
  const title = data.title || 'Untitled Blog';
  const bodyPreview = data.body ? `${data.body.substring(0, 150)}...` : 'No content available.';
  const userName = data.userName || 'Anonymous';
  const userAvatar = data.userAvatar || 'default-avatar-url';

  return (
    <div className="max-w-4xl px-10 py-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <span className="font-light text-gray-600">{formattedDate}</span>
        <a
          className="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500"
          href={`#tag-${tag}`}
        >
          {tag}
        </a>
      </div>
      <div className="mt-2">
        <a
          className="text-2xl text-gray-700 font-bold hover:underline"
          href={`/blog/${data._id}`}
        >
          {title}
        </a>
        <p className="mt-2 text-gray-600">{bodyPreview}</p>
      </div>
      <div className="flex justify-between items-center mt-4">
        <a
          className="text-blue-500 hover:underline"
          href={`/blog/${data._id}`}
        >
          Read more
        </a>
        <div className="flex items-center">
          <img
            className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
            src={userAvatar}
            alt={`${userName}'s avatar`}
          />
          <h1 className="text-gray-700 font-bold hover:underline">{userName}</h1>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;







