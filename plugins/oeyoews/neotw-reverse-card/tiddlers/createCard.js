/*\
title: $:/plugins/oeyoews/neotw-reverse-card/createCard.js
type: application/javascript
module-type: library

\*/

function createCard(question, answer) {
  const createElement = $tw.utils.domMaker;

  // 创建正面卡片元素
  const frontCard = createElement('div', {
    class:
      'flex justify-center items-center card-face bg-[#f2f2f2] p-2 rounded-lg w-full h-full absolute cursor-pointer',
    text: question,
  });

  // 创建背面卡片元素
  const backCard = createElement('div', {
    class:
      'card-face h-full w-full flex justify-center items-center bg-neutral-200 card-back rounded-lg absolute cursor-pointer',
    text: answer,
  });

  const cardInner = createElement('div', {
    class: 'card-inner aspect-video',
    children: [frontCard, backCard],
  });

  const card = createElement('div', {
    class: 'card border-none',
    children: [cardInner],
  });

  // 创建父容器元素
  const container = createElement('div', {
    class:
      'flex justify-center items-center dark:text-black my-4 snap-center text-lg',
    children: [card],
  });

  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });

  return container;
}

module.exports = createCard;
