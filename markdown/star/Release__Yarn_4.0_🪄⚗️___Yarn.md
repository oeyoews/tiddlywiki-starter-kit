---
title: 'Release__Yarn_4.0_🪄⚗️___Yarn'
tags: ['剪藏']
type: 'text/markdown'
created: 'Tue Oct 24 2023 06:10:50 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: '太微搜藏'
url: 'https://yarnpkg.com/blog/release/4.0'
---

# Release__Yarn_4.0_🪄⚗️___Yarn

Today is the day! After more than a year of work, our team is excited to finally put a fancy “stable” sticker on the first release from the 4.x release line! To celebrate, let’s make together a tour of the major changes; should you look for a more itemized list, take a look at the [changelog](https://yarnpkg.com/advanced/changelog#400).今天是一天！经过一年多的工作，我们的团队很高兴终于在 4.x 发布线的第一个版本上贴上了一个花哨的“稳定”贴纸！为了庆祝，让我们一起参观主要变化;如果您正在寻找更详细的列表，请查看更新日志。

## Breaking Changes​ 重大变更

Here’s what you need to know when upgrading from 3.x projects:以下是从 3.x 项目升级时需要了解的内容：

* We now require Node.js 18+.我们现在需要 Node.js 18+。

* New projects created with `yarn init` won’t enable [Zero-Install](https://yarnpkg.com/features/caching#zero-installs) by default anymore.默认情况下，使用 创建 `yarn init` 的新项目将不再启用零安装。

* New projects created with `yarn init` will use [Corepack](https://nodejs.org/api/corepack.html) rather than `yarnPath`.使用 创建 `yarn init` 的新项目将使用 Corepack 而不是 `yarnPath` 。

* All official plugins (`typescript`, `interactive-tools`, …) are now included by default.现在默认包含所有官方插件（ `typescript` `interactive-tools` 、、…）。

* The `yarn workspaces foreach` command has a slightly altered syntax.该 `yarn workspaces foreach` 命令的语法略有改动。

## Installing Yarn​ 安装纱线

Ever since the 2.0 our recommendation has been to install Yarn on a per-project basis using the `yarnPath` setting (automatically set either of `yarn init -2` and `yarn set version`). We intentionally don’t release modern releases on the npm `yarn` package, [so as not to break older projects which didn’t migrate yet](https://yarnpkg.com/getting-started/qa#why-is-the-yarn-package-on-npm-still-on-1x).自 2.0 以来，我们的建议是使用以下 `yarnPath` 设置（自动设置 和 `yarn set version` ）。 `yarn init -2` 我们故意不在 npm `yarn` 包上发布现代版本，以免破坏尚未迁移的旧项目。

To that end we used to recommend using the `yarnPath` setting pointing to a checked-in binary, but this pattern increased friction more than we liked - many people didn’t like the idea of adding a binary to their repository, however small. We listened, and worked conjointely with Node.js on a project called [Corepack](https://nodejs.org/api/corepack.html). Corepack is a tool shipped with Node.js 16+ that will automatically select the right package manager version to run depending on the project you’re working on.为此，我们曾经建议使用指向已签入二进制文件的 `yarnPath` 设置，但这种模式增加了比我们喜欢的更多的摩擦 - 许多人不喜欢将二进制文件添加到他们的存储库的想法，无论多么小。我们倾听并与 Node 合作.js 在一个名为 Corepack 的项目上。Corepack 是 Node.js 16+ 附带的工具，它将根据您正在处理的项目自动选择要运行的正确包管理器版本。

Now that Corepack is shipped with both Node 18 and 20 we no longer need to rely on `yarnPath`, and as a result we updated our [installation guide](https://yarnpkg.com/getting-started/install) to reflect that. The `yarn init -2` and `yarn set version` commands have been updated to favor updating the `packageManager` field when possible.现在 Corepack 随节点 18 和 20 一起提供，我们不再需要依赖 `yarnPath` ，因此我们更新了安装指南以反映这一点。和 `yarn set version` 命令已更新， `yarn init -2` 以便尽可能更新 `packageManager` 字段。

info 信息

Corepack knows which package manager version to use thanks to the standard `packageManager` field in your `package.json`. This field will typically be set via one of `yarn init -2`, `yarn set version x.y.z`, or the more generic `corepack use yarn@x.y.z`.Corepack 知道要使用哪个包管理器版本，这要归功于 `packageManager` `package.json` .此字段通常通过 `yarn init -2` 、 `yarn set version x.y.z` 或更通用 `corepack use yarn@x.y.z` 的 之一进行设置。

## Hardened Mode​ 强化模式

Yarn attempts to protect you from common attacks, and this is pushed even further by the introduction of the Hardened Mode. When operating under this mode, Yarn will perform two extra validations:Yarn 试图保护您免受常见攻击，而强化模式的引入进一步推动了这一点。在此模式下运行时，Yarn 将执行两个额外的验证：

* It will validate the resolutions stored in the lockfile are consistent with what the ranges could resolve to.它将验证存储在锁定文件中的分辨率是否与范围可以解析的内容一致。

* It will validate that the package metadata stored in the lockfile are consistent the remote registry metadata.它将验证存储在锁文件中的包元数据是否与远程注册表元数据一致。

Together, those checks will prevent any attacker from surreptitiously modifying your lockfiles when making PRs to your project using Yarn (<https://snyk.io/blog/why-npm-lockfiles-can-be-a-security-blindspot-for-injecting-malicious-modules/>).总之，这些检查将防止任何攻击者在使用 Yarn（[https://snyk.io/blog/why-npm-lockfiles-can-be-a-security-blindspot-for-injecting-malicious-modules/）为您的项目制作](https://snyk.io/blog/why-npm-lockfiles-can-be-a-security-blindspot-for-injecting-malicious-modules/%EF%BC%89%E4%B8%BA%E6%82%A8%E7%9A%84%E9%A1%B9%E7%9B%AE%E5%88%B6%E4%BD%9C) PR 时偷偷修改您的锁文件。

tip 提示

The Hardened Mode is enabled by toggling on `enableHardenedMode`, but it’s also automatically enabled when Yarn detects that it runs within a GitHub pull request on a public repository. This can be disabled by explicitly toggling off `enableHardenedMode` in your yarnrc file.强化模式通过打开 `enableHardenedMode` 来启用，但当 Yarn 检测到它在公共存储库的 GitHub 拉取请求中运行时，它也会自动启用。这可以通过在 yarnrc 文件中显式关闭 `enableHardenedMode` 来禁用。

caution 谨慎

Installs operating under Hardened Mode constraints are significantly slower than usual as they need to perform many network requests that would be skipped otherwise. We don’t recommend enabling it by default - if you need it in a specific CI job, toggle it on via an environment variable:在强化模式约束下运行的安装比平时慢得多，因为它们需要执行许多网络请求，否则这些请求将被跳过。我们不建议默认启用它 - 如果您在特定的 CI 作业中需要它，请通过环境变量将其打开：

```
export YARN_ENABLE_HARDENED_MODE=1
```

## JavaScript Constraints​ JavaScript 约束

Yarn is the only package manager to implement a [constraints engine](https://yarnpkg.com/features/constraints). If you don’t know it, this feature lets you define a set of rules that your project must satisfy. For instance, the Yarn repository enforces that no two workspaces depend on different versions of any given dependencies, unless explicitly allowed.Yarn 是唯一实现约束引擎的包管理器。如果您不知道，此功能允许您定义项目必须满足的一组规则。例如，Yarn 存储库强制要求没有两个工作区依赖于任何给定依赖项的不同版本，除非明确允许。

Our constraints engine used to be powered by Tau-Prolog, a JavaScript [Prolog](https://en.wikipedia.org/wiki/Prolog#Rules_and_facts) implementation. Unlike imperative languages like JavaScript, Prolog uses a different model called logic programming - you define that something exists if a rule is true. It’s a very interesting pattern that integrates well with the concept of rule-based linting. Unfortunately, Prolog proved very complex to use, increasing the learning curve of constraints past the threshold we were comfortable with.我们的约束引擎过去由 JavaScript Prolog 实现的 Tau-Prolog 提供支持。与 JavaScript 等命令式语言不同，Prolog 使用一种称为逻辑编程的不同模型 - 如果规则为真，则定义存在某些东西。这是一个非常有趣的模式，与基于规则的 linting 的概念很好地集成在一起。不幸的是，Prolog 被证明使用起来非常复杂，将约束的学习曲线增加到了我们满意的阈值之外。

As a result, Prolog constraints are deprecated starting from Yarn 4, and **they have been superseded by a shiny new JavaScript-based engine, with optional TypeScript support!** We have been writing our own rules at [Datadog](https://www.datadoghq.com/) with this framework for a couple of months now, with great success. You can also check the public [Yarn repository](https://github.com/yarnpkg/berry/blob/c3b319a8943dcc35e689ebff4051c112bfc598f5/yarn.config.cjs#L17-L43) for a practical example of the kind of rules you can enforce at the repository level, and the [newly revamped documentation](https://yarnpkg.com/features/constraints) is there to help you quickly get up to speed.因此，Prolog 约束从 Yarn 4 开始被弃用，并且它们已被一个闪亮的基于 JavaScript 的新引擎所取代，该引擎具有可选的 TypeScript 支持！几个月来，我们一直在 Datadog 上用这个框架编写自己的规则，并取得了巨大的成功。您还可以查看公共 Yarn 存储库，以获取可以在存储库级别强制执行的规则类型的实际示例，新修订的文档可帮助您快速上手。

tip 提示

The new optional `enableConstraintsChecks` setting will make Yarn run your constraints as part of `yarn install`. It’s a handy way to surface errors before having to wait for the remote CI to raise them, and since the new engine is so fast, it has almost no impact on your install time 🚀新的可选 `enableConstraintsChecks` 设置将使 Yarn 将约束作为 的一部分 `yarn install` 运行。这是一种在等待远程 CI 引发错误之前发现错误的便捷方法，而且由于新引擎速度如此之快，因此对您的安装时间🚀几乎没有影响

Various features in Yarn used to be shipped as sideloaded plugins that needed to be managed separately from the main bundle. While this helped us build a plugin ecosystem, it also proved challenging to manage for our users. We implemented some features to make that easier (auto-upgrade plugins when you auto-update Yarn), but in the end the few KiBs we gained by not shipping all the features by default weren’t worth the confusion and friction they caused.Yarn 中的各种功能过去都是作为旁加载插件提供的，需要与主捆绑包分开管理。虽然这有助于我们构建插件生态系统，但事实证明，为我们的用户管理也具有挑战性。我们实现了一些功能来简化此操作（自动更新 Yarn 时会自动升级插件），但最终，由于默认情况下没有提供所有功能而获得的几个 KiB 不值得它们造成的混乱和摩擦。

As a result, while Yarn still supports third-party plugins (and will continue to in the future), **all the features and commands we build are now available as part of the main distribution**. You can now use `yarn upgrade-interactive` and `yarn stage` without plugins and, if you have TypeScript configured in your project, Yarn will now auto-add and remove `@types` packages as needed whenever you update your dependencies with `yarn add` and `yarn remove`.

## Improved User Interface​

Various pieces of the UI got revamped to better convey information. For example, `yarn install` now tells you the packages you added, and their total weight. You will also notice it doesn’t print as much warnings around peer dependencies, as we now try to only print warnings for actionable situations:

```
➤ YN0000: · Yarn 4.0.0

➤ YN0000: ┌ Resolution step

➤ YN0085: │ + next@npm:13.5.4, react-dom@npm:18.2.0, and 24 more.

➤ YN0000: └ Completed in 0s 280ms

➤ YN0000: ┌ Fetch step

➤ YN0013: │ 22 packages were added to the project (+ 177.72 MiB).

➤ YN0000: └ Completed in 3s 723ms

➤ YN0000: ┌ Link step

➤ YN0000: └ Completed

➤ YN0000: · Done with warnings in 4s 123ms
```

Another example is the `yarn config` command, which sports a new tree display and now also accepts an arbitrary number of settings as positional arguments, letting you select what you wish to see:

```
├─ cacheFolder

│  ├─ Description: Folder where the cache files must be written

│  ├─ Source: 

│  └─ Value: '/Users/global/.yarn/berry/cache'

│

└─ enableHardenedMode

   ├─ Description: If true, automatically enable --check-resolutions --refresh-lockfile on installs

   ├─ Source: 

   └─ Value: null
```

## Performances​

The 4.0 isn’t lagging behind in performance improvements, and shows to be significantly faster at installs than the 3.6. For instance, here’s the difference in time to install Gatsby and its ~350MiB dependency tree from a cold cache. The 3x improved performances are due to a new package metadata cache which significantly improves performances of repeated installs:

```
hyperfine -L v stable,canary --prepare 'rm -rf ~/.yarn/berry/cache' 'cd $(mktemp -d) && yarn init -2 && yarn set version {v} && yarn && yarn add gatsby --mode=skip-build'
```

```
Benchmark 1: 3.6.0
  Time (mean ± σ):     65.599 s ±  2.214 s    [User: 82.952 s, System: 8.638 s]
  Range (min … max):   62.167 s … 68.277 s    10 runs

Benchmark 2: 4.0.0
  Time (mean ± σ):     16.724 s ±  0.928 s    [User: 14.622 s, System: 5.743 s]
  Range (min … max):   15.318 s … 18.110 s    10 runs

Summary
  4.0.0 ran 3.92 ± 0.25 times faster than 3.6.0
```

These changes make Yarn [as fast as pnpm in most scenarios](https://yarnpkg.com/features/performances), although competition is still fierce 🔥

## Fancy Website​

As you probably noticed, our website received a major overhaul, both style and content! We worked on this new iteration for more than a year now, and we hope it’ll help you find better information, faster than before.

Some particular improvements:

* All referenced commands now link to their documentation (`yarn install`)

* All referenced options now have a tooltip explaining their goal (`yarn --immutable-cache`)

* Most pages were rewritten to be both simplified & clarified when needed

* The package page now shows various configurable checks, like whether a package supports CJS, ESM, has types, …

Our expertise lies in tooling more than building websites, so I’m sure various hanging fruits remain - especially around loading time. If you’re interested to help us, check the [sources](https://github.com/yarnpkg/berry/tree/master/packages/docusaurus) and please feel free to send PRs our way!

## Closing Words​

The journey to transition from Yarn 3 to Yarn 4 was a lengthy one, with a whopping 53 release candidates along the way, but we finally made it! Our aim for this new iteration has been to both decrease Yarn’s learning curve and improve your user experience, without the migration feeling overwhelming. We made concerted efforts to avoid making significant breaking changes unless we also had ways to automatically migrate projects, so if you encounter any issues that you believe the software should have addressed, share your feedback with us on [Discord](https://discord.gg/yarnpkg).

As for what lies ahead, it’s a bit too early to provide a definitive answer, but I can tell you I’m particularly intrigued by the potential for native Yarn builds. Performances has been under the spotlight lately, and I sometimes wonder how much overhead may have Node.js on the overall execution time. That being said, we don’t plan on undertaking another complete rewrite of the codebase, nor do we want to compromise the factors that make Yarn so contributor-friendly, so the specifics, as well as the timeline, are still under consideration.

In the meantime we’ll continue to build upon our existing foundations for the time being. From CLI completion and UI commands to reducing the learning curve and general upkeep, we have a broad array of improvements on our radar. So see you next time!
