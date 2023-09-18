const wiki = $tw.wiki;

const recentTiddlers = $tw.wiki.filterTiddlers(
  '[!is[system]!has[draft.of]!sort[created]limit[9]]',
);

const info = recentTiddlers.map((tiddler) => {
  const { fields } = wiki.getTiddler(tiddler);
  cover =
    fields['page-cover'] ||
    `https://source.unsplash.com/random?fm=blurhash&w=50&${fields.title}`;
  return {
    title: fields.title,
    cover,
  };
});

function navigateTo(title) {
  this.parentWidget.dispatchEvent({
    type: 'tm-navigate',
    param: title,
    navigateTo: title,
  });
}
