import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState(null);

  // Function to set the authentication token
  const setAuth = (token) => {
    setAuthToken(token);
    setIsLoggedIn(!token); // Update isLoggedIn based on the presence of the token
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, authToken, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
