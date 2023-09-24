import net from 'net';

/**
 * find a free port
 * @param {number} [startingPort=8000]
 * @returns {Promise<number>} port number
 */
export default function findPort(startingPort = 8000) {
  startingPort = Number(startingPort);
  return new Promise((resolve, reject) => {
    const server = net.createServer();

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        findPort(startingPort + 1)
          .then((port) => resolve(port))
          .catch(reject);
      } else {
        reject(err);
      }
    });

    server.listen(startingPort, () => {
      server.close(() => {
        resolve(startingPort);
      });
    });
  });
}