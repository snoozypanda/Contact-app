import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../lib/firebase"; // Import Firestore

const AddForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "contacts"), {
        name,
        email,
        phone,
        address,
      });
      console.log("Added Contact:", { name, email, phone, address });
      navigate("/landing"); // Navigate to the landing page after adding
    } catch (error) {
      console.error("Error adding contact:", error);
      alert("Error adding contact. Please try again.");
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
            <p className="text-3xl font-bold text-green-400 font-sans">
              Fill in the details to add a new contact.
            </p>
          </div>
          <form onSubmit={handleAdd} className="space-y-6">
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
                Email Address
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
                Phone Number
              </label>
              <input
                type="tel"
                required
                className="w-full px-4 py-3 mt-1 border border-green-500 bg-gray-900 rounded-xl text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Address
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 mt-1 border border-green-500 bg-gray-900 rounded-xl text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-3 text-lg font-medium text-white bg-gradient-to-r from-green-500 to-teal-500 rounded-xl hover:from-green-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddForm;
