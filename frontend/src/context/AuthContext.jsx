import { useEffect, createContext, useContext, useState, useMemo, useCallback } from 'react';
import { verifyToken } from '@/services/authService';
import { getDefaultAddress } from '@/services/addressService';

const AuthContext = createContext();

// we might be able to delete the default address from the state later, i only store this here as we needed to check
// if the user has a default address before letting him place a bid / buy a product but now we have AddressSelectionModal
// We don`t need this anymore as this component handles this case

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

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
    setLoading(false);
  };

  const isAuthenticated = !!user;

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      login,
      logout,
      isAuthenticated,
    }),
    [token, user, loading, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
