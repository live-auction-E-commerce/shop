import { useCallback } from 'react';
import socket from '@/socket';

/**
 * useSocketEmit - Returns a function to emit any socket event with data
 */
const useSocketEmit = () => {
  return useCallback((event, data) => {
    if (!event) return;
    socket.emit(event, data);
  }, []);
};

export default useSocketEmit;
