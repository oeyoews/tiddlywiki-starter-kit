import net from 'net';

/**
 * find a free port 
 * 由于端口号使用环境变量配置，避免pm2后台运行的tw实例和 dev环境下端口冲突的情况， 并且同时可以运行多个实例
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