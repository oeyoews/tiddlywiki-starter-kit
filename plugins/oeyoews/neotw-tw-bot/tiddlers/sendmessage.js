/*\
title: $:/plugins/oeyoews/neotw-tw-bot/sendmessage.js
type: application/javascript
module-type: library

// 配置UI
// ...

\*/
module.exports = function twBot() {
  // 直接使用fakeDocument会报错
  const form = document.createElement("form");
  form.classList.add(
    "p-2",
    "flex",
    "justify-between",
    "max-w-xl",
    "mx-auto",
    "border",
    "border-2",
    "rounded"
  );

  const button = document.createElement("button");

  const sendIcon = $tw.wiki.getTiddlerText(
    "$:/plugins/oeyoews/neotw-tw-bot/send.svg"
  );
  button.innerHTML = sendIcon;
  button.classList.add(
    "p-2",
    "mx-2",
    "bg-transparent",
    "hover:fill-green-700",
    "scale-125"
  );
  button.title = "send";
  const inputMessage = document.createElement("input");
  inputMessage.classList.add(
    "w-full",
    "mx-2",
    "border-none",
    "placeholder-gray-300"
  );
  inputMessage.placeholder = "任何想法 ...";
  form.appendChild(inputMessage);
  form.appendChild(button);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    sentMessage();
  });
  button.addEventListener("click", sentMessage);

  const timestamp = new Date().toISOString().replace(/\D/g, "");

  const options = {
    created: timestamp,
    modified: timestamp,
    creator: "tw-bot",
  };

  function sentMessage() {
    if (!inputMessage.value) {
      Swal.fire({
        icon: "error",
        title: "请输入想法",
      });
      return;
    }
    // create new tiddler
    $tw.wiki.addTiddler({
      title: `tw-bot/messages/${timestamp}`,
      text: inputMessage.value,
      tags: "想法",
      ...options,
    });
    // 统计当天记录的想法数量
    const count = $tw.wiki.filterTiddlers(`[tag[想法]days[-1]]`).length;
    Swal.fire({
      icon: "success",
      title: `这是你今天的第${count}条想法`,
      showConfirmButton: false,
      timer: 1500,
      toast: true,
      position: "top-end",
    });
  }
  return form;
};
