import os from 'os';

export function fetchMacAddress(): string | undefined {
  const nI = os.networkInterfaces();

  // Finding mac address of the machine
  let macAddress: string | undefined;
  for (const name of Object.keys(nI)) {
    const interfaces: os.NetworkInterfaceInfo[] | undefined = nI[name];
    if (!interfaces) continue;
    for (const iface of interfaces) {
      if (iface.family === 'IPv4' && !iface.internal) {
        macAddress = iface.mac;
        break;
      }
    }
  }
  return macAddress;
}
