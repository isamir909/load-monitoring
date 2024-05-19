// utils/useSocket.ts

import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const useSocket = () => {
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const newSocket = io('http://localhost:8000'); // Replace with your server URL

    // Set up event listeners
    newSocket.on('connect', () => {
      console.log('Connected to server');
    });

    newSocket.emit('clientAuth', '@#$dfgbyouehdha@#$%^&*(');

    // newSocket.on('disconnect', () => {
    //   console.log('Disconnected from server');
    // });

    // Save the socket instance to state
    setSocket(newSocket);

    // Clean up the socket connection on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return socket;
};

export default useSocket;
