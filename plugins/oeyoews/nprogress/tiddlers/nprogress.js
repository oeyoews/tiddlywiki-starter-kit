/*\
title: $:/core/modules/nprogress.js
type: application/javascript
module-type: global

\*/

// usage new $tw.Nprogress().start()
// new $tw.Nprogress().done()
const NProgress = require('nprogress.min.js');

// 模拟Story 写法, 没有使用NProgress.start() 的写法
class NprogressGlobal {
  start = () => NProgress.start();
  done = () => NProgress.done();
}

exports.NProgress = NprogressGlobal;
