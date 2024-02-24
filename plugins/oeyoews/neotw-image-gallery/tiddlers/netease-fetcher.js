/*\
title: $:/plugins/oeyoews/neotw-image-gallery/netease-fetcher.js
type: application/javascript
module-type: library

\*/

// TODO: add error catch
// TODO: 封装一个 fetch
/**
 * @description 网易云 banner 模块
 * @returns {Array} An array of banner objects with a `src` property containing the URL of each banner image.
 */
const getbanners = async () => {
  try {
    const api = 'https://react-music-api-coral.vercel.app/api/banner';
    const res = await fetch(api);
    const data = await res.json();
    const { banners } = data.body;
    return banners.map((banner) => ({ src: banner.pic }));
  } catch (e) {
    console.error(e);
  }
};

module.exports = getbanners;
