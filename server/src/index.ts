// import cluster from 'node:cluster';
// import http from 'node:http';
// import { availableParallelism } from 'node:os';
// import process from 'node:process';

// const numCPUs = availableParallelism();

// if (cluster.isPrimary) {
//   console.log(`Primary ${process.pid} is running`);

//   // Fork workers.
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }

//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`worker ${worker.process.pid} died!`);
//   });
// } else {
//   // Workers can share any TCP connection
//   // In this case it is an HTTP server
//   http.createServer((req, res) => {
//     res.writeHead(200);
//     res.end('hello world.\n');
//     console.log(`Worker ${process.pid} received request`);
//   }).listen(8080);

//   console.log(`Worker ${process.pid} started`);
// }
// import express from 'express';
// import { createServer } from 'http';
// import { Server } from 'socket.io';
// import cluster from 'cluster';
// import os from 'os';
// import { createAdapter } from '@socket.io/cluster-adapter'; 
// import { setupWorker } from '@socket.io/sticky'; 

// const PORT = process.env.PORT || 3000;
// const numCPUs = os.cpus().length;

// if (cluster.isPrimary) {
//   console.log(`Primary ${process.pid} is running`);

//   // Fork workers
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }

//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`worker ${worker.process.pid} died`);
//     cluster.fork(); 
//   });
// } else {
//   const app = express();
//   const server = createServer(app);
//   // Important: Share the adapter across workers
//   const io = new Server(server, {
//     adapter: createAdapter() 
//   });

//   setupWorker(io); 

//   io.on('connection', (socket) => {
//     console.log('Client connected:', socket.id, 'on process:', process.pid);

//     socket.on('disconnect', () => {
//       console.log('Client disconnected:', socket.id);
//     });

//     // Your socket event listeners here
//   });

//   app.get('/', (req, res) => {
//     res.send(`Server on process ${process.pid}`);
//   });

//   server.listen(PORT, () => {
//     console.log(`Server running on port ${PORT} (process ${process.pid})`);
//   });
// }



// import express from 'express';
// import cluster from 'cluster';
// import net from 'net';
// import { Server as SocketIOServer } from 'socket.io';
// import farmhash from 'farmhash';
// import os from 'os';
//  import helmet from 'helmet';

// import socketMain from './socketMain';


// const port: number = 8181;
// const num_processes: number = os.availableParallelism();



// import { createAdapter } from "@socket.io/mongo-adapter";
// import { MongoClient } from "mongodb";

// const DB = "socketio";
// const COLLECTION = "socket.io-adapter-events";
// const mongoClient = new MongoClient("mongodb://localhost:27017/");
// // import fir
// if (cluster.isPrimary) {
// 	// This stores our workers. We need to keep them to be able to reference
// 	// them based on source IP address. It's also useful for auto-restart,
// 	// for example.
// 	let workers: any = [];

// 	// Helper function for spawning worker at index 'i'.
// 	let spawn = function(i: number): void {
// 		workers[i] = cluster.fork();

// 		// Optional: Restart worker on exit
// 		workers[i].on('exit', function(code:any, signal:any) {
// 			// console.log('respawning worker', i);
// 			spawn(i);
// 		});
//     };

//     // Spawn workers.
// 	for (let i = 0; i < num_processes; i++) {
//     // console.log(`Spawning worker ${i}...`);
    
// 		spawn(i);
// 	}

// 	// Helper function for getting a worker index based on IP address.
// 	// This is a hot path so it should be really fast. The way it works
// 	// is by converting the IP address to a number by removing non numeric
//     // characters, then compressing it to the number of slots we have.
// 	//
// 	// Compared against "real" hashing (from the sticky-session code) and
// 	// "real" IP number conversion, this function is on par in terms of
// 	// worker index distribution only much faster.
// 	const worker_index = function(ip: string, len: number): number {
// 		return farmhash.fingerprint32(ip) % len; // Farmhash is the fastest and works with IPv6, too
// 	};


//     // in this case, we are going to start up a tcp connection via the net
//     // module INSTEAD OF the http module. Express will use http, but we need
//     // an independent tcp port open for cluster to work. This is the port that 
//     // will face the internet
// 	const server = net.createServer({ pauseOnConnect: true }, (connection: net.Socket) =>{
// 		// We received a connection and need to pass it to the appropriate
// 		// worker. Get the worker for this connection's source IP and pass
// 		// it the connection.
// 		let worker = workers[worker_index(connection.remoteAddress || '', num_processes)];
// 		if (worker) {
// 			worker.send('sticky-session:connection', connection);
// 		}
//     });
//     server.listen(port);
//     console.log(`Master listening on port ${port}`);
//     console.log(workers.length + ' workers are ready!');
    
// } else {
//     // Note we don't use a port here because the master listens on it for us.
   
//     const app = express();

//     app.use(helmet());
    
// 	// Don't expose our internal server to the outside world.
//     const server = app.listen(0, 'localhost');
//     // console.log("Worker listening...");    
//     // const io: SocketIOServer = new SocketIOServer(server);

// 		const io=new SocketIOServer(server,{
// 			cors: {
// 				origin: "*", // Allow requests from any origin
// 				methods: ["GET", "POST"] // Add any other methods your frontend uses
// 			}
// 		})

// 	// Tell Socket.IO to use the redis adapter. By default, the redis
			
	 	
// 		await mongoClient.connect();

// 		const mongoCollection = mongoClient.db(DB).collection(COLLECTION);

// 		await mongoCollection.createIndex(
// 		{ createdAt: 1 },
// 		{ expireAfterSeconds: 3600, background: true }
// 		);

// 		io.adapter(createAdapter(mongoCollection, {
// 		addCreatedAtField: true
// 		}));

//     // Here you might use Socket.IO middleware for authorization etc.
// 	// on connection, send the socket over to our module with socket stuff
//   io.on('connection', function(socket: any) {
//     socketMain(io, socket);
//     console.log(`connected to worker: ${cluster?.worker?.id}`);
//   });
  
//   // socketMain(io, null);
// process.on('message', function(message: any, connection: net.Socket) {
  
//     if (message !== 'sticky-session:connection') {
//         return;
//     }

//     server.emit('connection', connection);

//     connection.resume();
// 	});
// }

// export {mongoClient}




import express from 'express';
import cluster from 'cluster';
import os from 'os';
import helmet from 'helmet';

import { MongoClient } from "mongodb";
import { setupCluster } from './utils/clusterSetup';
import { setupSocketAdapter } from './utils/adapterSetup';

const mongoClient = new MongoClient("mongodb://localhost:27017/");

const port: number = 8181;
const num_processes: number = os.availableParallelism();

if (cluster.isPrimary) {
  setupCluster(num_processes, port);
} else {
  // Note we don't use a port here because the master listens on it for us.
  const app = express();
  app.use(helmet());

  // Don't expose our internal server to the outside world.
  const server = app.listen(0, 'localhost');
   setupSocketAdapter(server).then(()=>{
     console.log(`Worker listening...`);
   });
  
}

export { mongoClient };



// import express from 'express';
// import cluster from 'cluster';
// import net from 'net';
// import { Server as SocketIOServer } from 'socket.io';
// import farmhash from 'farmhash';
// import os from 'os';
// import helmet from 'helmet';

// import socketMain from './socketMain';
// import { createAdapter } from "@socket.io/mongo-adapter";
// import { MongoClient } from "mongodb";

// const DB = "socketio";
// const COLLECTION = "socket.io-adapter-events";
// const mongoClient = new MongoClient("mongodb://localhost:27017/");

// const port: number = 8181;
// const num_processes: number = os.availableParallelism();

// if (cluster.isPrimary) {
//   // This stores our workers. We need to keep them to be able to reference
//   // them based on source IP address. It's also useful for auto-restart,
//   // for example.
//   let workers: any = [];

//   // Helper function for spawning worker at index 'i'.
//   let spawn = function(i: number): void {
//     workers[i] = cluster.fork();

//     // Optional: Restart worker on exit
//     workers[i].on('exit', function(code:any, signal:any) {
//       spawn(i);
//     });
//   };

//   // Spawn workers.
//   for (let i = 0; i < num_processes; i++) {
//     spawn(i);
//   }

//   // Helper function for getting a worker index based on IP address.
//   // This is a hot path so it should be really fast. The way it works
//   // is by converting the IP address to a number by removing non numeric
//   // characters, then compressing it to the number of slots we have.
//   //
//   // Compared against "real" hashing (from the sticky-session code) and
//   // "real" IP number conversion, this function is on par in terms of
//   // worker index distribution only much faster.
//   const worker_index = function(ip: string, len: number): number {
//     return farmhash.fingerprint32(ip) % len; // Farmhash is the fastest and works with IPv6, too
//   };

//   // in this case, we are going to start up a tcp connection via the net
//   // module INSTEAD OF the http module. Express will use http, but we need
//   // an independent tcp port open for cluster to work. This is the port that 
//   // will face the internet
//   const server = net.createServer({ pauseOnConnect: true }, (connection: net.Socket) =>{
//     // We received a connection and need to pass it to the appropriate
//     // worker. Get the worker for this connection's source IP and pass
//     // it the connection.
//     let worker = workers[worker_index(connection.remoteAddress || '', num_processes)];
//     if (worker) {
//       worker.send('sticky-session:connection', connection);
//     }
//   });
//   server.listen(port);
//   console.log(`Master listening on port ${port}`);
//   console.log(workers.length + ' workers are ready!');

// } else {
//   // Note we don't use a port here because the master listens on it for us.
//   const app = express();
//   app.use(helmet());

//   // Don't expose our internal server to the outside world.
//   const server = app.listen(0, 'localhost');

//   const io = new SocketIOServer(server, {
//     cors: {
//       origin: "*",
//       methods: ["GET", "POST"]
//     }
//   });

//   (async () => {
//     await mongoClient.connect();

//     const mongoCollection = mongoClient.db(DB).collection(COLLECTION);
//     await mongoCollection.createIndex(
//       { createdAt: 1 },
//       { expireAfterSeconds: 3600, background: true }
//     );

//     io.adapter(createAdapter(mongoCollection, {
//       addCreatedAtField: true
//     }));

//     io.on('connection', async (socket: any) => {
//       await socketMain(io, socket); // Call socketMain with await
//       console.log(`connected to worker: ${cluster?.worker?.id}`);
//     });
//   })();

//   process.on('message', function(message: any, connection: net.Socket) {
//     if (message !== 'sticky-session:connection') {
//       return;
//     }

//     server.emit('connection', connection);
//     connection.resume();
//   });
// }

// export { mongoClient };

