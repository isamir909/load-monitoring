import { Server as SocketIOServer } from 'socket.io';
import { createAdapter } from "@socket.io/mongo-adapter";
import { MongoClient } from "mongodb";
import socketMain from '../socketMain';
import cluster from 'cluster';
import net from 'net';
const DB = "socketio";
const COLLECTION = "socket.io-adapter-events";
const mongoClient = new MongoClient("mongodb://localhost:27017/");

export const setupSocketAdapter = async (server:any) => {
  // await mongoClient.connect();

  // const mongoCollection = mongoClient.db(DB).collection(COLLECTION);
  // await mongoCollection.createIndex(
  //   { createdAt: 1 },
  //   { expireAfterSeconds: 3600, background: true }
  // );

  // const io = new SocketIOServer({
  //   cors: {
  //     origin: "*",
  //     methods: ["GET", "POST"]
  //   }
  // });

  // io.adapter(createAdapter(mongoCollection, {
  //   addCreatedAtField: true
  // }));

  // return { io, mongoClient };



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
