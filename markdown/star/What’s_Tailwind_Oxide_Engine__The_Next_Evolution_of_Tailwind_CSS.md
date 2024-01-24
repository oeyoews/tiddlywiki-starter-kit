---
title: 'What’s_Tailwind_Oxide_Engine__The_Next_Evolution_of_Tailwind_CSS'
tags: ['剪藏', 'Tailwindcss']
type: 'text/markdown'
created: 'Sun Oct 22 2023 09:47:15 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: 'oeyoews'
url: 'https://medium.com/@bomber.marek/whats-tailwind-oxide-engine-the-next-evolution-of-tailwind-css-32e7ef8e19a1'
---

# What’s_Tailwind_Oxide_Engine__The_Next_Evolution_of_Tailwind_CSS

[![](https://miro.medium.com/v2/resize:fill:88:88/1*qwfc2GZ5r3n1fw88Hd15Dw.jpeg)](https://medium.com/@bomber.marek?source=post_page-----32e7ef8e19a1--------------------------------)

![](https://miro.medium.com/v2/resize:fit:1050/1*yLDpP5bJTVWcoi_4UBJmGg.png)

Tailwind CSS, with its fast utility-first approach to styling, amazing design systems, and the ability to be consistent across projects and teams, has emerged as a game-changer in the web development space.Tailwind CSS 凭借其快速的实用程序优先的样式方法、令人惊叹的设计系统以及跨项目和团队保持一致的能力，已成为 Web 开发领域的游戏规则改变者。

With over 25 million downloads per month and brands like Shopify, OpenAI, Netflix, Nike, Mr. Beast’s Feastables, and many many more using it (more than 5 million of open-source projects on Github), its popularity is more than clear.每月下载量超过 2500 万次，Shopify，OpenAI，Netflix，Nike，Mr. Beast’s Feastables 等品牌使用它（Github 上有超过 500 万个开源项目），它的受欢迎程度非常明显。

Building on this foundation, [Adam Wathan](https://adamwathan.me/) and [Tailwind Labs](https://www.linkedin.com/company/tailwind-labs/) are now working on the Tailwind Oxide Engine, a significant evolution that simplifies the toolchain, boosts performance, and streamlines configuration.在此基础上，Adam Wathan 和 Tailwind Labs 现在正在研究 Tailwind Oxide Engine，这是一项重大演变，可简化工具链、提高性能并简化配置。

**Table of Contents**: 目录

· Will Oxide break my app?·氧化物会破坏我的应用程序吗？\

· What is Tailwind Oxide Engine?·什么是顺风氧化物发动机？\

∘ 1) Unified toolchain∘ 1）统一工具链\

∘ 2) Oxide under the hood — ⚡ ️Lightning CSS∘ 2）引擎盖下的氧化物 — ⚡ ️闪电 CSS\

∘ 3) Simplified Configuration∘ 3）简化配置\

· Conclusion — The Impact of the Oxide Engine on Tailwind·结论 — 氧化物发动机对顺风的影响

## **Will Oxide break my app？氧化物会破坏我的应用程序吗？**

Short answer: No, it will not.简短的回答：不，它不会。

First of all, Oxide is not some new paradigm shift in how developers write Tailwind CSS but rather a set of upgrades to what’s going on under the hood.首先，Oxide 不是开发人员编写 Tailwind CSS 的新范式转变，而是对引擎盖下发生的事情的一系列升级。

It’s also worth mentioning that all these changes should be **backwards compatible** since that’s the team’s goal.还值得一提的是，所有这些更改都应该向后兼容，因为这是团队的目标。

## **What is Tailwind Oxide Engine？什么是顺风氧化物发动机？**

As mentioned earlier, Oxide is designed to unify the toolchain, boost performance, and streamline configuration.如前所述，Oxide 旨在统一工具链、提高性能并简化配置。

So let’s start with the toolchain first.因此，让我们先从工具链开始。

## 1) Unified toolchain 1）统一工具链

The term“toolchain”refers to the set of software development tools used in combination to complete complex tasks.术语“工具链”是指组合用于完成复杂任务的一组软件开发工具。

In the context of Tailwind CSS, the toolchain includes dependencies like:在 Tailwind CSS 的上下文中，工具链包括以下依赖项：

1. [**PostCSS**](https://postcss.org/): This is the foundation which Tailwind CSS is built upon. It transforms styles with JavaScript, allowing for features like variables, nesting, and mixins.PostCSS：这是 Tailwind CSS 的基础。它使用 JavaScript 转换样式，允许变量、嵌套和混合等功能。

1. [**AutoPrefixer**](https://github.com/postcss/autoprefixer): A PostCSS plugin that automatically adds vendor prefixes CSS. This makes styles work across different browsers (even those that require specific prefixes for certain CSS features).AutoPrefixer：一个 PostCSS 插件，可以自动添加供应商前缀 CSS。这使得样式可以在不同的浏览器上工作（即使是那些需要某些 CSS 功能的特定前缀的浏览器）。

1. [**PostCSS Import**](https://github.com/postcss/postcss-import): This plugin allows to use @import rules in CSS for a more modular CSS structure. These rules are then processed at build time.PostCSS 导入：此插件允许在 CSS 中使用@import 规则来实现更模块化的 CSS 结构。然后在生成时处理这些规则。

1. [**PostCSS Preset Env**](https://github.com/csstools/postcss-preset-env): This plugin automatically adds necessary fallbacks for older browsers and handles compatibility issues.PostCSS 预设环境：此插件会自动为旧版浏览器添加必要的回退并处理兼容性问题。

But that means developers have to manage these dependencies and everything that comes with it themselves.但这意味着开发人员必须自己管理这些依赖项以及随之而来的所有内容。

In essence, Oxide integrates these functionalities by incorporating the logic of these separate tools into its own codebase. This allows Oxide to provide the same functionalities as these tools without requiring them as separate dependencies.从本质上讲，Oxide 将这些独立工具的逻辑合并到自己的代码库中来集成这些功能。这允许 Oxide 提供与这些工具相同的功能，而无需将它们作为单独的依赖项。

## 2) Oxide under the hood — ⚡ ️Lightning CSS2）引擎盖下的氧化物 — ⚡ ️闪电 CSS

Now let’s look at how Oxide improves Tailwind’s performance.现在让我们看看 Oxide 如何提高 Tailwind 的性能。

Oxide is powered by a Rust-based CSS transformation tool called Lightning CSS, developed by the Parcel team. Essentially, Lightning CSS handles all the features that would typically require a separate PostCSS plugin.Oxide 由基于 Rust 的 CSS 转换工具（称为 Lightning CSS）提供支持，该工具由 Parcel 团队开发。从本质上讲，Lightning CSS 处理了通常需要单独 PostCSS 插件的所有功能。

Lightning CSS is super fast, outperforming comparable JavaScript-based tools by over 100 times and also does a better job at minifying which reduces the final .css file size even more as well.Lightning CSS 非常快，性能比同类基于 JavaScript 的工具高出 100 倍以上，并且在缩小方面也做得更好，从而进一步减小了最终.css 文件大小。

![](https://miro.medium.com/v2/resize:fit:1050/1*Il4X5gZ2aa082CN6Rk8kUQ.png)

It can process and minify 2.7 million lines of code per second on a single thread, but it’s leveraging Rust’s ability to use multithreading and parallelization to be **blazingly fast**.它可以在单个线程上每秒处理和缩小 270 万行代码，但它利用了 Rust 使用多线程和并行化的能力，速度非常快。

Oxide makes Tailwind more than 2x faster during build time than the current version.氧化物使 Tailwind 在构建期间比当前版本快 2 倍以上。

![](https://miro.medium.com/v2/resize:fit:1050/1*hjzq1BkdTUKlZ9FiyJ_Jsw.png)

In addition, Lightning CSS supports CSS modules, which locally scope classes, ids, @keyframes, CSS variables, and more. This feature is particularly useful in preventing unintended name clashes between different CSS files.此外，Lightning CSS 还支持 CSS 模块，这些模块在本地作用域类、id、@keyframes、CSS 变量等。此功能在防止不同 CSS 文件之间意外的名称冲突方面特别有用。

Look at [**Lightning CSS**](https://lightningcss.dev/docs.html) docs if you want to learn more.如果您想了解更多信息，请查看 Lightning CSS 文档。

## 3) Simplified Configuration3）简化配置

Right now, there are two config files that developers need to manage, and that’s `tailwind.config.js` and `postcss.config.js`.现在，开发人员需要管理两个配置文件，那就是 `tailwind.config.js` 和 `postcss.config.js` 。

But there is also the `app.css` file which is used for importing Tailwind’s base, components, and utilities, adding custom styles or overrides, and with Oxide, defining your theme and fonts directly in your CSS.但是还有用于 `app.css` 导入 Tailwind 的基础，组件和实用程序，添加自定义样式或覆盖的文件，以及使用 Oxide 直接在 CSS 中定义主题和字体的文件。

The goal here is to make Tailwind CSS feel **native** so that you just install it, it works, and you go (or at least mitigate the configuration needed as much as possible).这里的目标是让 Tailwind CSS 感觉原生，这样你只需安装它，它就可以工作了，然后你就可以了（或者至少尽可能减轻所需的配置）。

Let’s quickly look at app.css first since we will come back to it again a little later in conjunction with tailwind.config.js.让我们快速看一下 app.css 首先，因为我们稍后会结合 Tailwind.config.js 再次回到它。

**— app.css — 应用.css**

In the app.css file you need to use directives like `@tailwind base;`, `@tailwind components;`, and `@tailwind utilities;` to import different parts of Tailwind CSS into your project.在 app.css 文件中，您需要使用、 `@tailwind components;` 等 `@tailwind base;` 指令，并将 `@tailwind utilities;` Tailwind CSS 的不同部分导入到项目中。

```
@tailwind base;
@tailwind components;
@tailwind utilities;

@import "./fonts" layer(base)
```

That is now reduced only to 现在只减少到

```
@import 'tailwindcss';

@import "./fonts" layer(base)
```

Very minor but nice quality of life change.非常小，但生活质量的变化很好。

Now we’ll look at tailwind.config.js.现在我们来看看 tailwind.config.js。

**— tailwind.config.js — 顺风配置.js**

```
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        monument: ['Monument', 'sans-serif'],
      },
      colors: {
        primary: '#0D6EFD',
        secondary: '#6D28D9',
      },
    },
  },
  plugins: [],
}
```

One of the most common, annoying, but very simple problem developers are running into is they are forgetting to update their **content array** in tailwind.config.js.开发人员遇到的最常见、最烦人但非常简单的问题之一是他们忘记在 tailwind.config.js 中更新他们的内容数组。

They then waste time debugging, trying to figure out why is the class not being applied when it’s there in the code.然后，他们浪费时间进行调试，试图找出为什么当类在代码中存在时没有应用该类。

The answer to this is **automatic content detection**.答案是自动内容检测。

Since the engine is rewritten in Rust, it can do more work and way faster than it was possible before.由于引擎是用 Rust 重写的，它可以做更多的工作，并且比以前更快。

The team came up with some“smart algorithms”that can make educated guesses about where files are located based on existing files, their locations, and the extensions used.该团队提出了一些“智能算法”，可以根据现有文件、文件的位置和使用的扩展名对文件的位置进行有根据的猜测。

That means you can get rid of the content array completely.这意味着您可以完全摆脱内容数组。

```
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        monument: ['Monument', 'sans-serif'],
      },
      colors: {
        primary: '#0D6EFD',
        secondary: '#6D28D9',
      },
    },
  },
  plugins: [],
}
```

The team is also **prototyping** and **experimenting** with CSS-based configuration (theme) in tailwind.config.js.该团队还在 tailwind.config.js 中对基于 CSS 的配置（theme）进行原型设计和试验。

Again the goal is to make Tailwind feel more native and right now we are wrapping these CSS values in Javascript and putting them in a config file.同样，我们的目标是让 Tailwind 感觉更原生，现在我们正在将这些 CSS 值包装在 Javascript 中并将它们放在配置文件中。

We basically have CSS where it shouldn’t be and overall have an awkward Javascript layer on top of it.我们基本上在不应该的地方有 CSS，并且总体上有一个尴尬的 Javascript 层。

So the idea is to get rid of `tailwind.config.js` completely and move all the stuff to** app.css**.所以这个想法是 `tailwind.config.js` 完全摆脱并将所有的东西移动到应用程序.css。

So in the future we will be able to do something like this 所以将来我们将能够做这样的事情

```
@import 'tailwindcss';

@import "./fonts" layer(base)

:root {
  --font-family-sans: 'Roboto', 'sans-serif';
  --font-family-monument: 'Monument', 'sans-serif';

  --color-primary: #0D6EFD;
  --color-secondary: #6D28D9;
}
```

This to me definitely feels like a way nicer developer experience since we don’t have this weird separation of CSS in some config file anymore and the code is exactly where I would be expecting it to be.对我来说，这绝对是一种更好的开发人员体验，因为我们在某些配置文件中不再有这种奇怪的 CSS 分离，而且代码正是我期望它的位置。

**— postcss.config.js**

Here the idea of feeling more native is the same and as we mentioned before Oxide integrates all postCSS plugins you could think of in itself.在这里，感觉更原生的想法是相同的，正如我们之前提到的，Oxide 集成了您自己可以想到的所有 postCSS 插件。

There are also some rules about the order of having these plugins in the config file because each plugin transforms the CSS code in a specific way, and the order of transformations can affect the final result.关于在配置文件中使用这些插件的顺序也有一些规则，因为每个插件都以特定的方式转换 CSS 代码，并且转换的顺序会影响最终结果。

Managing that is just unnecessary **mental overhead** and is prone to errors.管理它只是不必要的精神开销，并且容易出错。

This is an example of how postcss.config.js could look like 这是 postcss.config.js 的示例。

```
module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-css-variables': {},
    'postcss-nested': {},
    tailwindcss: {},
    autoprefixer: {},
    'postcss-preset-env': {},
  },
}
```

Well with Oxide all you’ll need and all you’ll have to worry about is this.有了氧化物，您所需要的只是这个。

```
module.exports = {
  plugins: {
    tailwindcss: {},
  },
}
```

But the team is also apparently collaborating with some major frameworks and build tools (that’s all we know for now) to get Tailwind **detected** so that we don’t even need the postcss.config.js file.但是该团队显然也在与一些主要的框架和构建工具（这就是我们现在所知道的）合作，以检测 Tailwind，这样我们甚至不需要 postcss.config.js 文件。

## Conclusion — The Impact of the Oxide Engine on Tailwind 结论 — 氧化物发动机对顺风的影响

The introduction of the Oxide Engine marks a significant milestone in the evolution of Tailwind CSS.Oxide Engine 的推出标志着 Tailwind CSS 发展的一个重要里程碑。

By enhancing the strengths of Tailwind and addressing some of its complexities, Oxide is set to make Tailwind a more powerful, efficient, and user-friendly tool for web developers.通过增强 Tailwind 的优势并解决其一些复杂性，Oxide 将使 Tailwind 成为 Web 开发人员更强大，高效和用户友好的工具。

The performance improvements brought about by the integration of Lightning CSS, coupled with the simplification of the development process through automatic content detection and CSS-based configuration, are poised to really enhance the Tailwind experience. These features not only streamline the development process but also make Tailwind more intuitive and accessible.Lightning CSS 集成带来的性能改进，加上通过自动内容检测和基于 CSS 的配置简化开发过程，有望真正增强 Tailwind 体验。这些功能不仅简化了开发过程，还使 Tailwind 更加直观和易于访问。

Moreover, Oxide’s focus on making Tailwind feel more native to CSS brings Tailwind closer to the core of CSS development. This is a significant step towards integrating Tailwind more seamlessly into the web development process.此外，Oxide 专注于让 Tailwind 感觉更原生于 CSS，这使得 Tailwind 更接近 CSS 开发的核心。这是将 Tailwind 更无缝地集成到 Web 开发过程中的重要一步。

Overall Oxide promises to enhance the efficiency of development cycles, simplify the development process, and make Tailwind a more integrated part of the web development toolkit. The future of Tailwind, powered by the Oxide Engine, looks promising and exciting for the web development community.总体而言，Oxide 有望提高开发周期的效率，简化开发过程，并使 Tailwind 成为 Web 开发工具包中集成性更强的一部分。由氧化物引擎驱动的 Tailwind 的未来对于 Web 开发社区来说看起来很有希望和令人兴奋。
