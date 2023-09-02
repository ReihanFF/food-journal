import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);

  // Load the authentication token from local storage when the component mounts
  useEffect(() => {
    const storedAuthToken = localStorage.getItem('authToken');
    if (storedAuthToken) {
      setAuthToken(storedAuthToken);
    }
  }, []);

  // Function to log in and set the authentication token
  const login = (token) => {
    setAuthToken(token);
    localStorage.setItem('authToken', token); // Store the token in local storage
  };

  // Function to log out and remove the authentication token
  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('authToken'); // Remove the token from local storage
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
}
