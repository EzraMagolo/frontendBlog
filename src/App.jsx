import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/login";
import SignUp from "./components/signUp";
import Navbar from "./components/navbar";
import BlogContainer from "./components/blogContainer";
import BlogPost from "./components/blogPost";
import Footer from "./components/footer";
import BlogForm from "./components/blogForm";
import ResetPassword from "./components/resetPassword";
import ForgotPassword from "./components/forgotPassword";
import About from "./components/about";
import Feedback from "./components/feedback";
import Topics from "./components/topics";
import Products from "./components/products";
import Welcome from "./components/welcome";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [token, setToken] = useState(null);
  const [userDetails, setUserDetails] = useState({ fname: '', lname: '' });

  useEffect(() => {
    const loggedIn = window.localStorage.getItem("loggedIn") === "true";
    const storedUserType = window.localStorage.getItem("userType");
    const storedUserName = window.localStorage.getItem("userName");
    const storedToken = window.localStorage.getItem("token");

    const [fname = '', lname = ''] = storedUserName ? storedUserName.split(' ') : [];

    if (loggedIn && storedUserType && storedToken) {
      setIsLoggedIn(true);
      setUserType(storedUserType);
      setToken(storedToken);
      setUserDetails({ fname, lname });
    }
  }, []);

  const handleLogOut = () => {
    window.localStorage.removeItem("loggedIn");
    window.localStorage.removeItem("userName");
    window.localStorage.removeItem("userType");
    window.localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserType(null);
    setToken(null);
    setUserDetails({ fname: '', lname: '' });
  };

  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <Navbar
          isLoggedIn={isLoggedIn}
          userDetails={userDetails}
          logOut={handleLogOut}
          token={token}
          userType={userType}
        />
        <main className="flex-1 p-6">
          {/* Only show the Welcome component if the user is not logged in */}
          {!isLoggedIn && (
            <div id="welcome">
              <Welcome />
            </div>
          )}
          <Routes>
            <Route
              path="/login"
              element={
                <Login
                  setIsLoggedIn={setIsLoggedIn}
                  setUserType={setUserType}
                  setUserName={(name) =>
                    setUserDetails((prev) => ({
                      ...prev,
                      fname: name.split(' ')[0],
                      lname: name.split(' ')[1],
                    }))
                  }
                  setToken={setToken}
                />
              }
            />
            <Route path="/register" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
            <Route path="/about" element={<About />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/topics" element={<Topics />} />
            <Route path="/products" element={<Products />} />
            <Route path="/blog" element={<BlogContainer />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            {isLoggedIn ? (
              userType === "Admin" ? (
                <>
                  <Route path="/blogForm" element={<BlogForm />} />
                  <Route path="*" element={<Navigate to="/blogForm" />} />
                </>
              ) : (
                <Route path="*" element={<Navigate to="/blog" />} />
              )
            ) : (
              <Route path="*" element={<Navigate to="/" />} />
            )}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;


































