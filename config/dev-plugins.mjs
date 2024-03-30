// https://juejin.cn/post/7037769682513821704

// 中转层, 新开发的插件
import { createRequire } from 'module';
const vrequire = createRequire(import.meta.url);
const devplugins = vrequire('./dev-plugins.json');

export default devplugins;
