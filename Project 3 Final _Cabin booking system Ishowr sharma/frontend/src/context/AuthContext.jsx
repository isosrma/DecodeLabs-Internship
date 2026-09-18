import React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('authToken');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      setIsAuthenticated(true);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isAuthenticated && user && token) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
    }
  }, [isAuthenticated, user, token]);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        token,
        isLoading,
        login,
        logout,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
};
