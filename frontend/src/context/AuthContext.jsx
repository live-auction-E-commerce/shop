import { useEffect, createContext, useContext, useState, useMemo, useCallback } from 'react';
import { verifyToken } from '@/services/authService';
import { getDefaultAddress } from '@/services/addressService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [defaultAddress, setDefaultAddress] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
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
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  const login = async ({ token }) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
    setDefaultAddress(null);
    setLoading(false);
  };

  const refreshDefaultAddress = useCallback(async () => {
    if (!user?._id) return;
    try {
      const address = await getDefaultAddress(user._id);
      setDefaultAddress(address);
    } catch (err) {
      console.error('Failed to refresh default address:', err);
    }
  }, [user?._id]);

  const isAuthenticated = !!user;

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      defaultAddress,
      login,
      logout,
      isAuthenticated,
      refreshDefaultAddress,
    }),
    [token, user, loading, defaultAddress, isAuthenticated, refreshDefaultAddress]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
