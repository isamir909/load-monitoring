
// import React from "react";
// import Cpu from "./Cpu";
// import Mem from "./Mem";
// import Info from "./Info";
// import { PerformanceInfo } from "../index";

// interface WidgetProps {
//   performanceInfo: PerformanceInfo | undefined; // Make performanceInfo optional
// }

// const Widget: React.FC<WidgetProps> = ({ performanceInfo }) => {
//   // Check if performanceInfo is defined before accessing its properties
//   if (!performanceInfo) {
//     return <div>Loading...</div>; // or render an error message
//   }

//   // Destructure properties from performanceInfo with default values
//   const {
//     freeMem = 0,
//     totalMem = 0,
//     usedMem = 0,
//     memoryUsage = 0,
//     osType = "",
//     uptime = 0,  // Ensure uptime is treated as a number
//     cpuModel = "",
//     numsOfCores = 0,
//     cpuSpeed = 0,  // Ensure cpuSpeed is treated as a number
//     cpuLoad = 0,
//     isActive = false
//   } = performanceInfo;

//   // Create objects for props to be passed to child components
//   const cpuProps = { cpuLoad };
//   const memProps = { memoryUsage, freeMem, totalMem, usedMem };
//   const infoProps =  { osType, uptime, cpuModel, numsOfCores, cpuSpeed };  // Create info object

//   return (
//     <div className="relative flex bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-full max-w-screen-2xl flex-row mb-10">
//       <h1>
//         {isActive ? "Active" : "Inactive"}   
//       </h1>
//       <div className="relative w-4/12 m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0">
//         <Cpu {...cpuProps} />
//       </div>
//        <div className="w-4/12">
//         <Mem {...memProps} />
//       </div>
//       <div className="w-4/12">
//         <Info {...infoProps} /> 
//       </div> 
//     </div>
//   );
// };

// // export default Widget;
// import React from "react";
// import Cpu from "./Cpu";
// import Mem from "./Mem";
// import Info from "./Info";
// import { PerformanceInfo } from "../index";

// interface WidgetProps {
//   performanceInfo: PerformanceInfo | undefined; // Make performanceInfo optional
// }

// const Widget: React.FC<WidgetProps> = ({ performanceInfo }) => {
//   // Check if performanceInfo is defined before accessing its properties
//   if (!performanceInfo) {
//     return <div>Loading...</div>; // or render an error message
//   }

//   // Destructure properties from performanceInfo with default values
//   const {
//     freeMem = 0,
//     totalMem = 0,
//     usedMem = 0,
//     memoryUsage = 0,
//     osType = "",
//     uptime = 0,  // Ensure uptime is treated as a number
//     cpuModel = "",
//     numsOfCores = 0,
//     cpuSpeed = 0,  // Ensure cpuSpeed is treated as a number
//     cpuLoad = 0,
//     isActive = false
//   } = performanceInfo;

//   // Create objects for props to be passed to child components
//   const cpuProps = { cpuLoad };
//   const memProps = { memoryUsage, freeMem, totalMem, usedMem };
//   const infoProps = { osType, uptime, cpuModel, numsOfCores, cpuSpeed };  // Create info object

//   // Conditional classes based on isActive
//   const containerClass = "relative flex bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-full max-w-screen-2xl flex-row mb-10";
//   const stripeClass = isActive ? "" : "absolute left-0 top-0 bottom-0 bg-red-500";
//   const stripeStyle = { width: "30px" };

//   return (
//     <div className={containerClass}>
//       {!isActive && (
//         <div className={stripeClass} style={stripeStyle}></div>
//       )}
//       <div className={`flex flex-col pl-8 ${!isActive && "text-red-500"}`}>
//         <h1 className="pt-2">
//           {isActive ? "Active" : "Inactive"}
//         </h1>
//       </div>
//       <div className="relative w-4/12 m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0">
//         <Cpu {...cpuProps} />
//       </div>
//       <div className="w-4/12">
//         <Mem {...memProps} />
//       </div>
//       <div className="w-4/12">
//         <Info {...infoProps} />
//       </div>
//     </div>
//   );
// };

// export default Widget;












// import React from "react";
// import Cpu from "./Cpu";
// import Mem from "./Mem";
// import Info from "./Info";
// import { PerformanceInfo } from "../index";

// interface WidgetProps {
//   performanceInfo: PerformanceInfo | undefined; // Make performanceInfo optional
// }

// const Widget: React.FC<WidgetProps> = ({ performanceInfo }) => {
//   // Check if performanceInfo is defined before accessing its properties
//   if (!performanceInfo) {
//     return <div>Loading...</div>; // or render an error message
//   }

//   // Destructure properties from performanceInfo without default values
//   const {
//     freeMem,
//     totalMem,
//     usedMem,
//     memoryUsage,
//     osType,
//     uptime,
//     cpuModel,
//     numsOfCores,
//     cpuSpeed,
//     cpuLoad,
//     isActive
//   } = performanceInfo;

//   // Create objects for props to be passed to child components
//   const cpuProps = { cpuLoad };
//   const memProps = { memoryUsage, freeMem, totalMem, usedMem };
//   const infoProps = { osType, uptime, cpuModel, numsOfCores, cpuSpeed };

//   // Conditional classes based on isActive
//   const containerClass = "relative flex bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-full max-w-screen-2xl flex-row mb-10";
//   const stripeClass = isActive ? "" : "absolute left-0 top-0 bottom-0 bg-red-500";
//   const stripeStyle = { width: "30px" };

//   return (
//     <div className={containerClass}>
//       {!isActive && (
//         <div className={stripeClass} style={stripeStyle}></div>
//       )}
//       <div className={`flex flex-col pl-8 ${!isActive && "text-red-500"}`}>
//         <h1 className="pt-2">
//           {isActive ? "Active" : "Inactive"}
//         </h1>
//       </div>
//       <div className="relative w-4/12 m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0">
//         <Cpu {...cpuProps} />
//       </div>
//       <div className="w-4/12">
//         <Mem {...memProps} />
//       </div>
//       <div className="w-4/12">
//         <Info {...infoProps} />
//       </div>
//     </div>
//   );
// };

// export default Widget;










import React from "react";
import Cpu from "./Cpu";
import Mem from "./Mem";
import Info from "./Info";
import { PerformanceInfo } from "../index";

interface WidgetProps {
  performanceInfo: PerformanceInfo | undefined; // Make performanceInfo optional
}

const Widget: React.FC<WidgetProps> = ({ performanceInfo }) => {
  // Check if performanceInfo is defined before accessing its properties
  if (!performanceInfo) {
    return <div>Loading...</div>; // or render an error message
  }

  // Destructure properties from performanceInfo with nullish coalescing for fallback values
  const {
    freeMem = 0,
    totalMem = 0,
    usedMem = 0,
    memoryUsage = 0,
    osType = "",
    uptime = 0,
    cpuModel = "",
    numsOfCores = 0,
    cpuSpeed = 0,
    cpuLoad = 0,
    isActive = false
  } = performanceInfo;

  // Create objects for props to be passed to child components
  const cpuProps = { cpuLoad: cpuLoad ?? 0 };
  const memProps = {
    memoryUsage: memoryUsage ?? 0,
    freeMem: freeMem ?? 0,
    totalMem: totalMem ?? 0,
    usedMem: usedMem ?? 0
  };
  const infoProps = {
    osType: osType ?? "",
    uptime: uptime ?? 0,
    cpuModel: cpuModel ?? "",
    numsOfCores: numsOfCores ?? 0,
    cpuSpeed: cpuSpeed ?? 0
  };

  // Conditional classes based on isActive
  const containerClass =
    "relative flex bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-full max-w-screen-2xl flex-row mb-10 ";
 
    const stripeClass =  `absolute left-0 top-0 bottom-0 ${isActive ? "bg-green-500" : "bg-red-500"} w-1/5`;
  // const stripeStyle = { width: "30px" };

  return (
    <div className={containerClass}>
      <div className={stripeClass}></div>
      <div className="relative flex w-full ">
        <div
          className={`absolute left-0 top-0 bottom-0 flex items-center justify-center w-8 ${
            isActive ? "text-green-500" : "text-white"
          }`}
        >
          <div className="transform rotate-90 text-white">
            {isActive ? "Online" : "Offline"}
          </div>
        </div>
        <div className="relative w-4/12 ml-8 m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0">
          <Cpu {...cpuProps} />
        </div>
        <div className="w-4/12">
          <Mem {...memProps} />
        </div>
        <div className="w-4/12">
          <Info {...infoProps} />
        </div>
      </div>
    </div>
  );
};

export default Widget;
