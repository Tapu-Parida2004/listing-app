import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAJTPDYSk6Kz429Z3M7eHj0uAf4rFvY72k",
  authDomain: "listingapp-b5c7b.firebaseapp.com",
  projectId: "listingapp-b5c7b",
  storageBucket: "listingapp-b5c7b.firebasestorage.app",
  messagingSenderId: "150388734433",
  appId: "1:150388734433:web:34c1cdba78fb3bd76a7aa0",
  measurementId: "G-NWZ1QQ2D18",
};
// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage for persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };