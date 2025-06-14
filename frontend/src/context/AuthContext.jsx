import { useEffect, createContext, useContext, useState } from 'react';
import { verifyToken } from '@/services/authService';
import { toast } from 'sonner';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        return;
      }

      try {
        const response = await verifyToken(token);
        setUser(response.user);
      } catch (error) {
        console.error('Invalid token:', error);
        logout();
      }
    };

    fetchUser();
  }, [token]);

  const login = async ({ token }) => {
    localStorage.setItem('token', token);
    setToken(token);

    try {
      const response = await verifyToken(token);
      setUser(response.user);
    } catch (error) {
      toast.error(error);
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
