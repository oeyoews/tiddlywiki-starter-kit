/*\
title: $:/plugins/oeyoews/neotw-tw-bot/sendmessage.js
type: application/javascript
module-type: library

// 配置UI
// line color

\*/
module.exports = function twBot() {
  const tags = ["想法", "任务", "工作", "生活", "其他"];
  const selectTag = document.createElement("select");
  selectTag.classList.add("appearance-none", "border-none", "p-2", "rounded");
  tags.forEach((tag) => {
    const option = document.createElement("option");
    option.value = tag;
    option.text = tag;
    selectTag.appendChild(option);
  });

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
    "scale-125",
    "cursor-not-allowed"
  );
  button.title = "send";
  button.disabled = true; // 不需要使用readonly
  const inputMessage = document.createElement("input");
  inputMessage.classList.add(
    "w-full",
    "mx-2",
    "border-none",
    "placeholder-gray-300",
    "caret-indigo-500"
  );
  inputMessage.placeholder = `任何${tags} ...`;
  inputMessage.addEventListener("input", function () {
    // 检查输入框的值是否为空，然后设置按钮的禁用状态
    button.disabled = !inputMessage.value;
    if (button.disabled) {
      button.classList.add("cursor-not-allowed");
    } else {
      button.classList.remove("cursor-not-allowed");
    }
  });
  form.appendChild(selectTag);
  form.appendChild(inputMessage);
  form.appendChild(button);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    sentMessage(selectTag);
  });

  const timestamp = new Date().toISOString().replace(/\D/g, "");

  const options = {
    created: timestamp,
    modified: timestamp,
    creator: "tw-bot",
  };

  function sentMessage(selectTag) {
    const tags = selectTag.value;
    // create new tiddler
    $tw.wiki.addTiddler({
      title: `tw-bot/messages/${timestamp}`,
      text: inputMessage.value,
      tags,
      ...options,
    });
    // 需要await
    // inputMessage.value = "";
    // 统计当天记录的想法数量
    const count = $tw.wiki.filterTiddlers(`[tag[${tags}]days[-1]]`).length;
    Swal.fire({
      icon: "success",
      title: `这是你今天的第 ${count} 条${tags}`,
      showConfirmButton: false,
      timer: 1500,
      toast: true,
      position: "top-end",
    });
  }
  return form;
};
