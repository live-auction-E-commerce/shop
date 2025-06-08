import { useCallback } from 'react';
import { socket } from '@/services/socket';

// This is not a hook. Consider to move to a socket hook or services or something like it.
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
