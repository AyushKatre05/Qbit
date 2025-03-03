import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOSmuhHTwWhHpVuXKWIQ8FnD1bDej0dQ0",
  authDomain: "qbit-17916.firebaseapp.com",
  projectId: "qbit-17916",
  storageBucket: "qbit-17916.firebasestorage.app",
  messagingSenderId: "466342664200",
  appId: "1:466342664200:web:d2d1b356339e065809d9bd",
  measurementId: "G-DWL10D6Y7E"
};

// Lazy initialize Firebase
let app;
if (!app) {
  app = initializeApp(firebaseConfig);
}

// Initialize Firebase Authentication with AsyncStorage persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Analytics (only works on web, not React Native)
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
