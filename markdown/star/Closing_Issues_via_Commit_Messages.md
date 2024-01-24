---
title: 'Closing_Issues_via_Commit_Messages'
tags: ['剪藏']
type: 'text/markdown'
created: 'Tue Nov 14 2023 09:45:56 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: '太微搜藏'
url: 'https://github.blog/2013-01-22-closing-issues-via-commit-messages/'
---

# Closing_Issues_via_Commit_Messages

Author 作者

January 22, 2013  一月 22，2013

Recently we changed the way closing issues via commit message 最近，我们改变了通过提交消息关闭问题的方式\

works on GitHub. 在 GitHub 上工作。

Now when you enter“Fixes #33”in a commit message, issue 33 现在，当您在提交消息中输入“修复 #33”时，问题 33\

will only be closed once the commit is merged into your 只有在提交合并到

**default** branch (usually `master`).默认分支（通常 `master` 为）。

This is super useful because it means the issue’s open / closed 这非常有用，因为它意味着问题已打开/关闭\

status will map to your default branch. If the bug isn’t fixedstatus 将映射到您的默认分支。如果 bug 未修复\

in your default branch, the issue will remain open. Once the 在默认分支中，问题将保持未解决状态。一旦\

commit with the fix is merged into your default branch the 与修复程序一起提交将合并到您的默认分支中\

issue will be automatically closed.问题将自动关闭。

When you do make a commit in a non-default branch with the 当您在非默认分支中进行提交时，使用\

“Fixes #33”syntax, the issue will be referenced with a tooltip:“修复 #33”语法，该问题将通过工具提示引用：

![](https://github.blog/wp-content/uploads/2013/01/69313b9e-64d4-11e2-9245-76215e43b199.png?resize=698%2C127)

If you work primarily in a non-master branch, such as `dev`,如果您主要在非 master 分支中工作，例如 `dev` ，\

you can change your default branch on the repository settings page:您可以在存储库设置页面上更改默认分支：

![](https://github.blog/wp-content/uploads/2013/01/90ac8274-64d3-11e2-8a31-a00028e89c71.png?resize=414%2C79)

Didn’t know about this feature? You can use any of these keywords to close an issue via commit message:不知道这个功能？您可以使用以下任何关键字通过提交消息关闭问题：

> close, closes, closed, fixes, fixed 关闭，关闭，关闭，修复，固定

All of them work the same, including this behavior.它们的工作方式都相同，包括这种行为。

Enjoy! 享受！

## Explore more from GitHub 从 GitHub 探索更多内容

![](https://github.blog/wp-content/uploads/2022/05/product.svg)

### Product 产品

Updates on GitHub products and features, hot off the press.有关 GitHub 产品和功能的更新，新闻热点。

[Learn more 了解更多信息](https://github.blog/category/product/)

![](https://github.blog/wp-content/uploads/2023/08/Icon-Circle.svg)

### GitHub Universe 2023 GitHub Universe 2023 年

Get free virtual tickets to the global developer event for AI, security, and DevEx.免费获得 AI、安全和 DevEx 全球开发者活动的虚拟门票。

[Get free tickets 获得免费门票](https://githubuniverse.com/)

![](https://github.blog/wp-content/uploads/2022/05/Copilot_Blog_Icon-1.svg)

### GitHub Copilot

Don’t fly solo. Try 30 days for free.不要单飞。免费试用 30 天。

[Learn more 了解更多信息](https://github.com/features/copilot?utm_source=blog&utm_medium=bottomnav&utm_campaign=cta&utm_content=copilot)

![](https://github.blog/wp-content/uploads/2022/05/careers.svg)

### Work at GitHub! 在 GitHub 工作！

Check out our current job openings.查看我们当前的职位空缺。

[Learn more 了解更多信息](https://github.com/about/careers)

## Subscribe to The GitHub Insider 订阅 GitHub Insider

Discover tips, technical guides, and best practices in our monthly newsletter for developers.在我们面向开发人员的月度时事通讯中发现提示、技术指南和最佳实践。
