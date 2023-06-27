const elements = document.querySelectorAll(
  "[data-tiddler-title=\"Draft of 'untitled 1' by oeyoews\"]"
);

elements.forEach((element) => {
  const codemirrorElements = element.querySelectorAll(".CodeMirror-code");

  codemirrorElements.forEach((codemirrorElement) => {
    const formattedText = pangu.spacing(codemirrorElement.textContent);
    codemirrorElement.textContent = formattedText;
    // console.log(text);
  });
});