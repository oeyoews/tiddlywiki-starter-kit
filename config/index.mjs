import build from './build.mjs';
import plugins from './plugins.mjs';
import themes from './themes.mjs';
import devplugins from './dev-plugins.mjs';
import base from './base.mjs';
import info from './info.mjs';
import startup from './startup.mjs';

// 用户配置
export default {
  startup,
  ...base,
  plugins,
  build,
  devplugins,
  themes,
  info,
};
