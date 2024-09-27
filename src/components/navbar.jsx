import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = ({ isLoggedIn, userDetails = {}, logOut }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { fname = '', lname = '' } = userDetails;
  const location = useLocation();
  const navigate = useNavigate();

  // State to track the current active section for highlighting
  const [activeSection, setActiveSection] = useState('');

  // Function to handle section highlighting as the user scrolls
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['welcome', 'login', 'topics', 'products', 'about', 'feedback'];
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Function to scroll down the page
  const scrollDown = () => {
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' }); // Scrolls down by one viewport height
  };

  // Flag to prevent multiple clicks in quick succession
  const [isScrolling, setIsScrolling] = useState(false);

  // Function to handle link click and scrolling
  const handleLinkClick = (event, path) => {
    event.preventDefault(); // Prevent the default link behavior
    if (!isScrolling) {
      setIsScrolling(true); // Set the flag to indicate scrolling is in progress
      scrollDown(); // Scroll down first
      setTimeout(() => {
        navigate(path); // Use navigate for navigation
        setIsScrolling(false); // Reset the flag after navigation
      }, 100); // Delay to allow scroll to complete
    }
  };

  const shouldShowUserDetails = isLoggedIn && (location.pathname === '/blog' || location.pathname === '/blogForm');

  return (
    <nav className="bg-white px-6 py-4 shadow sticky top-0 z-50">
      <div className="flex flex-col container mx-auto md:flex-row md:items-center md:justify-between">
        <div className="flex justify-between items-center">
          <div>
            <Link to="/" className="text-gray-800 text-xl font-bold md:text-2xl">
              CAPTURETHE<span className="text-blue-500">IMPACT</span>
            </Link>
          </div>
          <div>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="block text-gray-800 hover:text-gray-600 focus:text-gray-600 focus:outline-none md:hidden"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
              </svg>
            </button>
          </div>
        </div>

        <div className={`flex flex-col md:flex-row md:-mx-4 ${isOpen ? 'block' : 'hidden md:block'}`}>
          <Link
            to="/blog"
            className={`my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0 ${activeSection === 'blog' ? 'text-blue-500 font-bold' : ''}`}
            onClick={(e) => handleLinkClick(e, '/blog')}
          >
            Blogs
          </Link>
          <Link
            to="/topics"
            className={`my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0 ${activeSection === 'topics' ? 'text-blue-500 font-bold' : ''}`}
            onClick={(e) => handleLinkClick(e, '/topics')}
          >
            Topics
          </Link>
          <Link
            to="/products"
            className={`my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0 ${activeSection === 'products' ? 'text-blue-500 font-bold' : ''}`}
            onClick={(e) => handleLinkClick(e, '/products')}
          >
            Products
          </Link>
          <Link
            to="/about"
            className={`my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0 ${activeSection === 'about' ? 'text-blue-500 font-bold' : ''}`}
            onClick={(e) => handleLinkClick(e, '/about')}
          >
            About
          </Link>
          <Link
            to="/feedback"
            className={`my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0 ${activeSection === 'feedback' ? 'text-blue-500 font-bold' : ''}`}
            onClick={(e) => handleLinkClick(e, '/feedback')}
          >
            Feedback
          </Link>

          {shouldShowUserDetails && (
            <>
              <span className="my-1 text-gray-800 font-medium md:mx-4 md:my-0">
                Welcome , {fname} {lname}
              </span>
              <button
                onClick={() => {
                  logOut();
                  scrollDown(); // Scroll down after logout as well
                }}
                className="my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0"
              >
                Log Out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


















