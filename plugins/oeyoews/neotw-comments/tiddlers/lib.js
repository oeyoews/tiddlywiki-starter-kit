/*\
title: $:/plugins/oeyoews/neotw-comments/lib.js
type: application/javascript
module-type: library

\*/

/**
 * Add a comment to a tiddler.
 * @param {string} parentTiddler - the title of the tiddler to add a comment to.
 * @param {string} author - the name of the person adding the comment.
 * @param {string} text - the text of the comment.
 */
function addComment(parentTiddler, author, text) {
  var now = new Date();
  var timestamp = now.toISOString().replace(/[-T:.Z]/g, ''); // 生成唯一时间戳
  var commentTiddlerTitle = '$:/comments-' + parentTiddler;

  // 获取现有的评论 Tiddler
  var commentTiddler = $tw.wiki.getTiddler(commentTiddlerTitle);
  var comments = commentTiddler
    ? JSON.parse(commentTiddler.fields.comments || '[]')
    : [];

  // 添加新评论
  comments.push({
    author: author,
    text: text,
    created: timestamp,
  });

  // 保存回 TiddlyWiki
  $tw.wiki.addTiddler(
    new $tw.Tiddler({
      title: commentTiddlerTitle,
      type: 'application/json',
      comments: JSON.stringify(comments, null, 0),
    }),
  );
}

/**
 * Get the comments for a given parent tiddler.
 * @param {string} parentTiddler - the title of the tiddler to get comments for.
 * @returns {Array} a list of comments for the parent tiddler, each comment is an object with the following properties:
 * - author: {string} the author of the comment
 * - text: {string} the text of the comment
 * - created: {string} the ISO8601 timestamp of when the comment was created
 */
function getComments(parentTiddler) {
  var commentTiddlerTitle = '$:/comments-' + parentTiddler;
  var commentTiddler = $tw.wiki.getTiddler(commentTiddlerTitle);
  return commentTiddler
    ? JSON.parse(commentTiddler.fields.comments || '[]')
    : [];
}

/**
 * Delete a comment for a given parent tiddler.
 * @param {string} parentTiddler - the title of the tiddler to delete a comment from.
 * @param {string} timestamp - the ISO8601 timestamp of the comment to delete.
 * @returns {undefined}
 */
function deleteComment(parentTiddler, timestamp) {
  var commentTiddlerTitle = '$:/comments-' + parentTiddler;
  var commentTiddler = $tw.wiki.getTiddler(commentTiddlerTitle);
  if (!commentTiddler) return;

  var comments = JSON.parse(commentTiddler.fields.comments || '[]');
  comments = comments.filter((comment) => comment.created !== timestamp); // 过滤掉要删除的评论

  // 更新 Tiddler
  $tw.wiki.addTiddler(
    new $tw.Tiddler(commentTiddler, {
      comments: JSON.stringify(comments, null, 0),
    }),
  );
}

/**
 * Edit a comment for a given parent tiddler.
 * @param {string} parentTiddler - the title of the tiddler to edit a comment for.
 * @param {string} timestamp - the ISO8601 timestamp of the comment to edit.
 * @param {string} newText - the new text of the comment.
 * @returns {undefined}
 */
function editComment(parentTiddler, timestamp, newText) {
  var commentTiddlerTitle = '$:/comments-' + parentTiddler;
  var commentTiddler = $tw.wiki.getTiddler(commentTiddlerTitle);
  if (!commentTiddler) return;

  var comments = JSON.parse(commentTiddler.fields.comments || '[]');
  comments = comments.map((comment) =>
    comment.created === timestamp ? { ...comment, text: newText } : comment,
  );

  // 更新 Tiddler
  $tw.wiki.addTiddler(
    new $tw.Tiddler(commentTiddler, {
      comments: JSON.stringify(comments, null, 0),
    }),
  );
}

module.exports = {
  addComment,
  getComments,
  deleteComment,
  editComment,
};
