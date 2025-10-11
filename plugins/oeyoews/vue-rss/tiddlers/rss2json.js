/*\
title: $:/plugins/oeyoews/vue-rss/rss2json.js
type: application/javascript
module-type: library

\*/

/**
 * @param {string} input - rss URL or XML string
 * @param {boolean} isUrl - true 表示 input 是 URL，false 表示 input 是 xml string
 * @returns {Promise<{channel: object, items: object[]}>}
 */
async function rss2json(input, isUrl = false) {
  let xmlString;
  if (isUrl) {
    const res = await fetch(input);
    xmlString = await res.text();
  } else {
    xmlString = input;
  }

  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlString, 'text/xml');

  const get = (el, tag) =>
    el?.getElementsByTagName(tag)?.[0]?.textContent || '';

  const extractImage = (html) => {
    try {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      return doc.querySelector('img')?.src || '';
    } catch {
      return '';
    }
  };

  const channelEl = xml.querySelector('channel') || xml;
  const itemsEl = xml.querySelectorAll('item, entry');

  const channel = {
    title: get(channelEl, 'title'),
    link: get(channelEl, 'link'),
    description: get(channelEl, 'description'),
    update:
      relativeTime(
        get(channelEl, 'lastBuildDate') ||
          get(channelEl, 'pubDate') ||
          get(channelEl, 'updated'),
      ) || '',
  };

  const items = [...itemsEl].map((item) => {
    const title = get(item, 'title');
    const link = get(item, 'link');
    const description = get(item, 'description') || '';
    const content = get(item, 'content:encoded') || get(item, 'content') || '';
    const pubDate = get(item, 'pubDate') || get(item, 'updated') || '';
    const summary = description + content;
    const mp3 = item.querySelector('enclosure')?.getAttribute('url') || '';
    const src = extractImage(content || description);

    return { title, link, summary, pubDate, mp3, src };
  });

  return { channel, items };
}

function relativeTime(dateString) {
  var date = new Date(dateString);
  var now = new Date();

  var diff = Math.abs(now - date) / 1000; // 将毫秒转换为秒，并取绝对值

  var intervals = {
    年: 31536000,
    月: 2592000,
    周: 604800,
    天: 86400,
    小时: 3600,
    分钟: 60,
    秒: 1,
  };

  var relativeTime = '';

  for (var key in intervals) {
    var interval = Math.floor(diff / intervals[key]);
    if (interval > 0) {
      relativeTime += interval + ' ' + key + '前';
      break;
    }
  }

  return relativeTime;
}

module.exports = rss2json;
