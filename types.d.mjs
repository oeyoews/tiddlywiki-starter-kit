/**
 * @typedef {Object} ConfigOptions
 * @property {string} [name] - The name of the configuration.
 * @property {string} [description] - The description of the configuration.
 * @property {Object} [server] - The server configuration.
 * @property {number} [server.port] - The port number for the server.
 * @property {boolean} [server.host] - Whether to enable the host header.
 * @property {string} [server.hostname] - The hostname for the server.
 * @property {boolean} [server.qrcode] - Whether to generate a QR code.
 * @property {boolean} [server.zen] - Whether to enable Zen mode.
 * @property {boolean} [server.open] - Whether to open the server in the browser.
 * @property {string} [username] - The username for authentication.
 * @property {string} [password] - The password for authentication.
 * @property {string} [output] - The output format.
 * @property {boolean} [debug] - Whether to enable debug mode.
 * @property {string} [wiki] - The wiki URL.
 * @property {boolean} [markdown] - Whether to use Markdown.
 * @property {string} [tiddlersRepo] - The Tiddlers repository URL.
 * @property {string} [pluginversion] - The version of the plugin.
 * @property {boolean} [checkfilesize] - Whether to check file sizes.
 */

/**
 * @type {ConfigOptions}
 */
// @ts-ignore
export default ConfigOptions;
