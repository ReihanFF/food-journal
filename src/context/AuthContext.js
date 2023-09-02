import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const storedAuthToken = localStorage.getItem('authToken');
    if (storedAuthToken) {
      setAuthToken(storedAuthToken);
    }
  }, []);

  const login = (token) => {
    setAuthToken(token);
    localStorage.setItem('authToken', token); 
  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('authToken'); 
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
}
