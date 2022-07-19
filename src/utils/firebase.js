import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCL1_V1T5xPSxSgtn-LZugI1XMnvM3ZVGQ",
  authDomain: "re-system-4005b.firebaseapp.com",
  projectId: "re-system-4005b",
  storageBucket: "re-system-4005b.appspot.com",
  messagingSenderId: "201378504141",
  appId: "1:201378504141:web:5593ececb2f4413a4b3884",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
