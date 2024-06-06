import createMachine from "./lib/createMachine";
import { mongoClient } from "./index";
import type { ActivityLog } from "./models/Logs";
import createActivityLog from "./lib/createActivityLog";

const DB = process.env.DB_NAME || "";

async function socketMain(io: any, socket: any) {
  let machinePerformanceData: any = {};
  const nodeClientApiKey = process.env.NODECLIENT_API_KEY;
  const uiClientApiKey = process.env.UICLIENT_API_KEY;

  // client auth with API key
  socket.on("clientAuth", async (clientAuth: any) => {
    if (clientAuth === nodeClientApiKey) {
      socket.join("clients");
    } else if (clientAuth === uiClientApiKey) {
      socket.join("uiClient");
      // socket.join("ui");
      console.log("ui client joined");

      await mongoClient.connect();

      const mongoCollection = await mongoClient.db(DB).collection("machines");
      const machines = await mongoCollection.find({}).toArray(); // Convert cursor to array

      machines.map((machine: any) => {
        machine.isActive = false;
        io.to("uiClient").emit("performanceData", machine);
      });
    } else {
      // An invalid client has joined
      socket.disconnect(true);
    }
  });

  socket.on("disconnect", async () => {
    await mongoClient.connect();

    const mongoCollection = await mongoClient.db(DB);

    await mongoCollection
      .collection("machines")
      .findOneAndUpdate(
        { macAddress: machinePerformanceData.macAddress },
        { $set: machinePerformanceData }
      );
    const activitylog: ActivityLog = {
      macAddress: machinePerformanceData.macAddress,
      connectedOn: null,
      disconnectedOn: new Date(),
      type: "disconnected",
    };
    await createActivityLog(activitylog);
    machinePerformanceData.isActive = false;
    io.to("uiClient").emit("performanceData", machinePerformanceData);
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
      isActive: performanceData.isActive,
    };
    if (preparedData.macAddress) {
      createMachine(preparedData).then((res) => {
        console.log(res);
      });
      const activitylog: ActivityLog = {
        macAddress: performanceData.macAddress,
        connectedOn: new Date(),
        disconnectedOn: null,
        type: "connected",
      };
      createActivityLog(activitylog).then((res) => {
        console.log(res);
      });
    }
  });

  socket.on("performanceData", (performanceData: any) => {
    machinePerformanceData = performanceData;
    io.to("uiClient").emit("performanceData", performanceData);
  });
}
export default socketMain;
