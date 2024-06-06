import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const Loading = ({ onLoadingComplete }: { onLoadingComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startService = async () => {
      try {
        const response = await fetch('https://load-monitoring-nodeclient.onrender.com');
    
        if (!response.ok) {
          throw new Error(`Failed to start service: ${response.status} - ${response.statusText}`);
        }
    
        console.log('Service started successfully');
      } catch (error) {
        console.error('Error starting service:', error);
      }
    };
    const showLoaderForExactTime = setTimeout(() => {
      onLoadingComplete();
    }, 3000); // Show loader for exactly 3 seconds

    startService();

    return () => {
      // clearTimeout(timeout);
      clearTimeout(showLoaderForExactTime);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(interval);
          return oldProgress;
        }
        const diff = Math.random() * 20;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="text-center">
        {/* <h1 className="text-4xl font-bold mb-4">Loading, please wait...</h1> */}
        <Image
          src="/loader.png"
          alt="loader"
          priority
          width={100}
          height={100}
          className="w-20 h-20 object-cover mx-auto mb-9 scale-150 "
        />
        <div className="w-full max-w-md mx-auto h-2 bg-gray-700 rounded-full mb-4">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        {/* <p className="mb-2 italic">"Good things come to those who wait"</p> */}
        <p className="max-w-lg mx-auto">
        I Have Used Free Deployment Service which Takes Time To Spinn up Server for first time, please wait for 15-20 seconds
        </p>
      </div>
    </div>
  );
};

export default Loading;
