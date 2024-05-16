const pm2 = require('pm2');
const config = require('../ecosystem.config');

const { name: instanceName } = config.apps[0];

// Start or restart the instance using pm2
/** @type import('pm2') */
pm2.connect(function (err) {
  if (err) {
    console.error(err);
    process.exit(2);
  }

  // dont use pm2.stop, it break watch fn
  pm2.reload(instanceName, function (err, apps) {
    if (err) {
      // @ts-ignore
      pm2.start(config, (err, apps) => {
        pm2.disconnect();
        if (err) throw err;
        console.log(`连接到一个新的 ${instanceName} 实例`);
      });
    } else {
      if (err) throw err;
      const { restart_time } = apps[0];
      console.log(`
		重载 ${instanceName} 实例
		重载次数：${restart_time}
	  `);
      process.exit(0);
    }
  });
});
