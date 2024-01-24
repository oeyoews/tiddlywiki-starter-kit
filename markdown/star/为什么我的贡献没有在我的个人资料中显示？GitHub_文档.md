---
title: '为什么我的贡献没有在我的个人资料中显示？GitHub_文档'
tags: ['剪藏']
type: 'text/markdown'
created: 'Tue Oct 31 2023 06:53:43 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: 'oeyoews'
url: 'https://docs.github.com/zh/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/why-are-my-contributions-not-showing-up-on-my-profile'
---

# 为什么我的贡献没有在我的个人资料中显示？GitHub_文档

## 关于您的贡献图

你的个人资料贡献图是你对 [GitHub.com](http://GitHub.com) 拥有的存储库所做的贡献的记录。贡献按照协调世界时 (UTC) 而不是您当地的时区加时间戳。只有在满足特定标准时才会计算贡献。在某些情况下，我们可能需要重建您的图表才能显示贡献。

如果您是使用 SAML 单点登录 (SSO) 的组织的成员，则在没有活动的 SSO 会话时，您将无法在配置文件上看到来自该组织的贡献活动。从组织外部查看您个人资料的用户将看到您组织的贡献活动的匿名贡献活动。

## 计算的贡献

### 议题、拉取请求和讨论

如果问题、拉取请求和讨论在独立的存储库中而非分支中打开，它们将在你的贡献图中显示。

### 提交

如果提交符合以下所有条件，则会在贡献图中显示：

* 用于提交的电子邮件地址与你在 [GitHub.com](http://GitHub.com) 上的帐户关联。

* 提交在独立的仓库而不是复刻中进行。

* 提交在以下位置进行：

    * 在仓库的默认分支中

    * 在 `gh-pages` 分支（对于具有项目网站的存储库）中

有关项目站点的详细信息，请参阅“[关于 GitHub Pages](https://docs.github.com/zh/pages/getting-started-with-github-pages/about-github-pages#types-of-github-pages-sites)”。

此外，以下至少一项必须为 true：

* 您是仓库中的协作者，或者是拥有该仓库的组织的成员。

* 您已复刻该仓库。

* 您已打开仓库中的拉取请求或议题。

* 您已为仓库加星标。

## 贡献未计算的常见原因

注意：

* 在变基提交时，提交的原作者和提交的变基者（无论是在命令行还是 [GitHub.com](http://GitHub.com) 上）都会获得贡献积分。

* 如果合并了多个个人帐户，问题、拉取请求和讨论将不会归因于新帐户，也不会显示在贡献图上。

### 24 小时内进行的提交

进行满足计为贡献要求的提交后，您可能需要等待最长 24 小时才能看到在贡献图中显示的贡献。

### 您的本地 Git 提交电子邮件地址未连接到您的帐户

提交必须是使用与你在 [GitHub.com](http://GitHub.com) 上的帐户连接的电子邮件地址或使用在电子邮件设置中提供给你的 GitHub 提供的 `noreply` 电子邮件地址进行的，这样才能显示在贡献图上。有关 `noreply` 电子邮件地址的详细信息，请参阅“[设置提交电子邮件地址](https://docs.github.com/zh/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/setting-your-commit-email-address#about-commit-email-addresses)”。

可以通过将 `.patch` 添加到提交 URL 的末尾来检查用于提交的电子邮件地址：例如，以下提交 URL 包括 `.patch`。

<https://github.com/octocat/octocat.github.io/commit/67c0afc1da354d8571f51b6f0af8f2794117fd10.patch>

```
From 67c0afc1da354d8571f51b6f0af8f2794117fd10 Mon Sep 17 00:00:00 2001
From: The Octocat <octocat@nowhere.com>
Date: Sun, 27 Apr 2014 15:36:39 +0530
Subject: [PATCH] updated index for better welcome message
```

`From:` 字段中的电子邮件地址是在[本地 git 配置设置](https://docs.github.com/zh/get-started/quickstart/set-up-git)中设置的地址。在此示例中，用于提交的电子邮件地址为 `octocat@nowhere.com`。

如果用于提交的电子邮件地址未连接到你在 [GitHub.com](http://GitHub.com) 上的帐户，必须向你在 [GitHub.com](http://GitHub.com) 上的帐户[添加电子邮件地址](https://docs.github.com/zh/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/adding-an-email-address-to-your-github-account)。您的贡献图将在添加新地址后自动重建。

注意：如果使用托管用户帐户，则不能向帐户添加其他电子邮件地址，即使向标识提供者 (IdP) 注册了多个电子邮件地址也是如此。因此，只有由注册到 IdP 的主电子邮件地址创作的提交才能与托管用户帐户相关联。

通用电子邮件地址（如 `jane@computer.local`）无法添加到 GitHub 帐户，也不能关联到提交。如果你用一个通用电子邮件地址创作了任何提交，这些提交将不会与你的 GitHub 个人资料相关联，也不会显示在你的贡献图中。

### 未在默认分支或 `gh-pages` 分支中执行提交

仅发生在默认分支或 `gh-pages` 分支（对于包含项目网站的存储库）中的提交才会计入。有关详细信息，请参阅“[关于 GitHub Pages](https://docs.github.com/zh/pages/getting-started-with-github-pages/about-github-pages#types-of-github-pages-sites)”。

如果提交位于非默认或非 `gh-pages` 分支中，并且你希望将其计入你的贡献，则需要执行以下操作之一：

* [打开拉取请求](https://docs.github.com/zh/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)，将更改合并到默认分支或 `gh-pages` 分支中。

* [更改存储库的默认分支](https://docs.github.com/zh/repositories/configuring-branches-and-merges-in-your-repository/managing-branches-in-your-repository/changing-the-default-branch)。

警告：更改存储库的默认分支将会更改所有存储库协作者的默认分支。仅当您希望新分支成为进行所有未来拉取请求和提交的基础时才执行此操作。

### 提交在复刻中进行

在复刻中进行的提交不会计入您的贡献。要将其计入，您必须执行以下操作之一：

* [打开拉取请求](https://docs.github.com/zh/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)，将更改合并到父存储库中。

* 要拆离分叉并将其变成 [GitHub.com](http://GitHub.com) 上的独立存储库，请联系 [GitHub 支持](https://support.github.com/contact?tags=docs-generic)。如果分支有自己的分支，请说明分支是应与你的存储库一起移至新网络，还是保留在当前网络中。有关详细信息，请参阅“[关于分叉](https://docs.github.com/zh/pull-requests/collaborating-with-pull-requests/working-with-forks/about-forks)”。

## 延伸阅读

* “[在个人资料上显示你的私有贡献和成就](https://docs.github.com/zh/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/showing-your-private-contributions-and-achievements-on-your-profile)”

* “[在个人资料中查看贡献](https://docs.github.com/zh/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/viewing-contributions-on-your-profile)”
