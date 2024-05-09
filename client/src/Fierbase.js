
import { initializeApp } from "firebase/app";
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-b776e.firebaseapp.com",
  projectId: "mern-blog-b776e",
  storageBucket: "mern-blog-b776e.appspot.com",
  messagingSenderId: "443940141156",
  appId: "1:443940141156:web:d5c9ff884de8749e42c771"
};

export const app = initializeApp(firebaseConfig);

