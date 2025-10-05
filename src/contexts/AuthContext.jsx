import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/api/entities';
import { signInWithGoogle, signOutFirebase, onAuthStateChange } from '@/config/firebase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user on mount and listen to Firebase auth changes
  useEffect(() => {
    loadUser();
    
    // Listen to Firebase auth state changes
    const unsubscribe = onAuthStateChange((firebaseUser) => {
      if (firebaseUser && firebaseUser.provider === 'google') {
        setUser(firebaseUser);
        // Save to localStorage for persistence
        localStorage.setItem('currentUser', JSON.stringify(firebaseUser));
      }
    });
    
    return () => unsubscribe();
  }, []);

  const loadUser = async () => {
    try {
      setIsLoading(true);
      const userData = await User.me();
      setUser(userData);
      setError(null);
    } catch (err) {
      setUser(null);
      setError(null); // Not an error if user is not logged in
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const userData = await User.login(credentials);
      setUser(userData);
      setError(null);
      return userData;
    } catch (err) {
      setError('שגיאה בהתחברות');
      throw err;
    }
  };

  const register = async (userData) => {
    try {
      const newUser = await User.register(userData);
      setUser(newUser);
      setError(null);
      return newUser;
    } catch (err) {
      setError('שגיאה בהרשמה');
      throw err;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const userData = await signInWithGoogle();
      setUser(userData);
      setError(null);
      return userData;
    } catch (err) {
      setError('שגיאה בהתחברות דרך Google');
      throw err;
    }
  };

  const logout = async () => {
    try {
      // Sign out from Firebase if user logged in with Google
      if (user?.provider === 'google') {
        await signOutFirebase();
      } else {
        await User.logout();
      }
      setUser(null);
      setError(null);
    } catch (err) {
      setError('שגיאה בהתנתקות');
      throw err;
    }
  };

  const updateUserData = async (data) => {
    try {
      const updatedUser = await User.updateProfile(data);
      setUser(updatedUser);
      setError(null);
      return updatedUser;
    } catch (err) {
      setError('שגיאה בעדכון הפרטים');
      throw err;
    }
  };

  const isAdmin = () => {
    return user && user.email === 'snirfain@gmail.com';
  };

  const value = {
    user,
    isLoading,
    error,
    login,
    loginWithGoogle,
    register,
    logout,
    updateUserData,
    isAdmin,
    refreshUser: loadUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
