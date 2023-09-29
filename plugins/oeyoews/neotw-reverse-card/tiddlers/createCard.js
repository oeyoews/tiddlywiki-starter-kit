/*\
title: $:/plugins/oeyoews/neotw-reverse-card/createCard.js
type: application/javascript
module-type: library

\*/

function createCard(question, answer) {
  const createElement = $tw.utils.domMaker;

  function iconify(icon = 'flat-color-icons:questions', visible = true) {
    return createElement('iconify-icon', {
      class: `absolute fixed top-2 left-2 transition-all duration-300 ease-in-out ${
        visible ? '' : 'scale-0'
      }`,
      attributes: {
        icon,
      },
    });
  }

  // 创建正面卡片元素
  const frontCard = createElement('div', {
    class:
      'shadow flex justify-center items-center p-4 card-face bg-[#f2f2f2] p-2 rounded-lg w-full h-full absolute cursor-pointer',
    text: question,
  });

  // 创建背面卡片元素
  const backCard = createElement('div', {
    class:
      'shadow card-face h-full w-full flex p-4 justify-center items-center bg-neutral-200 card-back rounded-lg absolute cursor-pointer',
    text: answer,
  });

  const cardInner = createElement('div', {
    class: 'card-inner aspect-video',
    children: [frontCard, backCard],
  });

  const iconq = iconify();
  const icona = iconify('flat-color-icons:approval', false);

  const card = createElement('div', {
    class: 'ocard border-none',
    children: [cardInner, iconq, icona],
  });

  // 创建父容器元素
  const container = createElement('div', {
    class:
      'flex justify-center items-center dark:text-black my-4 snap-center text-lg',
    children: [card],
  });

  let flipTimer;
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
    iconq.classList.toggle('scale-0');
    icona.classList.toggle('scale-0');
    clearTimeout(flipTimer);

    flipTimer = setTimeout(() => {
      card.classList.toggle('flipped');
    }, 5000);
  });

  return container;
}

module.exports = createCard;
