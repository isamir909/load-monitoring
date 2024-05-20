import os from 'os';
import { getCpuLoad } from './getCpuLoad';

export async function performanceData() {
  const osType = os.type() === 'Darwin' ? 'Mac' : os.type();
  const uptime = os.uptime();
  const freeMem = os.freemem();
  const totalMem = os.totalmem();
  const usedMem = totalMem - freeMem;
  const memoryUsage = Math.round((usedMem / totalMem) * 100);

  const cpu: os.CpuInfo[] = os.cpus();
  const numsOfCores = cpu.length;
  const cpuSpeed = cpu[0]?.speed;
  const cpuModel = cpu[0]?.model;
  const cpuLoad = await getCpuLoad();

  return {
    freeMem,
    totalMem,
    usedMem,
    memoryUsage,
    osType,
    uptime,
    cpuModel,
    numsOfCores,
    cpuSpeed,
    cpuLoad,
    macAddress: '',
    isActive: true
  };
}
