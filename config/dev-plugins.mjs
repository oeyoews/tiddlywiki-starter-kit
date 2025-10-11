/** @see https://juejin.cn/post/7037769682513821704 */

// 中转层, 用于获取新开发的插件列表
import { createRequire } from 'module';
const vrequire = createRequire(import.meta.url);
const devplugins = vrequire('./dev-plugins.json');

export default devplugins;
