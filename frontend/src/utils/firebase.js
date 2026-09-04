// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_API_KEY,
  authDomain: "fresherai-36609.firebaseapp.com",
  projectId: "fresherai-36609",
  storageBucket: "fresherai-36609.firebasestorage.app",
  messagingSenderId: "643489006705",
  appId: "1:643489006705:web:94bcdd31f2a237ceda87d0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };