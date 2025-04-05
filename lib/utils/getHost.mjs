import os from 'os';

export const getAllLocalIPv4Addresses = () => {
  const interfaces = os.networkInterfaces();

  return Object.values(interfaces)
    .flatMap((ifaceList) =>
      ifaceList ? ifaceList : []
    )
    .filter(
      (iface) =>
        iface.family === 'IPv4' && !iface.internal && !!iface.address
    )
    .map((iface) => iface.address);
};