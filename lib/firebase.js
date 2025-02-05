/* eslint-env node */

// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import dotenv from "dotenv"; // Import dotenv

// Ensure dotenv is installed: npm install dotenv
if (typeof window === 'undefined') {
  dotenv.config({ path: '.env.local' }); // Load environment variables from .env.local
} else {
  throw new Error("dotenv can only be used in a Node.js environment.");
}

// Your Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

let auth;
let db;

try {
  // Initialize Firebase app
  const app = initializeApp(firebaseConfig);

  // Firebase services
  auth = getAuth(app);
  db = getFirestore(app);
} catch (error) {
  console.error("Firebase initialization error:", error);
  throw new Error("Firebase initialization failed");
}

export { auth, db };
