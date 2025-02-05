import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase"; // Import Firebase auth

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert("Passwords do not match!");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User signed up successfully");
      navigate("/"); // Navigate to login page after successful signup
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Error signing up. Please try again.");
    }
  };

  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
        rel="stylesheet"
      />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-700">
        <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-green-400 font-sans">
              Welcome to Firebase Contact App
            </h2>
            <p className="mt-2 text-gray-300">Sign in to continue</p>
          </div>
          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Full Name
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 mt-1 border border-green-500 bg-gray-900 rounded-xl text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Email address
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 mt-1 border border-green-500 bg-gray-900 rounded-xl text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 mt-1 border border-green-500 bg-gray-900 rounded-xl text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Confirm Password
              </label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 mt-1 border border-green-500 bg-gray-900 rounded-xl text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </div>
            <div>
              <button
                onClick={Login}
                type="submit"
                className="w-full px-4 py-3 text-lg font-medium text-white bg-gradient-to-r from-green-500 to-teal-500 rounded-xl hover:from-green-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
