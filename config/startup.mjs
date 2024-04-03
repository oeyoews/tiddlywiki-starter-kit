import base from './base.mjs';

export default function startup(option) {
  const { port } = option;

  return [
    '--listen',
    'port=' + port,
    'root-tiddler=$:/core/save/all-external-js',
    'use-browser-cache=yes',
    'anon-username=' + base.username,
    // 'username=' + config.username,
    // 'password=' + config.password
    // https://bramchen.github.io/tw5-docs/zh-Hans/#WebServer%20Parameter%3A%20path-prefix
    // 'path-prefix=/myapp',
  ];
}
