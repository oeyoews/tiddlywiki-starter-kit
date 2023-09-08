/*\
title: $:/plugins/oeyoews/neotw-tw-bot/sendmessage.js
type: application/javascript
module-type: library

// TODO send button to call function
// use form

\*/
module.exports = function twBot() {
  // 直接使用fakeDocument会报错
  const virtualRoot = document.createElement("div");

  const button = document.createElement("button");
  button.textContent = "Send";
  button.classList.add("p-2");
  const inputMessage = document.createElement("input");
  // add placeholder color
  inputMessage.placeholder = "input text here";
  virtualRoot.appendChild(inputMessage);
  virtualRoot.appendChild(button);

  button.addEventListener("click", sentMessage);

  const timestamp = new Date().toISOString().replace(/\D/g, "");

  const options = {
    created: timestamp,
    modified: timestamp,
    creator: "tw-bot",
  };

  function sentMessage() {
    // create new tiddler
    $tw.wiki.addTiddler({
      title: `tw-bot/messages/${timestamp}`,
      text: inputMessage.value,
      ...options,
    });
    // 清空input
    inputMessage.value = "";
  }
  return virtualRoot;
};
