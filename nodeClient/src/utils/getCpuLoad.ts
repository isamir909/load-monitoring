import os from 'os';

function cpuAverage() {
  const cpus: os.CpuInfo[] = os.cpus();
  let idleMs = 0;
  let totalMs: number = 0;

  cpus.forEach((cpu) => {
    for (const type in cpu.times) {
      if (Object.prototype.hasOwnProperty.call(cpu.times, type)) {
        totalMs += cpu.times[type as keyof typeof cpu.times];
      }
    }
    idleMs += cpu.times.idle;
  });

  return {
    idle: idleMs / cpus.length,
    total: totalMs / cpus.length,
  };
}

export async function getCpuLoad(): Promise<number> {
  const start = cpuAverage();

  await new Promise((resolve) => setTimeout(resolve, 100));

  const end = cpuAverage();
  const idle = end.idle - start.idle;
  const total = end.total - start.total;
  const percentageCpuLoad = 100 - Math.round((idle / total) * 100);

  return percentageCpuLoad;
}
