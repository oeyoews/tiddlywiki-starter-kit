/*\
title: $:/plugins/oeyoews/neotw-startup-times/count-times.js
type: application/javascript
module-type: library

每次启动的时候， 记录下时间和次数， 如果距离上次启动时间间隔大于10分钟， 则次数+1

\*/

module.exports = () => {
  const stateTiddler = '_state-neotw-startup-times';
  let { times = 0, lastTime = 0 } = $tw.wiki.getTiddler(stateTiddler).fields;
  if (lastTime != 0 && Date.now() - lastTime < 10 * 60 * 1000) {
    return;
  }

  if (isNaN(times)) {
    times = 0;
  }
  const config = {
    suppressTimestamp: true,
  };

  $tw.wiki.setText(stateTiddler, 'times', null, Number(times) + 1, config);
  $tw.wiki.setText(stateTiddler, 'lastTime', null, Date.now(), config);
};
