// Node program that captures the local performance data and send back to the socket.io server
// Requirenments for showing performance
/*
- cpu load
- memory usage
    -   free
    -   total
- os type
- uptime
- cpu info
    - type
    - no of cores
    - clock speed
*/

import os from "os";
import io from "socket.io-client";
const socket = io("http://localhost:8181");
socket.on("connect", () => {
  console.log("connected to socket server!!!!");
  // We need a way to identify the machine 


// oAuth with API key 
  socket.emit('clientAuth','asdfgohyouehdha@#$%^&*(')




// get the mac address of the machine
  let macAdd= fetchMacAddress();

  // We will go with the mac address of the machine 
  performanceData().then((allPerformanceData) => {

    if(macAdd)
    allPerformanceData['macAddress']=macAdd
    socket.emit("initPerformanceData", allPerformanceData);

    
  });

  let perfDataInterval=setInterval(() => {
    performanceData().then((allPerformanceData) => {

    if(macAdd)
      allPerformanceData['macAddress']=macAdd
      socket.emit("performanceData", allPerformanceData);
      // console.log(allPerformanceData);
      
    });
  },1000)



  socket.on("disconnect", () => {
    clearInterval(perfDataInterval);
    console.log("disconnected from socket server!!!!");
  })
})




async function performanceData() {
  let osType = os.type() === "Darwin" ? "Mac" : os.type();

  // console.log(osType);
  const uptime = os.uptime();
  console.log(uptime);

  const freeMem = os.freemem();
  // console.log(freeMem);

  const totalMem = os.totalmem();
  const usedMem = totalMem - freeMem;
  // console.log(usedMem);
  // console.log(totalMem);
  // const memoryUsage = Math.round(((usedMem / totalMem) * 100) / 100);
    // Corrected calculation for memory usage
    const memoryUsage = Math.round((usedMem / totalMem) * 100); // Fix: calculate the percentage properly

  // console.log(memoryUsage, "memoryUsage");

  const cpu: os.CpuInfo[] = os.cpus();

  const numsOfCores = cpu.length;
  const cpuSpeed = cpu[0]?.speed;
  // console.log(cpuSpeed, "cpuSpeed");
  
  const cpuLoad = await getCpuLoad();
  const cpuModel = cpu[0]?.model;
  // console.log(uptime, "`uptime`");
  return {
    freeMem,
    totalMem,
    usedMem,
    memoryUsage,
    osType,
    uptime,
    cpuModel,
    numsOfCores,
    cpuSpeed,
    cpuLoad,
    macAddress:'',
    isActive:true
  };
}

// cpu is a all core we need a overall performance of  the all cores which will give us cpu load average

function cpuAverage() {
  // Get the ms fro the each mode but this number is since reboot
  // so get it now and get it after 100ms
  const cpus: os.CpuInfo[] = os.cpus();
  let idleMs = 0;
  let totalMs: number = 0;

  cpus.forEach((cpu) => {
    // loop through each property of the cpu
    for (const type in cpu.times) {
      if (Object.prototype.hasOwnProperty.call(cpu.times, type)) {
        totalMs += cpu.times[type as keyof typeof cpu.times];
      }
    }
    idleMs += cpu.times.idle;
  });

  return {
    idle: idleMs / cpus.length,
    total: totalMs / cpus.length,
  };
}
const cpu: os.CpuInfo[] = os.cpus();
// console.log(cpuAverage());

async function getCpuLoad() {
  // get cpu load
  const start = cpuAverage();

  // wait for 100 ms
  await new Promise((resolve) => setTimeout(resolve, 100));

  // get cpu load
  const end = cpuAverage();
  // calculate the difference
  const idle = end.idle - start.idle;
  const total = end.total - start.total;
  // calculate the percentage
  const percentageCpuLoad = 100 - Math.round((idle / total) * 100);

  return percentageCpuLoad;
}



function fetchMacAddress() {
  const nI=os.networkInterfaces();

  // Finding mac address of the machine   // 
    let macAddress;
  for (const name of Object.keys(nI)) {
      const interfaces : os.NetworkInterfaceInfo[] | undefined = nI[name];
      if(!interfaces) continue;
      for (const iface of interfaces) {
          if (iface.family === 'IPv4' && !iface.internal) {
              macAddress = iface.mac;
              break; 
          }
      }
  }
  return macAddress
}