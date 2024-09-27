import React from 'react';

const BlogCard = ({ data }) => {
  // Log data to verify its structure
  console.log('BlogCard data:', data);

  // If no data is provided or it's an empty object
  if (!data || Object.keys(data).length === 0) {
    console.log('BlogCard: No data available');
    return <div className="p-4 text-center">No blog data available.</div>;
  }

  // Extract data with fallback values
  const {
    title = 'Untitled Blog',
    date = 'No Date Provided',
    image = 'https://via.placeholder.com/300x200', // Default image URL
    userName = 'Anonymous',
    userAvatar = 'https://via.placeholder.com/100', // Default avatar URL
    body = 'No content available.',
    tag = 'No Tag'
  } = data;

  // Format date
  const formattedDate = new Date(date).toLocaleDateString();

  return (
    <div className="max-w-sm w-full lg:max-w-full lg:flex border border-gray-300 rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105">
      <div
        className="h-48 lg:h-48 lg:w-48 bg-cover bg-center flex-none rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
        style={{ backgroundImage: `url(${image})` }}
        title={title}
      >
        <div className="bg-black bg-opacity-50 h-full w-full flex items-center justify-center">
          {!data.image && <span className="text-white text-lg font-semibold">Image Not Available</span>}
        </div>
      </div>

      <div className="border-t border-b border-gray-300 lg:border-t-0 lg:border-l border-gray-300 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-6 flex flex-col justify-between leading-normal">
        <div className="mb-4">
          <a href={`/blog/${data._id}`} className="text-gray-900 font-bold text-2xl mb-2 hover:underline">
            {title}
          </a>
          <div className="text-gray-600 text-sm flex items-center justify-between mb-2">
            <span>{formattedDate}</span>
            <a
              className="px-3 py-1 bg-gray-600 text-white font-bold rounded-full hover:bg-gray-500 transition"
              href={`#tag-${tag}`}
            >
              {tag}
            </a>
          </div>
          <p className="text-gray-700 text-base">
            {body.length > 150 ? `${body.substring(0, 150)}...` : body}
          </p>
        </div>

        <div className="flex items-center mt-4">
          <img
            className="w-12 h-12 rounded-full mr-4"
            src={userAvatar}
            alt={`${userName}'s avatar`}
          />
          <div className="text-sm">
            <p className="text-gray-900 font-semibold">{userName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;









