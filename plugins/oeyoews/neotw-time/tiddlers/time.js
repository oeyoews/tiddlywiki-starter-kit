/*\
title: $:/plugins/oeyoews/neotw-otime/time.js
type: application/javascript
module-type: library

time.js

\*/
function calculateTimeDiff(pastDateString) {
  const pastDate = new Date(pastDateString);
  const currentDate = new Date();

  // 验证过去日期是否有效
  if (pastDate > currentDate) {
    console.error('过去日期无效，不能超过当前时间！');
    return;
  }

  const timeDiff = currentDate.getTime() - pastDate.getTime();

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  // console.clear(); ???

  const dayString = days > 0 ? `${days} 天 ` : '';
  const hourString = hours > 0 ? `${hours} 小时 ` : '';
  const minuteString = minutes > 0 ? `${minutes} 分钟 ` : '';
  const secondString = seconds > 0 ? `${seconds} 秒` : '';

  const timeStage = `距离 ${pastDate.toLocaleDateString()} 已经过去了 ${dayString}${hourString}${minuteString}${secondString}。`;
  return timeStage;
}

module.exports = {
  calculateTimeDiff,
};
