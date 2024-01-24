---
title: 'A_word_about_Bun_💬___Yarn'
tags: ['剪藏']
type: 'text/markdown'
created: 'Tue Oct 24 2023 06:08:18 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: '太微搜藏'
url: 'https://yarnpkg.com/blog/bun'
---

# A_word_about_Bun_💬___Yarn

I’m sure many of you are curious about our position regarding [Bun](https://bun.sh/), the product from Oven, the company behind Bun (we’re going in cycles). It’s so fast, is there any merits to using Yarn？我相信你们中的许多人都对我们对 Bun 的立场感到好奇，Bun 是 Oven 的产品，Bun 背后的公司（我们正在循环中）。这么快，用纱线有什么好处吗？

First, we feel useful to point out that this sentence isn’t particularly new. We heard the same (often from the same people) asking why use Yarn when npm/pnpm/whateverpm have all its features or outspeed it. Answering that is a little tough, because the premise is wrong: other package managers don’t have its features1,2, and the speed differences are at best marginal. They are a good fight, but we believe Yarn ultimately has a unique position that no other package managers emulates today.首先，我们觉得有必要指出这句话并不是特别新。我们听到同样的人（通常来自同一个人）问为什么在 npm/pnpm/whateverpm 具有其所有功能或超过它时使用 Yarn。回答这个问题有点困难，因为前提是错误的：其他包管理器没有它的功能 1 ,2 ，速度差异充其量是微不足道的。这是一场精彩的战斗，但我们相信 Yarn 最终拥有今天其他包管理器无法模仿的独特地位。

Bun is an interesting case, though. It’s definitely much faster3. Can Yarn compete? We believe so.不过，Bun 是一个有趣的案例。它肯定快 3 得多。纱线能竞争吗？我们相信是这样。

First, remember today’s iteration of Yarn was developped over the course of two years by a team already experienced in package managers. Those tools are fickle beasts, and many edge cases loom around4. Bun may be fast, but is it correct? That’s something the community will have to figure out over time.首先，请记住，今天的 Yarn 迭代是由一个在包管理器方面已经经验丰富的团队在两年的时间里开发的。这些工具是善变的野兽，许多边缘情况若隐若现 4 。包子可能很快，但它是正确的吗？随着时间的推移，这是社区必须弄清楚的事情。

But stability isn’t everything: the feature set is an important facet of what makes a tool appealing. The developer experience (which includes the user interface) is another. The governance yet another. Yarn stills fits its niche: a complete tool that empowers its users, advocates for good practices, isn’t afraid to explore uncharted territories, and is protected from perverse corporate incentives.但稳定性并不是一切：功能集是使工具具有吸引力的一个重要方面。开发人员体验（包括用户界面）是另一个。治理又是另一个。Yarn 蒸馏器适合其利基市场：一个完整的工具，可以赋予用户权力，倡导良好实践，不怕探索未知领域，并免受不正当的企业激励。

With that said, I believe there’s a couple of things we can learn from Bun. Yarn was always intended to be distributed as a unique JS file for extreme portability across Node.js supported architectures. With [Corepack](https://nodejs.org/api/corepack.html) now being the preferred install strategy, does it still matter? Should we experiment with native modules for future releases, that Corepack would transparently fetch as needed? Bun proved untapped performances could be exploited.话虽如此，我相信我们可以从 Bun 身上学到几件事。Yarn 一直打算作为唯一的 JS 文件分发，以便在 Node 支持的架构.js 具有极高的可移植性。随着 Corepack 现在是首选的安装策略，它仍然重要吗？我们是否应该在未来版本中尝试本机模块，以便 Corepack 根据需要透明地获取？Bun 证明了未开发的表演可以被利用。

Of course it’s not just a matter of being native - Oven’s work follows [interesting code patterns](https://twitter.com/jarredsumner/status/1708650105828692054), and I’m curious how much of an impact they have on the resulting speed (at the cost of increased complexity, and making contributions harder).当然，这不仅仅是原生的问题 - Oven 的工作遵循有趣的代码模式，我很好奇它们对最终的速度有多大影响（代价是复杂性增加，并且使贡献更加困难）。

I always fought against the idea that one package manager was enough for every single project out there, Yarn included. Our users are engineers: they have different requirements, different priorities, and different sensibilities. I found Yarn the appropriate tool for my projects, but I’m sure Zoltan is perfectly happy with pnpm and Microsoft with npm.我总是反对这样一种观点，即一个包管理器就足以满足每个项目的需求，包括 Yarn。我们的用户是工程师：他们有不同的要求、不同的优先级和不同的敏感性。我发现 Yarn 是适合我的项目的工具，但我确信 Zoltan 对 pnpm 非常满意，对 npm Microsoft 非常满意。

Will Bun reach some of your hearts? More than likely. Will it be a replacement? I can’t imagine that.包子会打动你的一些心吗？很有可能。会是替代品吗？我无法想象。
