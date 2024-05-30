import { Server as SocketIOServer } from 'socket.io';
import { Server } from 'http';
import socketMain from '../socketMain';
import cluster from 'cluster';

export const setupSocketConnection = (io: SocketIOServer, server: Server) => {
  io.attach(server);

  io.on('connection', async (socket: any) => {
    await socketMain(io, socket);
    console.log(`connected to worker: ${cluster?.worker?.id}`);
  });
};
