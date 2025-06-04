// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAV8o21xpE3fp0MirQ5puqE9p_YeJhgKx4",
  authDomain: "workquest-843fd.firebaseapp.com",
  projectId: "workquest-843fd",
  storageBucket: "workquest-843fd.firebasestorage.app",
  messagingSenderId: "562257673955",
  appId: "1:562257673955:web:859f5e988d0ecbbfcd0fd6",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
