/*\
title: $:/plugins/oeyoews/clean-your-duplicate-storylist/startup.js
type: application/javascript
module-type: startup

clean-your-duplicate-storylist startup

\*/
exports.name = 'clean-your-duplicate-storylist';
exports.platforms = ['browser'];
exports.after = ['startup'];
exports.synchronous = true;

exports.startup = () => {
  // 在线wiki不检测
  if (window.location.protocol === 'https:') return;
  // 页面加载完成后检查异常tid
  window.addEventListener('DOMContentLoaded', () => {
    // 找到所有 .tid 结尾的条目
    const maybeStoryListTiddlers = $tw.wiki.filterTiddlers('[suffix[.tid]]');
    const stateTiddler = '$:/state/clean-your-duplicate-storylist/has-error';
    if (maybeStoryListTiddlers.length > 1) {
      $tw.wiki.addTiddler({
        title: stateTiddler,
        class: 'o-tm',
        'mask-closable': 'yes',
        caption: 'StoryList条目检查',
        // <$link to=<<currentTiddler>> tooltip="Custom tooltip"> </$link>
        text: `发现了${maybeStoryListTiddlers.length}个异常的 StoryList条目, 点击查看详情.
      <ol>
        <$list filter="[suffix[.tid]]" >
          <li> <<currentTiddler>> </li>
        </$list>
      </ol>
       `,
      });
      $tw.modal.display(stateTiddler);
      new $tw.Story().navigateTiddler('$:/AdvancedSearch');
    }
  });
};
