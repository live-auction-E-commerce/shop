import { useState, useEffect } from 'react';
import { getAllAddressesById } from '@/services/addressService';
import { useAuth } from '@/context/AuthContext';

const useAddresses = () => {
  const { user, isAuthenticated } = useAuth();
  const [addresses, setAddresses] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const data = await getAllAddressesById(user?._id);
        setAddresses(data);
      } catch (err) {
        console.error('Failed to fetch addresses:', err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAddresses();
  }, [isAuthenticated, user]);

  return { addresses, setAddresses, isLoading, error };
};

export default useAddresses;
