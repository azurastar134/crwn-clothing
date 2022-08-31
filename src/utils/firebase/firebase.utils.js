import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBlQIVVG0Jh40R_ujrhx_DMwg8RSFxfLyk",
  authDomain: "crown-clothing-c9bac.firebaseapp.com",
  projectId: "crown-clothing-c9bac",
  storageBucket: "crown-clothing-c9bac.appspot.com",
  messagingSenderId: "148710886899",
  appId: "1:148710886899:web:02fd08bacce27f42c65686",
  measurementId: "G-8MR3TZ6N4K",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
