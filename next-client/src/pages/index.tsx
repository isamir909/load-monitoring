import React, { useEffect, useState } from 'react';

import useSocket from './utils/useSocket'; // Adjust the path as needed
import Widget from './components/Widget'; // Import your Widget component
import Loading from './components/Loading';

import Header from './components/Header';




export interface PerformanceInfo {
  freeMem: number;
  totalMem: number;
  usedMem: number;
  memoryUsage: number;
  osType: string;
  uptime: number;
  cpuModel: string;
  numsOfCores: number;
  cpuSpeed: number;
  cpuLoad: number;
  macAddress: string;
  isActive:boolean
}

export interface PerformanceInfoState {
  [macAddress: string]: PerformanceInfo;
}
 
const Home: React.FC = () => {
  const socket = useSocket();
  const [performanceInfo, setPerformanceInfo] = useState<PerformanceInfoState>({});
  const [sortedKeys, setSortedKeys] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (socket) {
      const handlePerformanceData = (performanceData: PerformanceInfo) => {
        console.log(performanceData, "performanceData");

        // Update performanceInfo state with new data
        setPerformanceInfo((prevState) => ({
          ...prevState,
          [performanceData.macAddress]: performanceData,
        }));
      };

      socket.on("performanceData", handlePerformanceData);

      return () => {
        // Clean up the event listener when component unmounts
        socket.off("performanceData", handlePerformanceData);
      };
    }
  }, [socket]);

  useEffect(() => {
    if (!loading) {
      setIsVisible(true);
    }
  }, [loading]);

  useEffect(() => {
    // Sort the keys based on the isActive property
    const sortedKeys = Object.keys(performanceInfo).sort((a, b) => {
      const infoA = performanceInfo[a];
      const infoB = performanceInfo[b];
      return infoA.isActive === infoB.isActive ? 0 : infoA.isActive ? -1 : 1;
    });
    setSortedKeys(sortedKeys);
  }, [performanceInfo]);

  // const handleLoadingComplete = () => {
  //   setLoading(false);
  // };

  return (
  <main>
      <Header />
    <div>
      <div className={`transition-opacity duration-500 ${loading ? 'opacity-100' : 'opacity-0'}`}>
        {loading && <Loading onLoadingComplete={() => setLoading(false)} />}
      </div>
      <div
        className={` flex min-h-screen flex-col items-center justify-between p-10 text-white transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ visibility: loading ? 'hidden' : 'visible' }}
      >
        {sortedKeys.map((macAddress) => (
          <Widget key={macAddress} performanceInfo={performanceInfo[macAddress]} />
        ))}
      </div>
    </div>
  </main>



  );
};

export default Home;
