import { Server as SocketIOServer } from 'socket.io';
import dotenv from 'dotenv';
dotenv.config()
import { createAdapter } from "@socket.io/mongo-adapter";
import { MongoClient } from "mongodb";
import socketMain from '../socketMain';
import cluster from 'cluster';
import net from 'net';




const mongoConnectionString=process.env.DB_CONNECTION_STRING || ""




const DB =  process.env.DB_NAME || ''
const COLLECTION = "socket.io-adapter-events";
const mongoClient = new MongoClient(mongoConnectionString);

export const setupSocketAdapter = async (server:any) => {

  const io = new SocketIOServer(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });


    await mongoClient.connect();

    const mongoCollection = mongoClient.db(DB).collection(COLLECTION);
    await mongoCollection.createIndex(
      { createdAt: 1 },
      { expireAfterSeconds: 3600, background: true }
    );

    io.adapter(createAdapter(mongoCollection, {
      addCreatedAtField: true
    }));

    io.on('connection', async (socket: any) => {
      await socketMain(io, socket); // Call socketMain with await
      console.log(`connected to worker: ${cluster?.worker?.id}`);
    });

    process.on('message', function(message: any, connection: net.Socket) {
      if (message !== 'sticky-session:connection') {
        return;
      }
  
      server.emit('connection', connection);
      connection.resume();
    });
};
