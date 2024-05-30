import cluster from 'cluster';
import net from 'net';
import farmhash from 'farmhash';

export const setupCluster = (num_processes: number, port: number): void => {
  let workers: any = [];

  let spawn = function (i: number): void {
    workers[i] = cluster.fork();

    workers[i].on('exit', function (code: any, signal: any) {
      spawn(i);
    });
  };

  for (let i = 0; i < num_processes; i++) {
    spawn(i);
  }

  const worker_index = function (ip: string, len: number): number {
    return farmhash.fingerprint32(ip) % len;
  };

  const server = net.createServer({ pauseOnConnect: true }, (connection: net.Socket) => {
    let worker = workers[worker_index(connection.remoteAddress || '', num_processes)];
    if (worker) {
      worker.send('sticky-session:connection', connection);
    }
  });
  server.listen(port);
  console.log(`Master listening on port ${port}`);
  console.log(workers.length + ' workers are ready!');
};
