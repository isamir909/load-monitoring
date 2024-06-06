import React from "react";
import Cpu from "./Cpu";
import Mem from "./Mem";
import Info from "./Info";
import { PerformanceInfo } from "../index";
import { useRouter } from 'next/router';

interface WidgetProps {
  performanceInfo: PerformanceInfo | undefined; // Make performanceInfo optional
}

const Widget: React.FC<WidgetProps> = ({ performanceInfo }) => {
  const router = useRouter();

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
    cpuSpeed: cpuSpeed ?? 0,
    connectedOn: performanceInfo.connectedOn,
    disconnectedOn: performanceInfo.disconnectedOn
  };

  // Conditional classes based on isActive
  const containerClass =
    "relative flex bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-full max-w-screen-2xl flex-row mb-10 bg-cyan-100";
 
    const stripeClass =  ` border rounded-xl  absolute left-0 top-0 bottom-0 ${isActive ? "bg-green-500" : "bg-red-500"} w-8`;
  // const stripeStyle = { width: "30px" };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Navigate to the logs page with the macAddress as the id
    router.push(`/logs/${performanceInfo.macAddress}`);
  };

  return (
    <div className={containerClass}>
      <div className={stripeClass}></div>
      <div className="relative flex w-full ">
        <div
          className={`absolute left-0 top-0 bottom-0 flex items-center justify-center w-8   ${
            isActive ? "text-green-500" : "text-white"
          }`}
        >
          <div className="transform rotate-90 text-white">
            {isActive ? "Online" : "Offline"}
          </div>
        </div>
        <div className="relative w-4/12 ml-8 m-0 overflow-hidden text-gray-700 rounded-r-none bg-clip-border rounded-xl shrink-0">
          <Cpu {...cpuProps} />
        </div>
        <div className="w-4/12">
          <Mem {...memProps} />
        </div>
        <div className="w-4/12" onClick={handleClick} >
          <Info {...infoProps} />
        </div>
      </div>
    </div>
  );
};

export default Widget;
