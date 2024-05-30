import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import cluster from 'cluster';
import os from 'os';
import helmet from 'helmet';

import { MongoClient } from "mongodb";
import { setupCluster } from './utils/clusterSetup';
import { setupSocketAdapter } from './utils/adapterSetup';

const mongoConnectionString=process.env.DB_CONNECTION_STRING || ""

const mongoClient = new MongoClient(mongoConnectionString);

const port: number = Number(process.env.PORT) || 8000;
const num_processes: number = os.availableParallelism();


if (cluster.isPrimary) {
  setupCluster(num_processes, port);
} else {
  // Note we don't use a port here because the master listens on it for us.
  const app = express();
  app.use(helmet());

  app.get('/test', (req, res) => {
    res.send('Test endpoint working!');
  });
  // Don't expose our internal server to the outside world.
  const server = app.listen(0, 'localhost');

   setupSocketAdapter(server).then(()=>{
   });
  
}

export { mongoClient };

