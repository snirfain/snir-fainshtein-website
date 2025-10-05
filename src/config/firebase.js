import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

// Firebase configuration
// TODO: Replace with your Firebase project credentials from Firebase Console
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "YOUR_API_KEY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "your-project.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "your-project-id",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "your-project.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Google Sign In
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Check if user is admin
    const isAdmin = user.email === 'snirfain@gmail.com';
    
    // Convert Firebase user to our format
    return {
      id: user.uid,
      email: user.email,
      full_name: user.displayName,
      avatar: user.photoURL,
      role: isAdmin ? 'admin' : 'user',
      provider: 'google'
    };
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

// Sign Out
export const signOutFirebase = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

// Listen to auth state changes
export const onAuthStateChange = (callback) => {
  return auth.onAuthStateChanged((user) => {
    if (user) {
      // Check if user is admin
      const isAdmin = user.email === 'snirfain@gmail.com';
      
      callback({
        id: user.uid,
        email: user.email,
        full_name: user.displayName,
        avatar: user.photoURL,
        role: isAdmin ? 'admin' : 'user',
        provider: 'google'
      });
    } else {
      callback(null);
    }
  });
};

