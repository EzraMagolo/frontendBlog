import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogCard from './blogCard';
import Dropdown from './dropdown';
import DateDropdown from './dateDropdown';
import Pagination from './pagination';

const BlogContainer = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTag, setSelectedTag] = useState(''); // For dropdown filtering
  const [selectedDate, setSelectedDate] = useState(''); // For date filtering
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 5; // Set the number of blogs per page

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/blogs');
        setBlogs(response.data);
        setFilteredBlogs(response.data); // Initially, all blogs are shown
        setLoading(false);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError(err);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Filter blogs based on the selected tag and date
  useEffect(() => {
    let updatedBlogs = blogs;

    // Filter by tag
    if (selectedTag) {
      updatedBlogs = updatedBlogs.filter(blog => blog.tag === selectedTag);
    }

    // Filter by date
    if (selectedDate) {
      const today = new Date();
      updatedBlogs = updatedBlogs.filter(blog => {
        const blogDate = new Date(blog.date);
        if (selectedDate === 'today') {
          return blogDate.toDateString() === today.toDateString();
        }
        if (selectedDate === 'lastWeek') {
          const lastWeek = new Date();
          lastWeek.setDate(today.getDate() - 7);
          return blogDate >= lastWeek && blogDate <= today;
        }
        if (selectedDate === 'lastMonth') {
          const lastMonth = new Date();
          lastMonth.setMonth(today.getMonth() - 1);
          return blogDate >= lastMonth && blogDate <= today;
        }
        return true; // If no filter applied
      });
    }

    setFilteredBlogs(updatedBlogs);
    setCurrentPage(1); // Reset to page 1 when filters change
  }, [selectedTag, selectedDate, blogs]);

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDropdownChange = (value) => {
    setSelectedTag(value); // Set the selected tag from dropdown
  };

  const handleDateChange = (value) => {
    setSelectedDate(value); // Set the selected date from dropdown
  };

  // Extract unique tags from blogs for dropdown options
  const uniqueTags = Array.from(new Set(blogs.map(blog => blog.tag))).filter(tag => tag); // Remove empty strings

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading blogs</div>;

  return (
    <div className="blog-container">
      {/* Dropdowns for filtering */}
      <div className="flex space-x-4 mb-4"> {/* Flex container with spacing */}
        <Dropdown
          options={['', ...uniqueTags]} // Include unique tags and a default empty option
          selectedOption={selectedTag}
          onOptionChange={handleDropdownChange}
        />
        
        <DateDropdown
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />
      </div>

      {/* Blog posts */}
      {currentBlogs.length > 0 ? (
        currentBlogs.map(blog => <BlogCard key={blog._id} data={blog} />)
      ) : (
        <div>No blogs available</div>
      )}

      {/* Pagination component */}
      <Pagination
        currentPage={currentPage}
        totalItems={filteredBlogs.length}
        itemsPerPage={blogsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default BlogContainer;





