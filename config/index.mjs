import build from './build.mjs';
import plugins from './plugins.mjs';
import themes from './themes.mjs';
import devplugins from './dev-plugins.mjs';
import base from './base.mjs';

// 用户配置
export default {
  ...base,
  plugins,
  build,
  devplugins,
  themes,
};
