import { Server as SocketIOServer } from "socket.io";
import createMachine from "./lib/createMachine";
import {mongoClient} from "./index"

const DB = "socketio";






async function socketMain(io: any, socket: any) {
  let machinePerformanceData:any={};
  
  // client auth with API key
  socket.on("clientAuth",async (clientAuth: any) => {
    console.log(clientAuth);
    if (clientAuth === "asdfgohyouehdha@#$%^&*(") {
      socket.join("clients");
    
    } else if (clientAuth === "@#$dfgbyouehdha@#$%^&*(") {
      socket.join("uiClient");
      // socket.join("ui");
      await mongoClient.connect();

      const mongoCollection =await mongoClient.db(DB).collection('machines');
      const machines = await mongoCollection.find({}).toArray(); // Convert cursor to array
      // console.log(machines, "mongoCollection");
      machines.map((machine: any) => {
        machine.isActive=false
        io.to('uiClient').emit('performanceData', machine);
      })
    } else {
      // An invalid client has joined
      socket.disconnect(true);
    }
  });

  socket.on("disconnect", async () => {

      // const preparedData = {
      //   macAddress: performanceData.macAddress,
      // cpuLoad: performanceData.cpuLoad, 
      // freeMemory: performanceData.freeMem,
      // totalMemory: performanceData.totalMem,
      // usedMemory: performanceData.usedMem,
      // memoryUsage: performanceData.memoryUsage,
      // osType: performanceData.osType,
      // upTime: performanceData.uptime,
      // cpuModel: performanceData.cpuModel,
      // numsOfCores: performanceData.numsOfCores,
      // cpuSpeed: performanceData.cpuSpeed,
      //   isActive: false
      // };
      await mongoClient.connect();

      const mongoCollection =await mongoClient.db(DB).collection('machines');
      await mongoCollection.findOneAndUpdate({macAddress:machinePerformanceData.macAddress},{$set:machinePerformanceData});
      machinePerformanceData.isActive=false
      io.to('uiClient').emit('performanceData', machinePerformanceData);
    
  });

  // A machine has connected check if it is a new client or an existing client
  // IF it's new add it
  socket.on("initPerformanceData", (performanceData: any) => {
    performanceData = performanceData;
    const preparedData = {
      macAddress: performanceData.macAddress,
      cpuLoad: performanceData.cpuLoad, 
      freeMemory: performanceData.freeMem,
      totalMemory: performanceData.totalMem,
      usedMemory: performanceData.usedMem,
      memoryUsage: performanceData.memoryUsage,
      osType: performanceData.osType,
      upTime: performanceData.uptime,
      cpuModel: performanceData.cpuModel,
      numsOfCores: performanceData.numsOfCores,
      cpuSpeed: performanceData.cpuSpeed,
      isActive:performanceData.isActive
    };
    createMachine(preparedData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  socket.on("performanceData", (performanceData: any) => {
    machinePerformanceData = performanceData;
    io.to("uiClient").emit("performanceData", performanceData);
  });
}
export default socketMain;
