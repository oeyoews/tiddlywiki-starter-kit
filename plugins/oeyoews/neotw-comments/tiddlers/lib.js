/*\
title: $:/plugins/oeyoews/neotw-comments/lib.js
type: application/javascript
module-type: library
\*/

/**
 * 获取指定 Tiddler 的评论 Tiddler 标题
 * @param {string} parentTiddler - 文章 Tiddler 的标题
 * @returns {string} 评论 Tiddler 的标题
 */
const getCommentTiddlerTitle = (parentTiddler) =>
  `$:/comments-${parentTiddler}`;

/**
 * 获取评论数据
 * @param {string} parentTiddler - 文章 Tiddler 的标题
 * @returns {Array} 该 Tiddler 的评论列表
 */
const getComments = (parentTiddler) => {
  const commentTiddlerTitle = getCommentTiddlerTitle(parentTiddler);
  const commentTiddler = $tw.wiki.getTiddler(commentTiddlerTitle);
  return commentTiddler
    ? JSON.parse(commentTiddler.fields.comments || '[]')
    : [];
};

/**
 * 更新评论数据
 * @param {string} parentTiddler - 文章 Tiddler 的标题
 * @param {Array} comments - 更新后的评论列表
 */
const updateComments = (parentTiddler, comments) => {
  const commentTiddlerTitle = getCommentTiddlerTitle(parentTiddler);
  $tw.wiki.addTiddler(
    new $tw.Tiddler({
      title: commentTiddlerTitle,
      type: 'application/json',
      comments: JSON.stringify(comments, null, 0),
    }),
  );
};

/**
 * 添加评论
 * @param {string} parentTiddler - 文章 Tiddler 的标题
 * @param {string} author - 评论者
 * @param {string} text - 评论内容
 */
const addComment = (parentTiddler, author, text) => {
  const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, ''); // 生成唯一时间戳
  const comments = getComments(parentTiddler);

  comments.push({ author, text, created: timestamp });
  updateComments(parentTiddler, comments);
};

/**
 * 删除评论
 * @param {string} parentTiddler - 文章 Tiddler 的标题
 * @param {string} timestamp - 需要删除的评论的时间戳
 */
const deleteComment = (parentTiddler, timestamp) => {
  const comments = getComments(parentTiddler);
  const filteredComments = comments.filter(
    (comment) => comment.created !== timestamp,
  );

  if (filteredComments.length !== comments.length) {
    updateComments(parentTiddler, filteredComments);
  }
};

/**
 * 编辑评论
 * @param {string} parentTiddler - 文章 Tiddler 的标题
 * @param {string} timestamp - 需要编辑的评论的时间戳
 * @param {string} newText - 新的评论内容
 */
const editComment = (parentTiddler, timestamp, newText) => {
  let comments = getComments(parentTiddler);
  let updated = false;

  comments = comments.map((comment) => {
    if (comment.created === timestamp) {
      updated = true;
      return { ...comment, text: newText };
    }
    return comment;
  });

  if (updated) {
    updateComments(parentTiddler, comments);
  }
};

module.exports = {
  addComment,
  getComments,
  deleteComment,
  editComment,
};
