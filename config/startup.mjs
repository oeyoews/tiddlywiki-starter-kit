import base from './base.mjs';

/**
 * @description Returns an array of command line arguments for starting the server.
 * @param {Object} option - The options for starting the server.
 * @param {number} option.port - The port number to listen on.
 * @return {Array<string>} An array of command line arguments.
 */
export default function startup(option) {
  const { port } = option;

  // 'path-prefix=/src', // https://bramchen.github.io/tw5-docs/zh-Hans/#WebServer%20Parameter%3A%20path-prefix
  const args = [
    '--listen',
    'port=' + port,
    'root-tiddler=$:/core/save/all-external-js',
    'use-browser-cache=yes',
    // 'anon-username=' + base.username,
  ];
  if (base.auth && base.username && base.password) {
    args.push(`username=${base.username}`);
    args.push(`password=${base.password}`);
  }
  return args;
}
