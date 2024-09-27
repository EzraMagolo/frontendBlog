import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogForm from "./blogForm";

const UserAdmin = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    userType: "",
  });
  const [showBlogForm, setShowBlogForm] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/get-users");
        if (response.data.status === "ok") {
          setUsers(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };
    fetchUsers();
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://blogweb-9heo.onrender.com/register", newUser);
      setNewUser({ fname: "", lname: "", email: "", password: "", userType: "" });
      const response = await axios.get("https://blogweb-9heo.onrender.com/get-users");
      if (response.data.status === "ok") {
        setUsers(response.data.data);
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`https://blogweb-9heo.onrender.com/delete-user/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const toggleBlogForm = () => setShowBlogForm(!showBlogForm);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">User Admin</h2>

      {showBlogForm ? (
        <BlogForm />
      ) : (
        <div>
          <button
            onClick={toggleBlogForm}
            className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4"
          >
            Add Blog
          </button>

          <form onSubmit={handleAddUser} className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Add New User</h3>
            <div className="mb-2">
              <label className="block text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={newUser.fname}
                onChange={(e) => setNewUser({ ...newUser, fname: e.target.value })}
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={newUser.lname}
                onChange={(e) => setNewUser({ ...newUser, lname: e.target.value })}
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 mb-1">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 mb-1">User Type</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={newUser.userType}
                onChange={(e) => setNewUser({ ...newUser, userType: e.target.value })}
              >
                <option value="">Select User Type</option>
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
            >
              Add User
            </button>
          </form>

          <h3 className="text-xl font-semibold mb-4">All Users</h3>
          <ul>
            {users.map((user) => (
              <li key={user._id} className="flex items-center justify-between mb-2">
                <span>{user.fname} {user.lname} ({user.email})</span>
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserAdmin;

