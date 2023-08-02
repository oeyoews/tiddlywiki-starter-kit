/*\
title: $:/plugins/oeyoews/neotw-counter/getCounter.js
type: application/javascript
module-type: library

\*/
async function getCounter() {
  let data;
  const params = {
    user: 'oeyoews',
  };

  try {
    const res = await fetch(
      // 'https://nextjs-mdx-blog-tailwindcss.vercel.app/api/counter?user=oeyoews',
      'https://nextjs-mdx-blog-tailwindcss.vercel.app/api/posts',
    );
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    data = await res.json();
  } catch (e) {
    console.error('Error: ' + e.message);
  }
  return data.oeyoews.quantity;
}

module.exports = getCounter;
