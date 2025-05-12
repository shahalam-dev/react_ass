import React from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { auth } from './firebaseconfig'; // Use auth from firebaseconfig.js

const PrivateRoute = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  if (isLoggedIn === null) {
    return <div>Loading...</div>; // Show a loading state while checking auth
  }

  return isLoggedIn ? children : <Navigate to="/" />;
};

export default PrivateRoute;
