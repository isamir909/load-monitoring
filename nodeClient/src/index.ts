// // Node program that captures the local performance data and send back to the socket.io server
// // Requirenments for showing performance
// /*
// - cpu load
// - memory usage
//     -   free
//     -   total
// - os type
// - uptime
// - cpu info
//     - type
//     - no of cores
//     - clock speed
// */


import dotenv from 'dotenv';
dotenv.config()
import io from 'socket.io-client';
import http from 'http'; 
const PORT = process.env.PORT 
import { performanceData } from './utils/getPerformanceData';
import { fetchMacAddress } from './utils/fetchMacAdd';




// Adding a http port to deploy on the free cloud provider 
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Dummy server running\n');
});

server.listen(PORT, () => {
  console.log(`HTTP server listening on port ${PORT}`);
});




const socket = io(process.env.SOCKET_SERVER_URL  || '');

socket.on("connect", async () => {
  console.log("connected to socket server!!!!");
  
  socket.emit('clientAuth', process.env.NODECLIENT_API_KEY);

  const macAddress = fetchMacAddress();
  const initialData = await performanceData();
  if (macAddress) initialData.macAddress = macAddress;
  
  socket.emit("initPerformanceData", initialData);

  const perfDataInterval = setInterval(async () => {
    const data = await performanceData();
    if (macAddress) data.macAddress = macAddress;
    socket.emit("performanceData", data);
  }, 1000);

  socket.on("disconnect", () => {
    clearInterval(perfDataInterval);
    console.log("disconnected from socket server!!!!");
  });
});
