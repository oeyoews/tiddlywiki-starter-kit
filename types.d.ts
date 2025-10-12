export type ConfigOptions = {
  name?: string;
  description?: string;
  server?: {
    port?: number;
    host?: boolean;
    hostname?: string;
    qrcode?: boolean;
    /** 清空控制台  */
    zen?: boolean;
    open?: boolean;
  };
  username?: string;
  password?: string;
  output?: string;
  debug?: boolean;
  wiki?: string;
  markdown?: boolean;
  tiddlersRepo?: string;
  pluginversion?: string;
  checkfilesize?: boolean;
};
