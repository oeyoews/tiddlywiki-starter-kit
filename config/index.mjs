import base from '../tiddlywiki.config.mjs';
import build from './build.mjs';
import info from './info.mjs';
import plugins from './plugins.mjs';
import startup from './startup.mjs';
import themes from './themes.mjs';

/** 用户配置 */
export default {
  startup,
  ...base,
  plugins,
  build,
  themes,
  info,
};
