import { useEffect, createContext, useContext, useState } from 'react';
import { verifyToken } from '@/services/authService';
import { getDefaultAddress } from '@/services/addressService';
import { toast } from 'sonner';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [defaultAddress, setDefaultAddress] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        return;
      }

      try {
        const response = await verifyToken(token);
        const verifiedUser = response.user;
        setUser(verifiedUser);
        const address = await getDefaultAddress(verifiedUser._id);
        setDefaultAddress(address);
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
      const verifiedUser = response.user;
      setUser(verifiedUser);
      const address = await getDefaultAddress(verifiedUser._id);
      setDefaultAddress(address);
    } catch (error) {
      toast.error(error?.message || 'Login failed');
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
    setDefaultAddress(null);
  };

  const refreshDefaultAddress = async () => {
    if (!user?.id) return;
    try {
      const address = await getDefaultAddress(user.id);
      setDefaultAddress(address);
    } catch (err) {
      console.error('Failed to refresh default address:', err);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const response = await verifyToken(token);
      setUser(response.user);
    } catch (err) {
      console.error('Failed to refresh user', err);
    }
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        defaultAddress,
        login,
        logout,
        isAuthenticated,
        refreshDefaultAddress,
        fetchCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
