import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase"; // Import Firestore

const Landing = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContacts = async () => {
      const querySnapshot = await getDocs(collection(db, "contacts"));
      const contactsData = querySnapshot.docs.map((doc) => doc.data());
      setContacts(contactsData);
    };
    fetchContacts();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    // Add your search logic here if needed
  };

  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
        rel="stylesheet"
      />
      <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 to-gray-700">
        <div className="flex flex-col justify-center items-center h-full px-4">
          <h1 className="mt-20 text-5xl md:text-6xl font-bold text-green-400 mb-6 text-center">
            Welcome to Contact App
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 text-center max-w-2xl">
            Connect with ease and manage your contacts seamlessly.
          </p>
          <div className="flex justify-center items-center w-full px-4 space-x-4">
            <input
              type="text"
              placeholder="Search by email or name"
              value={searchTerm}
              onChange={handleSearch}
              className="w-80 px-4 py-3 border border-green-500 bg-gray-900 rounded-l-xl text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
            />
            <button
              onClick={() => navigate("/add")}
              className="px-4 py-3 text-lg font-medium text-white bg-gradient-to-r from-green-500 to-teal-500 rounded-r-xl hover:from-green-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105"
            >
              Add person
            </button>
          </div>
          <div className="mt-10 w-full max-w-2xl">
            {contacts
              .filter((contact) =>
                contact.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((contact, index) => (
                <div
                  key={index}
                  className="p-4 mb-4 bg-gray-800 rounded-xl shadow-lg"
                >
                  <h2 className="text-xl font-bold text-green-400">
                    {contact.name}
                  </h2>
                  <p className="text-gray-300">{contact.email}</p>
                  <p className="text-gray-300">{contact.phone}</p>
                  <p className="text-gray-300">{contact.address}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
