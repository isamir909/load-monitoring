// import { useState } from "react";
// import socket from './utils/socketConnection';
// import Widget from './components/Widget';

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

// export default function Home() {
//   const [performanceInfo, setPerformanceInfo] = useState<PerformanceInfoState>({});

//   useEffect(() => {
//     socket.on("performanceData", (performanceData: PerformanceInfo) => {
//       setPerformanceInfo((prevState) => ({
//         ...prevState,
//         [performanceData.macAddress]: performanceData,
//       }));
//     });

//     console.log(performanceInfo);
    
//     // Cleanup the socket connection when the component unmounts
//     return () => {
//       socket.off("performanceData");
//     };
//   }, []);
 
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24 text-white">

//       {Object.keys(performanceInfo).map((macAddress) => (
//         <Widget key={macAddress} performanceInfo={performanceInfo[macAddress]} />
//       ))}
//     </main>
//   );
// }





// import { useEffect, useState } from "react";
// import setupSocketConnection from './utils/SocketConnection';
// import Widget from './components/Widget';

// // Define types for performance data
// export interface PerformanceInfo {
//   freeMem: number;
//   totalMem: number;
//   usedMem: number;
//   memoryUsage: number;
//   osType: string;
//   uptime: number;
//   cpuModel: string;
//   numsOfCores: number;
//   cpuSpeed: number;
//   cpuLoad: number;
//   macAddress: string;
//   isActive: boolean;
// }

// // Define type for performance data state
// type PerformanceInfoState = Record<string, PerformanceInfo>;

// export default function Home() {
//   const [performanceInfo, setPerformanceInfo] = useState<PerformanceInfoState>({});

//   useEffect(() => {
//     let socket: any

//     const fetchData = async () => {
//       try {
//         socket = await setupSocketConnection(); // Wait for the socket connection
//         // Listen for performance data from the socket
//         socket.on("performanceData", (performanceData: PerformanceInfo) => {
//           console.log(performanceData, "performanceData");
//           setPerformanceInfo((prevState) => ({
//             ...prevState,
//             [performanceData.macAddress]: performanceData,
//           }));
//         });

//         // Cleanup the socket connection when the component unmounts
//         return () => {
//           if (socket) {
//             socket.off("performanceData");
//             socket.disconnect(); // Disconnect the socket when component unmounts
//           }
//         };
//       } catch (error) {
//         console.error("Error connecting to socket:", error);
//         // Clean up if an error occurs during connection
//         if (socket) {
//           socket.off("performanceData");
//           socket.disconnect();
//         }
//       }
//     };

//     fetchData();

//     // Remove the dependency array from useEffect since we only want to run this once
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24 text-white">
//       {/* {Object.keys(performanceInfo).map((macAddress) => (
//         <Widget key={macAddress} performanceInfo={performanceInfo[macAddress]} />
//       ))} */}
//       <>Hi</>
//     </main>
//   );
// }


// =================+=============================


// import { useEffect } from 'react';
// import useSocket from './utils/useSocket'; // Adjust the path as needed

// const Home = () => {
//   const socket = useSocket();
//     const [performanceInfo, setPerformanceInfo] = useState<PerformanceInfoState>({});

//   useEffect(() => {
//     if (socket) {
//       socket.on("performanceData", (performanceData: PerformanceInfo) => {
//         console.log(performanceData,"performanceData");
//       setPerformanceInfo((prevState) => ({
//         ...prevState,
//         [performanceData.macAddress]: performanceData,
//       }));

//     });
//     return () => {
//       socket.off("performanceData");
//     };
//   }

//   }, [socket]);


//   return (
//        <main className="flex min-h-screen flex-col items-center justify-between p-24 text-white">

//       {Object.keys(performanceInfo).map((macAddress) => (
//         <Widget key={macAddress} performanceInfo={performanceInfo[macAddress]} />
//       ))}
//     </main>
//   );
// };

// export default Home;




import { useEffect, useState } from 'react';
import useSocket from './utils/useSocket'; // Adjust the path as needed
import Widget from './components/Widget'; // Import your Widget component
import Loading from './components/Loading';

const Home = () => {
  const socket = useSocket();
  const [performanceInfo, setPerformanceInfo] = useState<PerformanceInfoState>({});
// console.log(process.env.NEXT_PUBLIC_UICLIENT_API_KEY,"process.env.NEXT_PUBLIC_UICLIENT_API_KEY");

  // useEffect(() => {
  //   if (socket) {
  //     socket.on("performanceData", (performanceData: PerformanceInfo) => {
  //       console.log(performanceData,"performanceData");

  //       // Update performanceInfo state with new data
  //       setPerformanceInfo((prevState) => ({
  //         ...prevState,
  //         [performanceData.macAddress]: performanceData,
  //       }));
  //     });

  //     return () => {
  //       // Clean up the event listener when component unmounts
  //       socket.off("performanceData");
  //     };
  //   }
  // }, [socket]);



    useEffect(() => {
    if (socket) {
      const handlePerformanceData = (performanceData:PerformanceInfo) => {
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

  console.log("Performance Info:", performanceInfo);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 text-white">
      {Object.keys(performanceInfo).length === 0 && <Loading />}
      {Object.keys(performanceInfo).map((macAddress) => (
        <Widget  key={macAddress} performanceInfo={performanceInfo[macAddress]} />
      ))}
    </main>
  );
};

export default Home;






// import { useEffect, useState } from 'react';
// import useSocket from './utils/useSocket'; // Adjust the path as needed
// import Widget from './components/Widget'; // Import your Widget component

// const Home = () => {
//   const socket = useSocket();
//   const [performanceInfo, setPerformanceInfo] = useState({});

//   useEffect(() => {
//     if (socket) {
//       const handlePerformanceData = (performanceData:PerformanceInfo) => {
//         console.log(performanceData, "performanceData");

//         // Update performanceInfo state with new data
//         setPerformanceInfo((prevState) => ({
//           ...prevState,
//           [performanceData.macAddress]: performanceData,
//         }));
//       };

//       socket.on("performanceData", handlePerformanceData);

//       return () => {
//         // Clean up the event listener when component unmounts
//         socket.off("performanceData", handlePerformanceData);
//       };
//     }
//   }, [socket]);

//   console.log("Performance Info:", performanceInfo);

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24 text-white">
//       {Object.keys(performanceInfo).map((macAddress) => (
//         <Widget key={macAddress} performanceInfo={performanceInfo[macAddress]} />
//       ))}
//     </main>
//   );
// };

// export default Home;
