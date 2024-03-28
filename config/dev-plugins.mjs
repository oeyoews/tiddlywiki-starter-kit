// https://juejin.cn/post/7037769682513821704

import { createRequire } from 'module';
const vrequire = createRequire(import.meta.url);
const devPlugins = vrequire('./dev-plugins.json');

export default devPlugins;
