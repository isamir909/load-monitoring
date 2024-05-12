import io from "socket.io-client";

const socket = io("http://localhost:8181");

socket.on("connect", () => {
    console.log("connected to socket server!!!!");
  
  // oAuth with API key 
    socket.emit('clientAuth','@#$dfgbyouehdha@#$%^&*(')
  
    

    socket.on("disconnect", () => {
      console.log("disconnected from socket server!!!!");
    })
  })