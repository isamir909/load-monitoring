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

  // Destructure properties from performanceInfo with default values
  const {
    freeMem = 0,
    totalMem = 0,
    usedMem = 0,
    memoryUsage = 0,
    osType = "",
    uptime = "",
    cpuModel = "",
    numsOfCores = 0,
    cpuSpeed = "",
    cpuLoad = 0,
    isActive = false
  } = performanceInfo;

  // Create objects for props to be passed to child components
  const cpuProps = { cpuLoad };
  const memProps = { memoryUsage, freeMem, totalMem, usedMem };
  const infoProps = { osType, uptime, cpuModel, numsOfCores, cpuSpeed };

  return (
    <div className="relative flex bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-full max-w-screen-lg flex-row">
      <div className="relative w-4/12 m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0">
        <Cpu {...cpuProps} />
      </div>
       <div className="w-4/12">
        {/* <Mem {...memProps} /> */}
      </div>
      <div className="w-4/12">
        {/* <Info {...infoProps} /> */}
      </div> 
    </div>
  );
};

export default Widget;

