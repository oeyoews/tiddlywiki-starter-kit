/**
 * neotw startup descption
 */
exports.startup = function () {
  if (!$tw.browser) return;
  console.log(
    '%c A modern style notebook based on tiddlywiki. @oeyoews  🎉',

    'background: linear-gradient(to right, #12c2e9, #c471ed, #f64f59); color: black;border-radius: 3px;padding: 3px;',
  );
};
