import { useEffect } from 'react';
import socket from '@/socket';

/**
 * useSocket - Custom hook to handle socket event listeners
 *
 * @param {string} event - The name of the socket event to listen to (e.g., 'new-bid')
 * @param {function} callback - The function to run when the event is received
 *
 * This hook sets up a socket listener when the component mounts and
 * automatically removes it when the component unmounts or dependencies change.
 */

const useSocketListener = (event, callback) => {
  useEffect(() => {
    if (!event || typeof callback !== 'function') return;

    socket.on(event, callback);

    return () => {
      socket.off(event, callback);
    };
  }, [event, callback]);

  return socket;
};

export default useSocketListener;
