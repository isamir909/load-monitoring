import { Server as SocketIOServer } from 'socket.io';
function socketMain(io:any,socket:any) {
    console.log("A socket connected@",socket.id);
}
export default socketMain