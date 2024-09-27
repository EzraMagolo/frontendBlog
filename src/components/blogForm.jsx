import React, { useState } from 'react';
import axios from 'axios';

const BlogForm = ({ userId }) => { // Accept userId as a prop
  const [blog, setBlog] = useState({
    title: '',
    body: '',
    tag: '',
    date: new Date().toISOString(),
    image: '',
    userName: '',
    userAvatar: '',
    tags: [],
    userId, // Include userId in the blog object
  });

  const handleTagsInput = (e) => {
    const tagsArray = e.target.value.split(',').map(tag => tag.trim());
    setBlog({ ...blog, tags: tagsArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://blogweb-9heo.onrender.com/create-blog', blog);
      alert('Blog created successfully');
      setBlog({
        title: '',
        body: '',
        tag: '',
        date: new Date().toISOString(),
        image: '',
        userName: '',
        userAvatar: '',
        tags: [],
        userId, // Ensure we maintain the userId
      });
    } catch (error) {
      console.error('Error creating blog:', error.response?.data || error.message);
      alert('Error creating blog: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create New Blog</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={blog.title}
          onChange={(e) => setBlog({ ...blog, title: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <textarea
          placeholder="Body"
          value={blog.body}
          onChange={(e) => setBlog({ ...blog, body: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Tag"
          value={blog.tag}
          onChange={(e) => setBlog({ ...blog, tag: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={blog.tags.join(', ')}
          onChange={handleTagsInput}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={blog.image}
          onChange={(e) => setBlog({ ...blog, image: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Author Name"
          value={blog.userName}
          onChange={(e) => setBlog({ ...blog, userName: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Author Avatar URL"
          value={blog.userAvatar}
          onChange={(e) => setBlog({ ...blog, userAvatar: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500"
        >
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default BlogForm;



