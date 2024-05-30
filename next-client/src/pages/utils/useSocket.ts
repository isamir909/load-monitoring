// utils/useSocket.ts

import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const useSocket = () => {
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || ''); // Replace with your server URL

    // Set up event listeners
    newSocket.on('connect', () => {
      console.log('Connected to server');
    });

    newSocket.emit('clientAuth', process.env.NEXT_PUBLIC_UICLIENT_API_KEY);

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
