---
title: 'RSC_From_Scratch._Part_1__Server_Components_·_reactwg_server-components_·_Discussion_'
tags: ['剪藏']
type: 'text/markdown'
created: 'Mon Nov 13 2023 04:56:44 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: '太微搜藏'
url: 'https://github.com/reactwg/server-components/discussions/5'
---

# RSC_From_Scratch._Part_1__Server_Components_·_reactwg_server-components_·_Discussion_

## RSC From Scratch. Part 1: Server ComponentsRSC 从头开始。第 1 部分：服务器组件

In this technical deep dive, we’ll implement a very simplified version of [React Server Components](https://github.com/reactjs/rfcs/blob/main/text/0188-server-components.md) (RSC) from scratch.在这个技术深入探讨中，我们将从头开始实现一个非常简化的 React 服务器组件（RSC）版本。\

This deep dive will be published in several parts:本深入探讨将分几个部分发布：

* **Part 1: Server Components** (this page) 第 1 部分：服务器组件（本页）

* Part 2: Client Components *(not written yet)*第 2 部分：客户端组件（尚未编写）

* Part 3: TBD *(not written yet)*第 3 部分：待定（尚未编写）

## Seriously, this is a deep dive! 说真的，这是一个深入的潜水！

This deep dive doesn’t explain the benefits of React Server Components, how to implement an app using RSC, or how to implement a framework using them. Instead, it walks you through the process of “inventing” them on your own from scratch.本深入探讨没有解释 React Server 组件的好处，如何使用 RSC 实现应用程序，或者如何使用它们实现框架。相反，它会引导您从头开始自行“发明”它们的过程。

🔬 **This is a deep dive for people who like to learn new technologies by implementing them from scratch.**🔬 对于喜欢通过从头开始实施新技术来学习新技术的人来说，这是一个深入的探讨。\

It assumes some background in web programming and some familiarity with React.它假设有一定的 Web 编程背景和对 React 的熟悉程度。

🚧 **This deep dive is not intended as an introduction to how to *use* Server Components.** We are working to document Server Components on the React website. In the meantime, if your framework supports Server Components, please refer to its docs.🚧 本深入探讨不旨在介绍如何使用服务器组件。我们正在努力在 React 网站上记录服务器组件。同时，如果您的框架支持服务器组件，请参阅其文档。

😳 **For pedagogical reasons, our implementation will be significantly less efficient than the real one used by React.**😳 出于教学原因，我们的实现效率将明显低于 React 使用的实际实现。\

We will note future optimization opportunities in the text, but we will strongly prioritize conceptual clarity over efficiency.我们将在文本中指出未来的优化机会，但我们将高度重视概念的清晰度而不是效率。

## Let’s jump back in time…让我们回到过去…

Suppose that you woke up one morning and found out it’s 2003 again. Web development is still in its infancy. Let’s say you want to create a personal blog website that shows content from text files on your server. In PHP, it could look like this:假设你有一天早上醒来，发现又是 2003 年。Web 开发仍处于起步阶段。假设您要创建一个个人博客网站，以显示服务器上文本文件中的内容。在 PHP 中，它可能看起来像这样：

```
<?php
  $author = "Jae Doe";
  $post_content = @file_get_contents("./posts/hello-world.txt");
?>
<html>
  <head>
    <title>My blog</title>
  </head>
  <body>
    <nav>
      <a href="/">Home</a>
      <hr>
    </nav>
    <article>
      <?php echo htmlspecialchars($post_content); ?>
    </article>
    <footer>
      <hr>
      <p><i>(c) <?php echo htmlspecialchars($author); ?>, <?php echo date("Y"); ?></i></p>
    </footer>
  </body>
</html>
```

*(We’re going to pretend that tags like `<nav>`, `<article>`, and `<footer>` existed back then to keep the HTML easy to read.)（我们将假设像、 `<article>` 和 `<footer>` 这样的 `<nav>` 标签在当时就存在，以保持 HTML 易于阅读。*

When you open `http://locahost:3000/hello-world` in your browser, this PHP script returns an HTML page with the blog post from `./posts/hello-world.txt`. An equivalent Node.js script written using the today’s Node.js APIs might look like this:当您在浏览器中打开 `http://locahost:3000/hello-world` 时，此 PHP 脚本将返回一个 HTML 页面，其中包含来自 `./posts/hello-world.txt` 的博客文章。使用当今的 Node.js API 编写的等效 Node.js 脚本可能如下所示：

```
import { createServer } from 'http';
import { readFile } from 'fs/promises';
import escapeHtml from  'escape-html';

createServer(async (req, res) => {
  const author = "Jae Doe";
  const postContent = await readFile("./posts/hello-world.txt", "utf8");
  sendHTML(
    res,
    `<html>
      <head>
        <title>My blog</title>
      </head>
      <body>
        <nav>
          <a href="/">Home</a>
          <hr />
        </nav>
        <article>
          ${escapeHtml(postContent)}
        </article>
        <footer>
          <hr>
          <p><i>(c) ${escapeHtml(author)}, ${new Date().getFullYear()}</i></p>
        </footer>
      </body>
    </html>`
  );
}).listen(8080);

function sendHTML(res, html) {
  res.setHeader("Content-Type", "text/html");
  res.end(html);
}
```

**[Open this example in a sandbox.在沙盒中打开此示例。](https://codesandbox.io/p/sandbox/nostalgic-platform-kvog0r?file=%2Fserver.js)**

Imagine that you could take a CD-ROM with a working Node.js engine back to 2003, and you could run this code on the server. If you wanted to bring a React-flavored paradigm to that world, what features would you add, and in what order？想象一下，您可以将带有正常工作的 Node.js 引擎的 CD-ROM 带回 2003 年，并且可以在服务器上运行此代码。如果你想给这个世界带来一个 React 风格的范式，你会添加什么功能，以什么顺序？

## Step 1: Let’s invent JSX 第 1 步：让我们发明 JSX

The first thing that’s not ideal about the code above is direct string manipulation. Notice you’ve had to call `escapeHtml(postContent)` to ensure that you don’t accidentally treat content from a text file as HTML.上面代码不理想的第一件事是直接字符串操作。请注意，您必须进行调用 `escapeHtml(postContent)` 以确保不会意外地将文本文件中的内容视为 HTML。

One way you could solve this is by splitting your logic from your “template”, and then introducing a separate templating language that provides a way to inject dynamic values for text and attributes, escapes text content safely, and provides domain-specific syntax for conditions and loops. That’s the approach taken by some of the most popular server-centric frameworks in 2000s.解决此问题的一种方法是将逻辑从“模板”中分离出来，然后引入一种单独的模板语言，该语言提供了一种为文本和属性注入动态值的方法，安全地转义文本内容，并为条件和循环提供特定于域的语法。这是 2000 年代一些最流行的以服务器为中心的框架所采用的方法。

However, your existing knowledge of React might inspire you to do this instead:但是，你现有的 React 知识可能会激励你这样做：

```
createServer(async (req, res) => {
  const author = "Jae Doe";
  const postContent = await readFile("./posts/hello-world.txt", "utf8");
  sendHTML(
    res,
    <html>
      <head>
        <title>My blog</title>
      </head>
      <body>
        <nav>
          <a href="/">Home</a>
          <hr />
        </nav>
        <article>
          {postContent}
        </article>
        <footer>
          <hr />
          <p><i>(c) {author}, {new Date().getFullYear()}</i></p>
        </footer>
      </body>
    </html>
  );
}).listen(8080);
```

This looks similar, but our “template” is not a string anymore. Instead of writing string interpolation code, we’re putting a subset of XML into JavaScript. In other words, we’ve just “invented” JSX. JSX lets you keep markup close to the related rendering logic, but unlike string interpolation, it prevents mistakes like mismatching open/close HTML tags or forgetting to escape text content.这看起来很相似，但是我们的“模板”不再是字符串了。我们不是编写字符串插值代码，而是将 XML 的子集放入 JavaScript 中。换句话说，我们刚刚“发明”了 JSX。JSX 允许您将标记保持在相关的渲染逻辑附近，但与字符串插值不同的是，它可以防止错误，例如不匹配打开/关闭 HTML 标记或忘记转义文本内容。

Under the hood, JSX produces a tree of objects that look like this:在后台，JSX 生成一个对象树，如下所示：

```
// Slightly simplified
{
  $$typeof: Symbol.for("react.element"), // Tells React it's a JSX element (e.g. <html>)
  type: 'html',
  props: {
    children: [
      {
        $$typeof: Symbol.for("react.element"),
        type: 'head',
        props: {
          children: {
            $$typeof: Symbol.for("react.element"),
            type: 'title',
            props: { children: 'My blog' }
          }
        }
      },
      {
        $$typeof: Symbol.for("react.element"),
        type: 'body',
        props: {
          children: [
            {
              $$typeof: Symbol.for("react.element"),
              type: 'nav',
              props: {
                children: [{
                  $$typeof: Symbol.for("react.element"),
                  type: 'a',
                  props: { href: '/', children: 'Home' }
                }, {
                  $$typeof: Symbol.for("react.element"),
                  type: 'hr',
                  props: null
                }]
              }
            },
            {
              $$typeof: Symbol.for("react.element"),
              type: 'article',
              props: {
                children: postContent
              }
            },
            {
              $$typeof: Symbol.for("react.element"),
              type: 'footer',
              props: {
                /* ...And so on... */
              }              
            }
          ]
        }
      }
    ]
  }
}
```

However, in the end what you need to send to the browser is HTML — not a JSON tree. (At least, for now!) 但是，最终您需要发送到浏览器的是 HTML，而不是 JSON 树。（至少，现在是这样！

Let’s write a function that turns your JSX to an HTML string. To do this, we’ll need to specify how different types of nodes (a string, a number, an array, or a JSX node with children) should turn into pieces of HTML:让我们编写一个函数，将 JSX 转换为 HTML 字符串。为此，我们需要指定不同类型的节点（字符串、数字、数组或带有子节点的 JSX 节点）应该如何转换为 HTML 片段：

```
function renderJSXToHTML(jsx) {
  if (typeof jsx === "string" || typeof jsx === "number") {
    // This is a string. Escape it and put it into HTML directly.
    return escapeHtml(jsx);
  } else if (jsx == null || typeof jsx === "boolean") {
    // This is an empty node. Don't emit anything in HTML for it.
    return "";
  } else if (Array.isArray(jsx)) {
    // This is an array of nodes. Render each into HTML and concatenate.
    return jsx.map((child) => renderJSXToHTML(child)).join("");
  } else if (typeof jsx === "object") {
    // Check if this object is a React JSX element (e.g. <div />).
    if (jsx.$$typeof === Symbol.for("react.element")) {
      // Turn it into an an HTML tag.
      let html = "<" + jsx.type;
      for (const propName in jsx.props) {
        if (jsx.props.hasOwnProperty(propName) && propName !== "children") {
          html += " ";
          html += propName;
          html += "=";
          html += escapeHtml(jsx.props[propName]);
        }
      }
      html += ">";
      html += renderJSXToHTML(jsx.props.children);
      html += "</" + jsx.type + ">";
      return html;
    } else throw new Error("Cannot render an object.");
  } else throw new Error("Not implemented.");
}
```

**[Open this example in a sandbox.在沙盒中打开此示例。](https://codesandbox.io/p/sandbox/recursing-kepler-yw7dlx?file=%2Fserver.js)**

Give this a try and see the HTML being rendered and served! 试一试，看看 HTML 的呈现和提供！

Turning JSX into an HTML string is usually known as “Server-Side Rendering” (SSR). **It is important note that RSC and SSR are two very different things (that tend to be used together).** In this guide, we’re *starting* from SSR because it’s a natural first thing you might try to do in a server environment. However, this is only the first step, and you will see significant differences later on.将 JSX 转换为 HTML 字符串通常称为“服务器端渲染”（SSR）。需要注意的是，RSC 和 SSR 是两个截然不同的东西（倾向于一起使用）。在本指南中，我们将从 SSR 开始，因为这是您在服务器环境中尝试做的第一件事。但是，这只是第一步，稍后您将看到显着差异。

## Step 2: Let’s invent components 第 2 步：让我们发明组件

After JSX, the next feature you’ll probably want is components. Regardless of whether your code runs on the client or on the server, it makes sense to split the UI apart into different pieces, give them names, and pass information to them by props.在 JSX 之后，您可能想要的下一个功能是组件。无论您的代码是在客户端还是在服务器上运行，将 UI 拆分为不同的部分，为它们命名，并通过 props 将信息传递给它们都是有意义的。

Let’s break the previous example apart into two components called `BlogPostPage` and `Footer`:让我们将前面的示例分解为两个组件，分别称为 `BlogPostPage` 和 `Footer` ：

```
function BlogPostPage({ postContent, author }) {
  return (
    <html>
      <head>
        <title>My blog</title>
      </head>
      <body>
        <nav>
          <a href="/">Home</a>
          <hr />
        </nav>
        <article>
          {postContent}
        </article>
        <Footer author={author} />
      </body>
    </html>
  );
}

function Footer({ author }) {
  return (
    <footer>
      <hr />
      <p>
        <i>
          (c) {author} {new Date().getFullYear()}
        </i>
      </p>
    </footer>
  );
}
```

Then, let’s replace inline JSX tree we had with `<BlogPostPage postContent={postContent} author={author} />`:然后，让我们将我们的内联 JSX 树替换为 `<BlogPostPage postContent={postContent} author={author} />` ：

```
createServer(async (req, res) => {
  const author = "Jae Doe";
  const postContent = await readFile("./posts/hello-world.txt", "utf8");
  sendHTML(
    res,
    <BlogPostPage
      postContent={postContent}
      author={author}
    />
  );
}).listen(8080);
```

If you try to run this code without any changes to your `renderJSXToHTML` implementation, the resulting HTML will look broken:如果您尝试在不对 `renderJSXToHTML` 实现进行任何更改的情况下运行此代码，则生成的 HTML 将看起来已损坏：

```
<!-- This doesn't look like valid at HTML at all... -->
<function BlogPostPage({postContent,author}) {...}>
</function BlogPostPage({postContent,author}) {...}>
```

The problem is that our `renderJSXToHTML` function (which turns JSX into HTML) assumes that `jsx.type` is always a string with the HTML tag name (such as `"html"`, `"footer"`, or `"p"`):问题是我们的 `renderJSXToHTML` 函数（将 JSX 转换为 HTML）假设它 `jsx.type` 始终是带有 HTML 标记名称的字符串（例如 `"html"` ， `"footer"` ，或 `"p"` ）：

```
if (jsx.$$typeof === Symbol.for("react.element")) {
  // Existing code that handles HTML tags (like <p>).
  let html = "<" + jsx.type;
  // ...
  html += "</" + jsx.type + ">";
  return html;
}
```

But here, `BlogPostPage` is a function, so doing `"<" + jsx.type + ">"` prints its source code. You don’t want to send that function’s code in an HTML tag name. Instead, let’s *call* this function — and serialize the JSX it *returns* to HTML:但是这里是一个函数， `BlogPostPage` 所以这样做 `"<" + jsx.type + ">"` 会打印它的源代码。您不希望以 HTML 标记名称发送该函数的代码。相反，让我们调用这个函数，并将它返回的 JSX 序列化为 HTML：

```
if (jsx.$$typeof === Symbol.for("react.element")) {
  if (typeof jsx.type === "string") { // Is this a tag like <div>?
    // Existing code that handles HTML tags (like <p>).
    let html = "<" + jsx.type;
    // ...
    html += "</" + jsx.type + ">";
    return html;
  } else if (typeof jsx.type === "function") { // Is it a component like <BlogPostPage>?
    // Call the component with its props, and turn its returned JSX into HTML.
    const Component = jsx.type;
    const props = jsx.props;
    const returnedJsx = Component(props);
    return renderJSXToHTML(returnedJsx); 
  } else throw new Error("Not implemented.");
}
```

Now, if you encounter a JSX element like `<BlogPostPage author="Jae Doe" />` while generating HTML, you will *call* `BlogPostPage` as a function, passing `{ author: "Jae Doe" }` to that function. That function will return some more JSX. And you already know how to deal with JSX — you pass it back to `renderJSXToHTML` which continues generating HTML from it.现在，如果你遇到一个 JSX 元素，比如 `<BlogPostPage author="Jae Doe" />` 在生成 HTML 时，你将作为一个函数调用 `BlogPostPage` ，传递给 `{ author: "Jae Doe" }` 该函数。该函数将返回更多的 JSX。而且你已经知道如何处理 JSX 了——你把它传回给 `renderJSXToHTML` JSX，继续从中生成 HTML。

This change alone is enough to add support for components and passing props. Check it out:仅此更改就足以添加对组件和传递道具的支持。一探究竟：

**[Open this example in a sandbox.在沙盒中打开此示例。](https://codesandbox.io/p/sandbox/thirsty-frost-8oug3o?file=%2Fserver.js)**

## Step 3: Let’s add some routing 第 3 步：让我们添加一些路由

Now that we’ve got basic support for components working, it would be nice to add a few more pages to the blog.现在我们已经有了对组件工作的基本支持，最好在博客中添加更多页面。

Let’s say a URL like `/hello-world` needs to show an individual blog post page with the content from `./posts/hello-world.txt`, while requesting the root `/` URL needs to show an a long index page with the content from every blog post. This means we’ll want to add a new `BlogIndexPage` that shares the layout with `BlogPostPage` but has different content inside.假设一个 URL like `/hello-world` 需要显示一个单独的博客文章页面，其中包含来自 `./posts/hello-world.txt` 的内容，而请求根 `/` URL 需要显示一个包含每篇博客文章内容的长索引页面。这意味着我们需要添加一个与布局共享但内部内容不同的新 `BlogIndexPage` 布局 `BlogPostPage` 。

Currently, the `BlogPostPage` component represents the entire page, from the very `<html>` root. Let’s extract the shared UI parts between pages (header and footer) out of the `BlogPostPage` into a reusable `BlogLayout` component:目前，该 `BlogPostPage` 组件从根 `<html>` 目录开始表示整个页面。让我们将页面之间共享的 UI 部分（页眉和页脚）提取 `BlogPostPage` 到一个可 `BlogLayout` 重用的组件中：

```
function BlogLayout({ children }) {
  const author = "Jae Doe";
  return (
    <html>
      <head>
        <title>My blog</title>
      </head>
      <body>
        <nav>
          <a href="/">Home</a>
          <hr />
        </nav>
        <main>
          {children}
        </main>
        <Footer author={author} />
      </body>
    </html>
  );
}
```

We’ll change the `BlogPostPage` component to only include the content we want to slot *inside* that layout:我们将更改组件 `BlogPostPage` ，使其仅包含要在该布局中插入的内容：

```
function BlogPostPage({ postSlug, postContent }) {
  return (
    <section>
      <h2>
        <a href={"/" + postSlug}>{postSlug}</a>
      </h2>
      <article>{postContent}</article>
    </section>
  );
}
```

Here is how `<BlogPostPage>` will look when nested inside `<BlogLayout>`:以下是 `<BlogPostPage>` 嵌套在里面 `<BlogLayout>` 时的样子：

[![](https://camo.githubusercontent.com/dcea9e9bf1bad6c54eed69f36b8807b019dbdaa850fea3fec65c0efb7db00cde/68747470733a2f2f692e696d6775722e636f6d2f546c415a346b522e706e67)](https://camo.githubusercontent.com/dcea9e9bf1bad6c54eed69f36b8807b019dbdaa850fea3fec65c0efb7db00cde/68747470733a2f2f692e696d6775722e636f6d2f546c415a346b522e706e67)

Let’s also add a *new* `BlogIndexPage` component that shows every post in `./posts/*.txt` one after another:让我们还添加一个新 `BlogIndexPage` 组件，一个接一个地显示每个帖子 `./posts/*.txt` ：

```
function BlogIndexPage({ postSlugs, postContents }) {
  return (
    <section>
      <h1>Welcome to my blog</h1>
      <div>
        {postSlugs.map((postSlug, index) => (
          <section key={postSlug}>
            <h2>
              <a href={"/" + postSlug}>{postSlug}</a>
            </h2>
            <article>{postContents[index]}</article>
          </section>
        ))}
      </div>
    </section>
  );
}
```

Then you can nest it inside `BlogLayout` too so that it has the same header and footer:然后，您也可以将其嵌套在内部 `BlogLayout` ，以便它具有相同的页眉和页脚：

[![](https://camo.githubusercontent.com/46270a98111bb2be99084df33ceaf6da3ac58a6b5a1436d9ae118e22bdc46383/68747470733a2f2f692e696d6775722e636f6d2f38356472454c522e706e67)](https://camo.githubusercontent.com/46270a98111bb2be99084df33ceaf6da3ac58a6b5a1436d9ae118e22bdc46383/68747470733a2f2f692e696d6775722e636f6d2f38356472454c522e706e67)

Finally, let’s change the server handler to pick the page based on the URL, load the data for it, and render that page inside the layout:最后，让我们更改服务器处理程序以根据 URL 选择页面，为其加载数据，并在布局中呈现该页面：

```
createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    // Match the URL to a page and load the data it needs.
    const page = await matchRoute(url);
    // Wrap the matched page into the shared layout.
    sendHTML(res, <BlogLayout>{page}</BlogLayout>);
  } catch (err) {
    console.error(err);
    res.statusCode = err.statusCode ?? 500;
    res.end();
  }
}).listen(8080);

async function matchRoute(url) {
  if (url.pathname === "/") {
    // We're on the index route which shows every blog post one by one.
    // Read all the files in the posts folder, and load their contents.
    const postFiles = await readdir("./posts");
    const postSlugs = postFiles.map((file) => file.slice(0, file.lastIndexOf(".")));
    const postContents = await Promise.all(
      postSlugs.map((postSlug) =>
        readFile("./posts/" + postSlug + ".txt", "utf8")
      )
    );
    return <BlogIndexPage postSlugs={postSlugs} postContents={postContents} />;
  } else {
    // We're showing an individual blog post.
    // Read the corresponding file from the posts folder.
    const postSlug = sanitizeFilename(url.pathname.slice(1));
    try {
      const postContent = await readFile("./posts/" + postSlug + ".txt", "utf8");
      return <BlogPostPage postSlug={postSlug} postContent={postContent} />;
    } catch (err) {
      throwNotFound(err);
    }
  }
}

function throwNotFound(cause) {
  const notFound = new Error("Not found.", { cause });
  notFound.statusCode = 404;
  throw notFound;
}
```

Now you can navigate around the blog. However, the code is getting a bit verbose and clunky. We’ll solve that next.现在，您可以在博客中导航。但是，代码变得有点冗长和笨拙。我们接下来会解决这个问题。

**[Open this example in a sandbox.在沙盒中打开此示例。](https://codesandbox.io/p/sandbox/trusting-turing-bi5vjr?file=%2Fserver.js)**

## Step 4: Let’s invent async components 第 4 步：让我们发明异步组件

You might have noticed that this part of the `BlogIndexPage` and `BlogPostPage` components looks exactly the same:您可能已经注意到， `BlogIndexPage` 和 `BlogPostPage` 组件的这一部分看起来完全相同：

[![](https://camo.githubusercontent.com/925f8eca3c36b270376f520f131d18788331125875704204eaf9013d26668096/68747470733a2f2f692e696d6775722e636f6d2f774374467a5a582e706e67)](https://camo.githubusercontent.com/925f8eca3c36b270376f520f131d18788331125875704204eaf9013d26668096/68747470733a2f2f692e696d6775722e636f6d2f774374467a5a582e706e67)

[![](https://camo.githubusercontent.com/482c84edb93135e9cc13c61936abb5a5b20e16c04da32faab906010ed29ebd16/68747470733a2f2f692e696d6775722e636f6d2f795664776b61522e706e67)](https://camo.githubusercontent.com/482c84edb93135e9cc13c61936abb5a5b20e16c04da32faab906010ed29ebd16/68747470733a2f2f692e696d6775722e636f6d2f795664776b61522e706e67)

It would be nice if we could somehow make this a reusable component. However, even if you extracted its rendering logic into a separate `Post` component, you would still have to somehow “plumb down” the `content` for each individual post:如果我们能以某种方式使它成为一个可重用的组件，那就太好了。但是，即使您将其渲染逻辑提取到一个单独的 `Post` 组件中，您仍然必须以某种方式“向下”处理每个 `content` 单独的帖子：

```
function Post({ slug, content }) { // Someone needs to pass down the `content` prop from the file :-(
  return (
    <section>
      <h2>
        <a href={"/" + slug}>{slug}</a>
      </h2>
      <article>{content}</article>
    </section>
  )
}
```

Currently, the logic for loading `content` for posts is duplicated between [here](https://codesandbox.io/p/sandbox/trusting-turing-bi5vjr?file=%2Fserver.js%3A24%2C1-28%2C7) and [here](https://codesandbox.io/p/sandbox/trusting-turing-bi5vjr?file=%2Fserver.js%3A33%2C1-36%2C9). We load it outside of the component hierarchy because the `readFile` API is asynchronous — so we can’t use it directly in the component tree. *(Let’s ignore that `fs` APIs have synchronous versions—this could’ve been a read from a database, or a call to some async third-party library.)*目前，加载帖子 `content` 的逻辑在 here 和 here 之间是重复的。我们将其加载到组件层次结构之外，因为 API 是异步的 `readFile` ，因此我们不能直接在组件树中使用它。（让我们忽略 API 具有同步版本， `fs` 这可能是从数据库中读取的，也可能是对某个异步第三方库的调用。

Or can we?.. 或者我们可以吗？…

If you are used to client-side React, you might be used to the idea that you can’t call an API like `fs.readFile` from a component. Even with traditional React SSR (server rendering), your existing intuition might tell you that each of your components needs to *also* be able to run in the browser — and so a server-only API like `fs.readFile` would not work.如果你习惯了客户端 React，你可能会习惯于你不能像从组件中调用 API 一样 `fs.readFile` 。即使使用传统的 React SSR（服务器渲染），你现有的直觉也可能会告诉你，你的每个组件也需要能够在浏览器中运行——因此，像这样的 `fs.readFile` 纯服务器 API 是行不通的。

But if you tried to explain this to someone in 2003, they would find this limitation rather odd. You can’t `fs.readFile`, really？但是，如果你试图在 2003 年向某人解释这一点，他们会发现这个限制相当奇怪。你不能 `fs.readFile` ，真的吗？

Recall that we’re approaching everything from the first principles. For now, we are *only* targeting the server environment, so we don’t need to limit our components to code that runs in the browser. It is also perfectly fine for a component to be asynchronous, since the server can just wait with emitting HTML for it until its data has loaded and is ready to display.回想一下，我们正在从第一原则开始处理一切。目前，我们只针对服务器环境，因此我们不需要将组件限制为在浏览器中运行的代码。组件异步也是完全可以的，因为服务器可以等待发出 HTML 直到其数据加载并准备好显示。

Let’s remove the `content` prop, and instead make `Post` an `async` function loads file content via an `await readFile()` call:让我们删除 `content` prop，而是让 `Post` 一个 `async` 函数通过 `await readFile()` 调用加载文件内容：

```
async function Post({ slug }) {
  let content;
  try {
    content = await readFile("./posts/" + slug + ".txt", "utf8");
  } catch (err) {
    throwNotFound(err);
  }
  return (
    <section>
      <h2>
        <a href={"/" + slug}>{slug}</a>
      </h2>
      <article>{content}</article>
    </section>
  )
}
```

Similarly, let’s make `BlogIndexPage` an `async` function that takes care of enumerating posts using `await readdir()`:同样，让我们创建一个 `BlogIndexPage` 函数，该 `async` 函数使用 `await readdir()` 以下命令来枚举帖子：

```
async function BlogIndexPage() {
  const postFiles = await readdir("./posts");
  const postSlugs = postFiles.map((file) =>
    file.slice(0, file.lastIndexOf("."))
  );
  return (
    <section>
      <h1>Welcome to my blog</h1>
      <div>
        {postSlugs.map((slug) => (
          <Post key={slug} slug={slug} />
        ))}
      </div>
    </section>
  );
}
```

Now that `Post` and `BlogIndexPage` load data for themselves, we can replace `matchRoute` with a `<Router>` component:现在， `Post` 我们为自己 `BlogIndexPage` 加载数据，我们可以用一个 `<Router>` 组件替换 `matchRoute` ：

```
function Router({ url }) {
  let page;
  if (url.pathname === "/") {
    page = <BlogIndexPage />;
  } else {
    const postSlug = sanitizeFilename(url.pathname.slice(1));
    page = <BlogPostPage postSlug={postSlug} />;
  }
  return <BlogLayout>{page}</BlogLayout>;
}
```

Finally, the top-level server handler can delegate all the rendering to the `<Router>`:最后，顶级服务器处理程序可以将所有渲染委托给 `<Router>` ：

```
createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    await sendHTML(res, <Router url={url} />);
  } catch (err) {
    console.error(err);
    res.statusCode = err.statusCode ?? 500;
    res.end();
  }
}).listen(8080);
```

But wait, we need to *actually* make `async`/`await` work inside components first. How do we do this？但是等等，我们需要首先在组件内部实际制造 `async` / `await` 工作。我们是怎么做到的？

Let’s find the place in our `renderJSXToHTML` implementation where we call the component function:让我们在 `renderJSXToHTML` 实现中找到调用组件函数的位置：

```
} else if (typeof jsx.type === "function") {
    const Component = jsx.type;
    const props = jsx.props;
    const returnedJsx = Component(props); // <--- This is where we're calling components
    return renderJSXToHTML(returnedJsx);
  } else throw new Error("Not implemented.");
```

Since component functions can now be asynchronous, let’s add an `await` in there:由于组件函数现在可以是异步的，因此让我们在其中添加一个 `await` ：

```
// ...
    const returnedJsx = await Component(props);
    // ...
```

This means `renderJSXToHTML` itself would now have to be an `async` function now, and calls to it will need to be `await`ed.这意味着 `renderJSXToHTML` 它现在必须是一个 `async` 函数，并且需要对它的调用进行 `await` 编辑。

```
async function renderJSXToHTML(jsx)  {
  // ...
}
```

With this change, any component in the tree can be `async`, and the resulting HTML “waits” for them to resolve.通过此更改，树中的任何组件都可以是 `async` ，并且生成的 HTML 会“等待”它们解析。

Notice how, in the new code, there is no special logic to “prepare” all the file contents for `BlogIndexPage` in a loop. Our `BlogIndexPage` still renders an array of `Post` components—but now, each `Post` knows how to read its own file.请注意，在新代码中，没有特殊的逻辑来“准备”循环中的所有文件内容 `BlogIndexPage` 。我们仍然 `BlogIndexPage` 渲染一系列组件，但现在，每个 `Post` `Post` 组件都知道如何读取自己的文件。

**[Open this example in a sandbox.在沙盒中打开此示例。](https://codesandbox.io/p/sandbox/relaxed-pare-gicsdi?file=%2Fserver.js)**

> Note that this implementation is not ideal because each `await` is “blocking”. For example, we can’t even *start* sending the HTML until *all* of it has been generated. Ideally, we’d want to *stream* the server payload as it’s being generated. This is more complex, and we won’t do it in this part of the walkthrough — for now we’ll just focus on the data flow. However, it’s important to note that we can add streaming later without any changes to the components themselves. Each component only uses `await` to wait for its own *data* (which is unavoidable), but parent components don’t need to `await` their children — even when children are `async`. This is why React can stream parent components’ output before their children finish rendering.请注意，这种实现并不理想，因为每个 `await` 实现都是“阻塞”的。例如，在生成所有 HTML 之前，我们甚至无法开始发送 HTML。理想情况下，我们希望在生成服务器有效负载时对其进行流式传输。这更复杂，我们不会在演练的这一部分中执行此操作 - 现在我们只关注数据流。但是，需要注意的是，我们可以稍后添加流式处理，而无需对组件本身进行任何更改。每个组件仅用于 `await` 等待自己的数据（这是不可避免的），但父组件不需要 `await` 其子组件 - 即使子组件是 `async` .这就是为什么 React 可以在父组件完成渲染之前流式传输父组件的输出。

## Step 5: Let’s preserve state on navigation 步骤 5：让我们在导航上保留状态

So far, our server can only render a route to an HTML string:到目前为止，我们的服务器只能将路由呈现为 HTML 字符串：

```
async function sendHTML(res, jsx) {
  const html = await renderJSXToHTML(jsx);
  res.setHeader("Content-Type", "text/html");
  res.end(html);
}
```

This is great for the first load — the browser is optimized to show HTML as quickly as possible — but it’s not ideal for navigations. **We’d like to be able to update “just the parts that changed” *in-place*, preserving the client-side state both inside and around them (e.g. an input, a video, a popup, etc).** This will also let mutations (e.g. adding a comment to a blog post) feel fluid.这对于首次加载非常有用 - 浏览器经过优化以尽可能快地显示 HTML - 但对于导航来说并不理想。我们希望能够就地更新“仅更改的部分”，保留它们内部和周围的客户端状态（例如输入、视频、弹出窗口等）。这也会让突变（例如，在博客文章中添加评论）感觉是流动的。

To illustrate the problem, let’s [add an `<input />`](https://codesandbox.io/p/sandbox/heuristic-lalande-gp6gcj?file=%2Fserver.js%3A77%2C11-77%2C20) to the `<nav>` inside the `BlogLayout` component JSX:为了说明这个问题，让我们在 `BlogLayout` 组件 JSX `<nav>` 内部添加一个 `<input />` ：

```
<nav>
  <a href="/">Home</a>
  <hr />
  <input />
  <hr />
</nav>
```

Notice how the state of the input gets “blown away” every time you navigate around the blog:请注意，每次浏览博客时，输入的状态是如何被“吹走”的：

1.mp4

<https://user-images.githubusercontent.com/810438/242691948-8829291e-89b4-44b9-8e77-8e10de42c9e1.mp4>

This might be OK for a simple blog, but if you want to be able to build more interactive apps, at some point this behavior becomes a dealbreaker. You want to let the user navigate around the app without constantly losing local state.对于一个简单的博客来说，这可能是可以的，但如果你希望能够构建更多的交互式应用程序，那么在某些时候，这种行为就会成为一个破坏者。你希望让用户在应用中导航，而不会不断丢失本地状态。

We’re going to fix this in three steps:我们将分三个步骤解决此问题：

1. Add some client-side JS logic to intercept navigations (so we can refetch content manually without reloading the page).添加一些客户端 JS 逻辑来拦截导航（这样我们就可以手动重新获取内容，而无需重新加载页面）。

1. Teach our server to serve JSX over the wire instead of HTML for subsequent navigations.教我们的服务器通过网络而不是 HTML 提供 JSX 以供后续导航。

1. Teach the client to apply JSX updates without destroying the DOM (hint: we’ll use React for that part).教客户端在不破坏 DOM 的情况下应用 JSX 更新（提示：我们将在该部分使用 React）。

### Step 5.1: Let’s intercept navigations 步骤 5.1：让我们拦截导航

We’re gonna need some client-side logic, so we’ll add a `<script>` tag for a new file called `client.js`. In this file, we’ll override the default behavior for navigations within the site so that they call our own function called `navigate`:我们将需要一些客户端逻辑，因此我们将 `<script>` 为名为 `client.js` .在此文件中，我们将覆盖网站内导航的默认行为，以便它们调用我们自己的函数，称为 `navigate` ：

```
async function navigate(pathname) {
  // TODO
}

window.addEventListener("click", (e) => {
  // Only listen to link clicks.
  if (e.target.tagName !== "A") {
    return;
  }
  // Ignore "open in a new tab".
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
    return;
  }
  // Ignore external URLs.
  const href = e.target.getAttribute("href");
  if (!href.startsWith("/")) {
    return;
  }
  // Prevent the browser from reloading the page but update the URL.
  e.preventDefault();
  window.history.pushState(null, null, href);
  // Call our custom logic.
  navigate(href);
}, true);

window.addEventListener("popstate", () => {
  // When the user presses Back/Forward, call our custom logic too.
  navigate(window.location.pathname);
});
```

In the `navigate` function, we’re going to `fetch` the HTML response for the next route, and update the DOM to it:在函数中 `navigate` ，我们将转到 `fetch` 下一个路由的 HTML 响应，并将 DOM 更新为它：

```
let currentPathname = window.location.pathname;

async function navigate(pathname) {
  currentPathname = pathname;
  // Fetch HTML for the route we're navigating to.
  const response = await fetch(pathname);
  const html = await response.text();

  if (pathname === currentPathname) {
    // Get the part of HTML inside the <body> tag.
    const bodyStartIndex = html.indexOf("<body>") + "<body>".length;
    const bodyEndIndex = html.lastIndexOf("</body>");
    const bodyHTML = html.slice(bodyStartIndex, bodyEndIndex);

    // Replace the content on the page.
    document.body.innerHTML = bodyHTML;
  }
}
```

**[Open this example in a sandbox.在沙盒中打开此示例。](https://codesandbox.io/p/sandbox/agitated-bush-ql7kid?file=%2Fclient.js)**

This code isn’t quite production-ready (for example, it doesn’t change `document.title` or announce route changes), but it shows that we can successfully override the browser navigation behavior. Currently, we’re fetching the HTML for the next route, so the `<input>` state still gets lost. In the next step, we’re going to teach our server to serve JSX instead of HTML for navigations. 👀此代码还不完全可用于生产环境（例如，它不会更改或宣布路由更改 `document.title` ），但它表明我们可以成功覆盖浏览器导航行为。目前，我们正在获取下一条路由的 HTML，因此 `<input>` 状态仍然会丢失。在下一步中，我们将教我们的服务器提供 JSX 而不是 HTML 进行导航。👀

### Step 5.2: Let’s send JSX over the wire 第 5.2 步：让我们通过网络发送 JSX

Remember our earlier peek at the object tree that JSX produces:还记得我们之前对 JSX 生成的对象树的了解：

```
{
  $$typeof: Symbol.for("react.element"),
  type: 'html',
  props: {
    children: [
      {
        $$typeof: Symbol.for("react.element"),
        type: 'head',
        props: {
          // ... And so on ...
```

We’re going to add a new mode to our server. When the request ends with `?jsx`, we’ll send a tree like this instead of HTML. This will make it easy for the client to determine what parts have changed, and only update the DOM where necessary. This will solve our immediate problem of the `<input>` state getting lost on every navigation, but that’s not the only reason we are doing this. In the next part (not now!) you will see how this also lets us pass new information (not just HTML) from the server to the client.我们将向服务器添加一个新模式。当请求以 结尾 `?jsx` 时，我们将发送这样的树而不是 HTML。这将使客户端能够轻松确定哪些部分发生了变化，并且只在必要时更新 DOM。这将解决我们眼前的问题，即 `<input>` 状态在每次导航中都会丢失，但这并不是我们这样做的唯一原因。在下一部分（不是现在！）中，您将看到这也使我们能够将新信息（不仅仅是 HTML）从服务器传递到客户端。

To start off, let’s change our server code to call a new `sendJSX` function when there’s a `?jsx` search param:首先，让我们更改服务器代码，以便在有 `?jsx` 搜索参数时调用一个新 `sendJSX` 函数：

```
createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    if (url.pathname === "/client.js") {
      // ...
    } else if (url.searchParams.has("jsx")) {
      url.searchParams.delete("jsx"); // Keep the url passed to the <Router> clean
      await sendJSX(res, <Router url={url} />);
    } else {
      await sendHTML(res, <Router url={url} />);
    }
    // ...
```

In `sendJSX`, we’ll use `JSON.stringify(jsx)` to turn the object tree above into a JSON string that we can pass down the network:在 `sendJSX` 中，我们将使用 `JSON.stringify(jsx)` 上面的对象树转换为可以向下传递网络的 JSON 字符串：

```
async function sendJSX(res, jsx) {
  const jsxString = JSON.stringify(jsx, null, 2); // Indent with two spaces.
  res.setHeader("Content-Type", "application/json");
  res.end(jsxString);
}
```

We’ll keep referring to this as “sending JSX”, but we’re not sending the JSX syntax itself (like `"<Foo />"`) over the wire. We’re only taking the object tree produced by JSX, and turning it into a JSON-formatted string. However, the exact transport format will be changing over time (for example, the real RSC implementation uses a different format that we will explore later in this series).我们将继续将其称为“发送 JSX”，但我们不会通过网络发送 JSX 语法本身（如 `"<Foo />"` ）。我们只获取 JSX 生成的对象树，并将其转换为 JSON 格式的字符串。但是，确切的传输格式会随着时间的推移而变化（例如，实际的 RSC 实现使用不同的格式，我们将在本系列的后面部分探讨）。

Let’s change the client code to see what passes through the network:让我们更改客户端代码，看看通过网络传递的内容：

```
async function navigate(pathname) {
  currentPathname = pathname;
  const response = await fetch(pathname + "?jsx");
  const jsonString = await response.text();
  if (pathname === currentPathname) {
    alert(jsonString);
  }
}
```

[Give this a try.](https://codesandbox.io/p/sandbox/heuristic-bartik-gk8ggy?file=%2Fserver.js%3A1%2C1) If you load the index `/` page now, and then press a link, you’ll see an alert with an object like this:试一试。如果现在加载索引 `/` 页，然后按链接，你将看到一个警报，其中包含如下所示的对象：

```
{
  "key": null,
  "ref": null,
  "props": {
    "url": "http://localhost:3000/hello-world"
  },
  // ...
}
```

That’s not very useful — we were hoping to get a JSX tree like `<html>...</html>`. What went wrong？这并不是很有用——我们希望得到一个像 `<html>...</html>` .哪里出了问题？

Initially, our JSX looks like this:最初，我们的 JSX 如下所示：

```
<Router url="http://localhost:3000/hello-world" />
// {
//   $$typeof: Symbol.for('react.element'),
//   type: Router,
//   props: { url: "http://localhost:3000/hello-world" } },
//    ...
// }
```

**It is “too early” to turn this JSX into JSON for the client because we don’t know what JSX the `Router` wants to render, and `Router` only exists on the server. We need to *call* the `Router` component to find out what JSX we need to send to the client.现在将这个 JSX 转换为客户端的 JSON 还为时过早，因为我们不知道它 `Router` 想要渲染什么 JSX，并且 `Router` 只存在于服务器上。我们需要调用组件 `Router` 来找出我们需要发送给客户端的 JSX。**

If we call the `Router` function with `{ url: "http://localhost:3000/hello-world" } }` as props, we get this piece of JSX:如果我们使用 `{ url: "http://localhost:3000/hello-world" } }` as props 调用函数 `Router` ，我们会得到以下 JSX：

```
<BlogLayout>
  <BlogIndexPage />
</BlogLayout>
```

Again, it is “too early” to turn this JSX into JSON for the client because we don’t know what `BlogLayout` wants to render — and it only exists on the server. We have to call `BlogLayout` too, and find out what JSX it want to pass to the client, and so on.同样，现在将这个 JSX 转换为客户端的 JSON 还为时过早，因为我们不知道想要渲染什么 `BlogLayout` ——而且它只存在于服务器上。我们也必须调用 `BlogLayout` ，并找出它想要传递给客户端的 JSX，等等。

*(An experienced React user might object: can’t we send their code to the client so that it can execute them? Hold that thought until the next part of this series! But even that would only work for `BlogLayout` because `BlogIndexPage` calls `fs.readdir`.)（有经验的 React 用户可能会反对：我们不能将他们的代码发送到客户端以便它可以执行它们吗？保持这个想法，直到本系列的下一部分！但即使这样也只能用于 `BlogLayout` 因为 `BlogIndexPage` 调用 `fs.readdir` 。*

At the end of this process, we end up with a JSX tree that does not reference any server-only code. For example:在这个过程结束时，我们最终会得到一个不引用任何仅限服务器的代码的 JSX 树。例如：

```
<html>
  <head>...</head>
  <body>
    <nav>
      <a href="/">Home</a>
      <hr />
    </nav>
    <main>
    <section>
      <h1>Welcome to my blog</h1>
      <div>
        ...
      </div>
    </main>
    <footer>
      <hr />
      <p>
        <i>
          (c) Jae Doe 2003
        </i>
      </p>
    </footer>
  </body>
</html>
```

Now, *that* is the kind of tree that we can pass to `JSON.stringify` and send to the client.现在，我们可以将这种树传递给客户端 `JSON.stringify` 并发送给客户端。

Let’s write a function called `renderJSXToClientJSX`. It will take a piece of JSX as an argument, and it will attempt to “resolve” its server-only parts (by calling the corresponding components) until we’re only left with JSX that the client can understand.让我们编写一个名为 `renderJSXToClientJSX` .它将把一段 JSX 作为参数，并尝试“解析”其仅限服务器的部分（通过调用相应的组件），直到我们只剩下客户端可以理解的 JSX。

Structurally, this function is similar to `renderJSXToHTML`, but instead of HTML, it traverses and returns objects:从结构上讲，此函数类似于，但它遍历并返回对象 `renderJSXToHTML` ，而不是 HTML：

```
async function renderJSXToClientJSX(jsx) {
  if (
    typeof jsx === "string" ||
    typeof jsx === "number" ||
    typeof jsx === "boolean" ||
    jsx == null
  ) {
    // Don't need to do anything special with these types.
    return jsx;
  } else if (Array.isArray(jsx)) {
    // Process each item in an array.
    return Promise.all(jsx.map((child) => renderJSXToClientJSX(child)));
  } else if (jsx != null && typeof jsx === "object") {
    if (jsx.$$typeof === Symbol.for("react.element")) {
      if (typeof jsx.type === "string") {
        // This is a component like <div />.
        // Go over its props to make sure they can be turned into JSON.
        return {
          ...jsx,
          props: await renderJSXToClientJSX(jsx.props),
        };
      } else if (typeof jsx.type === "function") {
        // This is a custom React component (like <Footer />).
        // Call its function, and repeat the procedure for the JSX it returns.
        const Component = jsx.type;
        const props = jsx.props;
        const returnedJsx = await Component(props);
        return renderJSXToClientJSX(returnedJsx);
      } else throw new Error("Not implemented.");
    } else {
      // This is an arbitrary object (for example, props, or something inside of them).
      // Go over every value inside, and process it too in case there's some JSX in it.
      return Object.fromEntries(
        await Promise.all(
          Object.entries(jsx).map(async ([propName, value]) => [
            propName,
            await renderJSXToClientJSX(value),
          ])
        )
      );
    }
  } else throw new Error("Not implemented");
}
```

Next, let’s edit `sendJSX` to turn JSX like `<Router />` into “client JSX” first before stringifying it:接下来，让我们先编辑 `sendJSX` ，将 JSX like `<Router />` 转换为“客户端 JSX”，然后再将其字符串化：

```
async function sendJSX(res, jsx) {
  const clientJSX = await renderJSXToClientJSX(jsx);
  const clientJSXString = JSON.stringify(clientJSX, null, 2); // Indent with two spaces
  res.setHeader("Content-Type", "application/json");
  res.end(clientJSXString);
}
```

**[Open this example in a sandbox.在沙盒中打开此示例。](https://codesandbox.io/p/sandbox/competent-dawn-grmx8d?file=%2Fserver.js%3A1%2C1)**

Now clicking on a link shows an alert with a tree that looks similar to HTML — which means we’re ready to try diffing it! 现在，单击链接会显示一个警报，其中包含一个类似于 HTML 的树——这意味着我们已准备好尝试区分它！

> Note: For now, our goal is to get something working, but there’s a lot left to be desired in the implementation. The format itself is very verbose and repetitive, so the real RSC uses a more compact format. As with HTML generation earlier, it’s bad that the entire response is being `await`ed at once. Ideally, we want to be able to stream JSX in chunks as they become available, and piece them together on the client. It’s also unfortunate that we’re resending parts of the shared layout (like `<html>` and `<nav>`) when we know for a fact that they have not changed. While it’s important to have the *ability* to refresh the entire screen in-place, navigations within a single layout should not ideally refetch that layout by default. **A production-ready RSC implementation doesn’t suffer from these flaws, but we will embrace them for now to keep the code easier to digest.**注意：目前，我们的目标是让一些东西正常工作，但在实现中还有很多不足之处。格式本身非常冗长和重复，因此真正的 RSC 使用更紧凑的格式。与之前的 HTML 生成一样，整个响应同时被 `await` 编辑是很糟糕的。理想情况下，我们希望能够在 JSX 可用时将它们分块流式传输，并在客户端上将它们拼凑在一起。同样不幸的是，当我们知道共享布局的某些部分（如 `<html>` 和 `<nav>` ）没有更改时，我们却重新发送了它们。虽然能够就地刷新整个屏幕很重要，但默认情况下，单个布局中的导航不应理想地重新提取该布局。生产就绪的 RSC 实现不会受到这些缺陷的影响，但我们现在将接受它们，以使代码更易于理解。

### Step 5.3: Let’s apply JSX updates on the client 步骤 5.3：让我们在客户端上应用 JSX 更新

Strictly saying, we don’t have to use React to diff JSX. So far, our JSX nodes *only* contain built-in browser components like `<nav>`, `<footer>`. You could start with a library that doesn’t have a concept of client-side components at all, and use it to diff and apply the JSX updates. However, we’ll want to allow rich interactivity later on, so we will be using React from the start.严格来说，我们不必使用 React 来区分 JSX。到目前为止，我们的 JSX 节点只包含内置的浏览器组件，如 `<nav>` 、 `<footer>` 。你可以从一个完全没有客户端组件概念的库开始，并使用它来区分和应用 JSX 更新。但是，我们希望稍后允许丰富的交互性，因此我们将从一开始就使用 React。

Our app is server-rendered to HTML. In order to ask React to take over managing a DOM node that it didn’t create (such as a DOM node created by the browser from HTML), you need to provide React with the initial JSX corresponding to that DOM node. Imagine a contractor asking you to see the house plan before doing renovations. They prefer to know the original plan to make future changes safely. Similarly, React walks over the DOM to see which part of the JSX every DOM node corresponds to. This lets React attach event handlers to the DOM nodes, making them interactive, or update them later. They’re now *hydrated,* like plants coming alive with water.我们的应用程序由服务器呈现为 HTML。为了要求 React 接管管理它没有创建的 DOM 节点（例如浏览器从 HTML 创建的 DOM 节点），您需要为 React 提供与该 DOM 节点对应的初始 JSX。想象一下，承包商要求您在进行装修之前查看房屋平面图。他们更愿意知道最初的计划，以便安全地进行未来的更改。类似地，React 遍历 DOM 以查看每个 DOM 节点对应于 JSX 的哪个部分。这允许 React 将事件处理程序附加到 DOM 节点，使它们具有交互性，或者稍后更新它们。它们现在是水合的，就像植物在水中活过来一样。

Traditionally, to hydrate server-rendered markup, you would call [`hydrateRoot`](https://react.dev/reference/react-dom/client/hydrateRoot#usage) with the DOM node you want to manage with React, and the initial JSX it was created from on the server. It might look like this:传统上，要激活服务器渲染的标记，您将使用要使用 React 管理的 DOM 节点以及从服务器上创建的初始 JSX 进行调用 `hydrateRoot` 。它可能看起来像这样：

```
// Traditionally, you would hydrate like this
hydrateRoot(document, <App />);
```

The problem is we don’t have a root component like `<App />` on the client at all! From the client’s perspective, currently our entire app is one big chunk of JSX with exactly *zero* React components in it. However, all React really needs is the JSX tree that corresponds to the initial HTML. A “client JSX” tree like `<html>...</html>` that we have *just* taught the server to produce would work:问题是我们根本没有像客户端那样 `<App />` 的根组件！从客户端的角度来看，目前我们的整个应用程序是 JSX 的一大块，其中的 React 组件正好为零。然而，React 真正需要的只是与初始 HTML 相对应的 JSX 树。像我们刚才教服务器生成的“客户端 JSX”树 `<html>...</html>` 是可以工作的：

```
import { hydrateRoot } from 'react-dom/client';

const root = hydrateRoot(document, getInitialClientJSX());

function getInitialClientJSX() {
  // TODO: return the <html>...</html> client JSX tree mathching the initial HTML
}
```

This would be extremely fast because right now, there are no components in the client JSX tree at all. React would walk the DOM tree and JSX tree in a near-instant, and build its internal data structure that’s necessary to update that tree later on.这将是非常快的，因为现在，客户端 JSX 树中根本没有组件。React 会在近乎瞬间遍历 DOM 树和 JSX 树，并构建其内部数据结构，这是以后更新该树所必需的。

Then, whenever the user navigates, we’d fetch the JSX for the next page and update the DOM with [`root.render`](https://react.dev/reference/react-dom/client/hydrateRoot#updating-a-hydrated-root-component):然后，每当用户导航时，我们都会获取下一页的 JSX，并使用以下命令 `root.render` 更新 DOM：

```
async function navigate(pathname) {
  currentPathname = pathname;
  const clientJSX = await fetchClientJSX(pathname);
  if (pathname === currentPathname) {
    root.render(clientJSX);
  }
}

async function fetchClientJSX(pathname) {
  // TODO: fetch and return the <html>...</html> client JSX tree for the next route
}
```

This will achieve what we wanted — it will update the DOM in the same way React normally does, without destroying the state.这将实现我们想要的——它将以与 React 通常相同的方式更新 DOM，而不会破坏状态。

Now let’s figure out how to implement these two functions.现在让我们弄清楚如何实现这两个功能。

#### Step 5.3.1: Let’s fetch JSX from the server 步骤 5.3.1：让我们从服务器获取 JSX

We’ll start with `fetchClientJSX` because it is easier to implement.我们将从 `fetchClientJSX` 它开始，因为它更容易实现。

First, let’s recall how our `?jsx` server endpoint works:首先，让我们回顾一下 `?jsx` 服务器终结点的工作原理：

```
async function sendJSX(res, jsx) {
  const clientJSX = await renderJSXToClientJSX(jsx);
  const clientJSXString = JSON.stringify(clientJSX);
  res.setHeader("Content-Type", "application/json");
  res.end(clientJSXString);
}
```

On the client, we’re going to call this endpoint, and then feed the response to [`JSON.parse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) to turn it back into JSX:在客户端上，我们将调用此端点，然后将响应馈送到 `JSON.parse` 以将其转换回 JSX：

```
async function fetchClientJSX(pathname) {
  const response = await fetch(pathname + "?jsx");
  const clientJSXString = await response.text();
  const clientJSX = JSON.parse(clientJSXString);
  return clientJSX;
}
```

If you [try this implementation](https://codesandbox.io/p/sandbox/vibrant-golick-x09dj7?file=%2Fclient.js), you’ll see an error whenever you click a link and attempt to render the fetched JSX:如果你尝试这个实现，每当你点击一个链接并尝试渲染获取的 JSX 时，你都会看到一个错误：

```
Objects are not valid as a React child (found: object with keys {type, key, ref, props, _owner, _store}).
```

Here’s why. The object we’re passing to `JSON.stringify` looks like this:原因如下。我们传递给的对象 `JSON.stringify` 如下所示：

```
{
  $$typeof: Symbol.for("react.element"),
  type: 'html',
  props: {
    // ...
```

However, if you look at the `JSON.parse` result on the client, the `$$typeof` property seems to be lost in transit:但是，如果您查看客户端 `JSON.parse` 上的结果，该 `$$typeof` 属性似乎在运输过程中丢失了：

```
{
  type: 'html',
  props: {
    // ...
```

Without `$$typeof: Symbol.for("react.element")`, React on the client will refuse to recognize it as a valid JSX node.如果没有 `$$typeof: Symbol.for("react.element")` ，客户端上的 React 将拒绝将其识别为有效的 JSX 节点。

This is an intentional security mechanism. By default, React refuses to treat arbitrary JSON objects fetched from the network as JSX tags. The trick is that a Symbol value like `Symbol.for('react.element')` doesn’t “survive” JSON serialization, and gets stripped out by `JSON.stringify`. That protects your app from rendering JSX that wasn’t directly created by your app’s code.这是一种有意的安全机制。默认情况下，React 拒绝将从网络获取的任意 JSON 对象视为 JSX 标签。诀窍在于，像这样的 `Symbol.for('react.element')` Symbol 值不会“保留”JSON 序列化，并且会被 `JSON.stringify` .这样可以防止您的应用呈现不是由您的应用代码直接创建的 JSX。

However, we *did* actually create these JSX nodes (on the server) and *do* want to render them on the client. So we need to adjust our logic to “carry over” the `$$typeof: Symbol.for("react.element")` property despite it not being JSON-serializable.但是，我们确实创建了这些 JSX 节点（在服务器上），并且确实希望在客户端上呈现它们。因此，我们需要调整我们的逻辑以“继承”该属性， `$$typeof: Symbol.for("react.element")` 尽管它不是 JSON 可序列化的。

Luckily, this is not too difficult to fix. `JSON.stringify` accepts a [replacer function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#the_replacer_parameter) which lets us customize how the JSON is generated. On the server, we’re going to substutute `Symbol.for('react.element')` with a special string like `"$RE"`:幸运的是，这并不难解决。 `JSON.stringify` 接受一个 replacer 函数，该函数允许我们自定义 JSON 的生成方式。在服务器上，我们将 `Symbol.for('react.element')` 用一个特殊的字符串替换，例如 `"$RE"` ：

```
async function sendJSX(res, jsx) {
  // ...
  const clientJSXString = JSON.stringify(clientJSX, stringifyJSX); // Notice the second argument
  // ...
}

function stringifyJSX(key, value) {
  if (value === Symbol.for("react.element")) {
    // We can't pass a symbol, so pass our magic string instead.
    return "$RE"; // Could be arbitrary. I picked RE for React Element.
  } else if (typeof value === "string" && value.startsWith("$")) {
    // To avoid clashes, prepend an extra $ to any string already starting with $.
    return "$" + value;
  } else {
    return value;
  }
}
```

On the client, we’ll pass a [reviver function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse#the_reviver_parameter) to `JSON.parse` to replace `"$RE"` back with `Symbol.for('react.element')`:在客户端上，我们将传递一个 reviver 函数来 `JSON.parse` 替换 `"$RE"` ： `Symbol.for('react.element')`

```
async function fetchClientJSX(pathname) {
  // ...
  const clientJSX = JSON.parse(clientJSXString, parseJSX); // Notice the second argument
  // ...
}

function parseJSX(key, value) {
  if (value === "$RE") {
    // This is our special marker we added on the server.
    // Restore the Symbol to tell React that this is valid JSX.
    return Symbol.for("react.element");
  } else if (typeof value === "string" && value.startsWith("$$")) {
    // This is a string starting with $. Remove the extra $ added by the server.
    return value.slice(1);
  } else {
    return value;
  }
}
```

**[Open this example in a sandbox.在沙盒中打开此示例。](https://codesandbox.io/p/sandbox/silly-silence-v7lq4p?file=%2Fclient.js%3A1%2C1)**

Now you can navigate between the pages again — but the updates are fetched as JSX and applied on the client! 现在，您可以再次在页面之间导航 - 但更新是作为 JSX 获取并应用于客户端的！

If you type into the input and then click a link, you’ll notice the `<input>` state is preserved on all navigations except the very first one. This is because we haven’t told React what the initial JSX for the page is, and so it can’t attach to the server HTML properly.如果在输入中键入内容，然后单击链接，则会注意到 `<input>` 除第一个导航之外的所有导航都保留了该状态。这是因为我们没有告诉 React 页面的初始 JSX 是什么，因此它无法正确附加到服务器 HTML。

#### Step 5.3.2: Let’s inline the initial JSX into the HTML 步骤 5.3.2：让我们将初始 JSX 内联到 HTML 中

We still have this bit of code:我们仍然有这一段代码：

```
const root = hydrateRoot(document, getInitialClientJSX());

function getInitialClientJSX() {
  return null; // TODO
}
```

We need to hydrate the root with the initial client JSX, but where do we get that JSX on the client？我们需要使用初始客户端 JSX 来激活根目录，但是我们从哪里获得客户端上的 JSX？

Our page is server-rendered to HTML; however, for further navigations we need to tell React what the initial JSX for the page was. In some cases, it might be possible to partially reconstruct from the HTML, but not always—especially when we start adding interactive features in the next part of this series. We also don’t want to *fetch* it since it would create an unnecessary waterfall.我们的页面是服务器呈现为 HTML 的;但是，对于进一步的导航，我们需要告诉 React 页面的初始 JSX 是什么。在某些情况下，也许可以从 HTML 进行部分重建，但并非总是如此，尤其是当我们在本系列的下一部分开始添加交互式功能时。我们也不想获取它，因为它会产生不必要的瀑布。

In traditional SSR with React, you also encounter a similar problem, but for data. You need to have the data for the page so that components can hydrate and return their initial JSX. In our case, there are no components on the page so far (at least, none that run in the browser), so nothing needs to run — but there is also no code on the client that knows how to generate that initial JSX.在传统的 SSR 和 React 中，你也会遇到类似的问题，但对于数据。您需要拥有页面的数据，以便组件可以冻结并返回其初始 JSX。在我们的例子中，到目前为止，页面上没有组件（至少，没有在浏览器中运行的组件），所以不需要运行任何东西——但客户端上也没有知道如何生成初始 JSX 的代码。

To solve this, we’re going to assume that the string with the initial JSX is available as a global variable on the client:为了解决这个问题，我们将假设带有初始 JSX 的字符串在客户端上可用作全局变量：

```
const root = hydrateRoot(document, getInitialClientJSX());

function getInitialClientJSX() {
  const clientJSX = JSON.parse(window.__INITIAL_CLIENT_JSX_STRING__, reviveJSX);
  return clientJSX;
}
```

On the server, we will modify the `sendHTML` function to *also* render our app to client JSX, and inline it at the end of HTML:在服务器上，我们将修改该 `sendHTML` 函数，将我们的应用程序也呈现给客户端 JSX，并在 HTML 末尾内联它：

```
async function sendHTML(res, jsx) {
  let html = await renderJSXToHTML(jsx);

  // Serialize the JSX payload after the HTML to avoid blocking paint:
  const clientJSX = await renderJSXToClientJSX(jsx);
  const clientJSXString = JSON.stringify(clientJSX, stringifyJSX);
  html += `<script>window.__INITIAL_CLIENT_JSX_STRING__ = `;
  html += JSON.stringify(clientJSXString).replace(/</g, "\\u003c");
  html += `</script>`;
  // ...
```

Finally, we need a few [small adjustments](https://codesandbox.io/p/sandbox/vigorous-lichterman-i30pi4?file=%2Fserver.js%3A200%2C1-211%2C17) to how we generate HTML for text nodes so that React can hydrate them.最后，我们需要对文本节点生成 HTML 的方式进行一些小的调整，以便 React 可以对它们进行水化。

**[Open this example in a sandbox.在沙盒中打开此示例。](https://codesandbox.io/p/sandbox/vigorous-lichterman-i30pi4?file=%2Fserver.js%3A1%2C1)**

Now you can type into an input, and its state is no longer lost between navigations:现在，您可以键入输入，并且其状态在导航之间不再丢失：

2.mp4

<https://user-images.githubusercontent.com/810438/242748034-66ec402c-60c5-4bc6-a31f-c5c953b38142.mp4>

That’s the goal we originally set out to accomplish! Of course, preserving the state of this particular input isn’t the point—the important part is that our app can now refresh and navigate “in-place” on any page, and not worry about destroying any state.这就是我们最初设定的目标！当然，保留此特定输入的状态并不是重点，重要的是我们的应用程序现在可以在任何页面上“就地”刷新和导航，而不必担心破坏任何状态。

> Note: Although a real RSC implementation *does* encode the JSX in the HTML payload, there are a few important differences. A production-ready RSC setup sends JSX chunks as they’re being produced instead of a single large blob at the end. When React loads, hydration can start immediately—React starts traversing the tree using the JSX chunks that are already available instead of waiting for all of them to arrive. RSC also lets you mark some components as *Client* components, which means they *still* get SSR’d into HTML, but their code *is* included in the bundle. For Client components, only JSON of their props gets serialized. In the future, React may add extra mechanisms to deduplicate content between HTML and the embedded payload.注意：尽管真正的 RSC 实现确实在 HTML 有效负载中对 JSX 进行编码，但还是存在一些重要的区别。生产就绪的 RSC 设置会在生成 JSX 块时发送它们，而不是在最后发送单个大 blob。当 React 加载时，冻结可以立即开始——React 开始使用已经可用的 JSX 块遍历树，而不是等待所有块到达。RSC 还允许您将某些组件标记为客户端组件，这意味着它们仍将 SSR 转换为 HTML，但它们的代码包含在捆绑包中。对于客户端组件，仅序列化其 props 的 JSON。将来，React 可能会添加额外的机制来删除 HTML 和嵌入式有效负载之间的重复内容。

## Step 6: Let’s clean things up 第 6 步：让我们清理一下

Now that our code actually *works*, we’re going to move the architecture a tiny bit closer to the real RSC. We’re still not going to implement complex mechanisms like streaming yet, but we’ll fix a few flaws and prepare for the next wave of features.现在我们的代码已经真正工作了，我们将把架构稍微靠近真正的 RSC。我们仍然不打算实现像流媒体这样的复杂机制，但我们将修复一些缺陷，并为下一波功能做好准备。

### Step 6.1: Let’s avoid duplicating work 步骤 6.1：避免重复工作

Have another look at [how we’re producing the initial HTML](https://codesandbox.io/p/sandbox/vigorous-lichterman-i30pi4?file=%2Fserver.js%3A118%2C1-119%2C53):再看看我们是如何生成初始 HTML 的：

```
async function sendHTML(res, jsx) {
  // We need to turn <Router /> into "<html>...</html>" (a string):
  let html = await renderJSXToHTML(jsx);

  // We *also* need to turn <Router /> into <html>...</html> (an object):
  const clientJSX = await renderJSXToClientJSX(jsx);
```

Suppose `jsx` here is `<Router url="https://localhost:3000" />`.假设 `jsx` 这里是 `<Router url="https://localhost:3000" />` .

First, we call `renderJSXToHTML`, which will call `Router` and other components recursively as it creates an HTML string. But we also need to send the initial client JSX—so call `renderJSXToClientJSX` right after, which *again* calls the `Router` and all other components. We’re calling every component twice! Not only is this slow, it’s also potentially incorrect — for example, if we were rendering a `Feed` component, we could get different outputs from these functions. We need to rethink how the data flows.首先，我们调用 `renderJSXToHTML` ，它将在创建 HTML 字符串时递归调用 `Router` 和其他组件。但是我们还需要发送初始客户端 JSX，因此请立即调用，然后再次调用 `renderJSXToClientJSX` `Router` 和 所有其他组件。我们将每个组件调用两次！这不仅速度慢，而且可能不正确——例如，如果我们渲染一个 `Feed` 组件，我们可以从这些函数中获得不同的输出。我们需要重新思考数据的流动方式。

What if we generated the client JSX tree *first*?如果我们先生成客户端 JSX 树会怎样？

```
async function sendHTML(res, jsx) {
  // 1. Let's turn <Router /> into <html>...</html> (an object) first:
  const clientJSX = await renderJSXToClientJSX(jsx);
```

By this point, all our components have executed. Then, let’s generate HTML from *that* tree:至此，我们所有的组件都已执行。然后，让我们从该树生成 HTML：

```
async function sendHTML(res, jsx) {
  // 1. Let's turn <Router /> into <html>...</html> (an object) first:
  const clientJSX = await renderJSXToClientJSX(jsx);
  // 2. Turn that <html>...</html> into "<html>...</html>" (a string):
  let html = await renderJSXToHTML(clientJSX);
  // ...
```

Now components are only called once per request, as they should be.现在，每个请求只调用一次组件，这是应该的。

**[Open this example in a sandbox.在沙盒中打开此示例。](https://codesandbox.io/p/sandbox/serverless-morning-ith5fg?file=%2Fserver.js)**

### Step 6.2: Let’s use React to render HTML 步骤 6.2：让我们使用 React 来渲染 HTML

Initially, we needed a custom `renderJSXToHTML` implementation so that we could control how it executes our components. For example, we’ve need to add support for `async` functions to it. But now that we pass a precomputed client JSX tree to it, there is no point to maintaining a custom implementation. Let’s delete it, and use React’s built-in [`renderToString`](https://react.dev/reference/react-dom/server/renderToString) instead:最初，我们需要一个自定义 `renderJSXToHTML` 实现，以便我们可以控制它如何执行我们的组件。例如，我们需要向它添加对 `async` 函数的支持。但是现在我们向它传递了一个预先计算的客户端 JSX 树，维护自定义实现就没有意义了。让我们删除它，改用 React 的内置： `renderToString`

```
import { renderToString } from 'react-dom/server';

// ...

async function sendHTML(res, jsx) {
  const clientJSX = await renderJSXToClientJSX(jsx);
  let html = renderToString(clientJSX);
  // ...
```

**[Open this example in a sandbox.在沙盒中打开此示例。](https://codesandbox.io/p/sandbox/vigorous-tess-ykpez3?file=%2Fserver.js%3A189%2C1)**

Notice a parallel with the client code. Even though we’ve implemented new features (like `async` components), we’re still able to use existing React APIs like `renderToString` or `hydrateRoot`. It’s just that the way we use them is different.请注意与客户端代码的并行。即使我们已经实现了新功能（如 `async` 组件），我们仍然能够使用现有的 React API，例如 `renderToString` 或 `hydrateRoot` 。只是我们使用它们的方式不同。

In a traditional server-rendered React app, you’d call `renderToString` and `hydrateRoot` with your root `<App />` component. But in our approach, we first evaluate the “server” JSX tree using `renderJSXToClientJSX`, and pass its *output* to the React APIs.在传统的服务器渲染的 React 应用中，你可以使用根 `<App />` 组件调用 `renderToString` and `hydrateRoot` 。但是在我们的方法中，我们首先使用 `renderJSXToClientJSX` 评估“服务器”JSX 树，并将其输出传递给 React API。

In a traditional server-rendered React app, components execute in the same way *both* on the server and the client. But in our approach, components like `Router`, `BlogIndexPage` and `Footer` are effectively server-*only* (at least, for now).在传统的服务器渲染的 React 应用中，组件在服务器和客户端上的执行方式相同。但是在我们的方法中，像 和 `BlogIndexPage` `Footer` 这样的 `Router` 组件实际上是仅限服务器的（至少目前是这样）。

As far as `renderToString` and `hydrateRoot` are concerned, it’s pretty much as if `Router`, `BlogIndexPage` and `Footer` have never existed in the first place. By then, they have already “melted away” from the tree, leaving behind only their output.就 `renderToString` 和 `hydrateRoot` 而言，它几乎就像 `Router` 一样， `BlogIndexPage` `Footer` 并且从一开始就不存在。到那时，它们已经从树上“融化”了，只留下了它们的输出。

### Step 6.3: Let’s split the server in two 步骤 6.3：让我们将服务器一分为二

In the previous step, we’ve decoupled running components from generating HTML:在上一步中，我们已将正在运行的组件与生成 HTML 分离：

* First, `renderJSXToClientJSX` runs our components to produce client JSX.首先， `renderJSXToClientJSX` 运行我们的组件以生成客户端 JSX。

* Then, React’s `renderToString` turns that client JSX into HTML.然后，React 将 `renderToString` 该客户端 JSX 转换为 HTML。

Since these steps are independent, they don’t have to be done in the same process or even on the same machine.由于这些步骤是独立的，因此不必在同一进程中甚至在同一台机器上完成。\

To demonstrate this, we’re going split `server.js` into two files:为了演示这一点，我们将拆分 `server.js` 为两个文件：

* [`server/rsc.js`](https://codesandbox.io/p/sandbox/agitated-swartz-4hs4v1?file=%2Fserver%2Frsc.js): This server will run our components. It always outputs JSX — no HTML. If our components were accessing a database, it would make sense to run this server close to the data center so that the latency is low.`server/rsc.js` ：此服务器将运行我们的组件。它总是输出 JSX — 没有 HTML。如果我们的组件正在访问数据库，那么在靠近数据中心的地方运行此服务器是有意义的，这样延迟就会很低。

* [`server/ssr.js`](https://codesandbox.io/p/sandbox/agitated-swartz-4hs4v1?file=%2Fserver%2Fssr.js): This server will generate HTML. It can live on the “edge”, generating HTML and serving static assets.`server/ssr.js` ：此服务器将生成 HTML。它可以存在于“边缘”上，生成 HTML 并提供静态资产。

We’ll run them both in parallel in our `package.json`:我们将在以下两者中并行运行 `package.json` 它们：

```
"scripts": {
    "start": "concurrently \"npm run start:ssr\" \"npm run start:rsc\"",
    "start:rsc": "nodemon -- --experimental-loader ./node-jsx-loader.js ./server/rsc.js",
    "start:ssr": "nodemon -- --experimental-loader ./node-jsx-loader.js ./server/ssr.js"
  },
```

In this example, they’ll be on the same machine, but you could host them separately.在此示例中，它们将位于同一台计算机上，但您可以单独托管它们。

The RSC server is the one that renders our components. It’s only capable of serving their JSX output:RSC 服务器是呈现组件的服务器。它只能提供他们的 JSX 输出：

```
// server/rsc.js

createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    await sendJSX(res, <Router url={url} />);
  } catch (err) {
    console.error(err);
    res.statusCode = err.statusCode ?? 500;
    res.end();
  }
}).listen(8081);

function Router({ url }) {
  // ...
}

// ...
// ... All other components we have so far ...
// ...

async function sendJSX(res, jsx) {
  // ...
}

function stringifyJSX(key, value) {
  // ...
}

async function renderJSXToClientJSX(jsx) {
  // ...
}
```

The other server is the SSR server. The SSR server is the server that our users will hit. It asks the RSC server for JSX, and then either serves that JSX as a string (for navigations between pages), or turns it into HTML (for the initial load):另一个服务器是 SSR 服务器。SSR 服务器是我们的用户将访问的服务器。它向 RSC 服务器请求 JSX，然后将该 JSX 作为字符串提供（用于页面之间的导航），或者将其转换为 HTML（用于初始加载）：

```
// server/ssr.js

createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    if (url.pathname === "/client.js") {
      // ...
    }
    // Get the serialized JSX response from the RSC server
    const response = await fetch("http://127.0.0.1:8081" + url.pathname);
    if (!response.ok) {
      res.statusCode = response.status;
      res.end();
      return;
    }
    const clientJSXString = await response.text();
    if (url.searchParams.has("jsx")) {
      // If the user is navigating between pages, send that serialized JSX as is
      res.setHeader("Content-Type", "application/json");
      res.end(clientJSXString);
    } else {
      // If this is an initial page load, revive the tree and turn it into HTML
      const clientJSX = JSON.parse(clientJSXString, parseJSX);
      let html = renderToString(clientJSX);
      html += `<script>window.__INITIAL_CLIENT_JSX_STRING__ = `;
      html += JSON.stringify(clientJSXString).replace(/</g, "\\u003c");
      html += `</script>`;
      // ...
      res.setHeader("Content-Type", "text/html");
      res.end(html);
    }
  } catch (err) {
    // ...
  }
}).listen(8080);
```

**[Open this example in a sandbox.在沙盒中打开此示例。](https://codesandbox.io/p/sandbox/agitated-swartz-4hs4v1?file=%2Fserver%2Fssr.js)**

We’re going to keep this separation between RSC and “the rest of the world” (SSR and user machine) throughout this series. Its importance will become clearer in the next parts when we start adding features to both of these worlds, and tying them together.在本系列中，我们将保持 RSC 与“世界其他地方”（SSR 和用户计算机）之间的这种分离。在接下来的部分中，当我们开始为这两个世界添加功能并将它们联系在一起时，它的重要性将变得更加清晰。

*(Strictly speaking, it is technically possible to run RSC and SSR within the same process, but their module environments would have to be isolated from each other. This is an advanced topic, and is out of scope of this post.)（严格来说，从技术上讲，RSC 和 SSR 可以在同一进程中运行，但它们的模块环境必须相互隔离。这是一个高级主题，超出了本文的范围。*

## Recap 回顾

And we’re done for today! 今天就到此为止了！

It might seem like we’ve written a lot of code, but we really haven’t:看起来我们已经写了很多代码，但我们实际上没有：

* [`server/rsc.js`](https://codesandbox.io/p/sandbox/agitated-swartz-4hs4v1?file=%2Fserver%2Frsc.js) is 160 lines of code, out of which 80 are our own components.`server/rsc.js` 是 160 行代码，其中 80 行是我们自己的组件。

* [`server/ssr.js`](https://codesandbox.io/p/sandbox/agitated-swartz-4hs4v1?file=%2Fserver%2Fssr.js) is 60 lines of code.`server/ssr.js` 是 60 行代码。

* [`client.js`](https://codesandbox.io/p/sandbox/agitated-swartz-4hs4v1?file=%2Fclient.js%3A1%2C1) is 60 lines of code.`client.js` 是 60 行代码。

Have a read through them. To help the data flow “settle” in our minds, let’s draw a few diagrams.通读它们。为了帮助数据流在我们的脑海中“安顿下来”，让我们画几张图。

Here is what happens during the first page load:以下是在第一个页面加载期间发生的情况：

[![](https://user-images.githubusercontent.com/810438/242937001-f3e95105-4acb-4ae7-9ce5-39bbe2afd515.png)](https://user-images.githubusercontent.com/810438/242937001-f3e95105-4acb-4ae7-9ce5-39bbe2afd515.png)

And here is what happens when you navigate between pages:以下是在页面之间导航时发生的情况：

[![](https://user-images.githubusercontent.com/810438/242956087-c435e5bd-5421-4a6e-9d35-538a81a485bb.png)](https://user-images.githubusercontent.com/810438/242956087-c435e5bd-5421-4a6e-9d35-538a81a485bb.png)

Finally, let’s establish some terminology:最后，让我们建立一些术语：

* We will say **React Server** (or just capitalized Server) to mean *only* the RSC server environment. Components that exist only on the RSC server (in this example, that’s all our components so far) are called **Server Components**.我们将说 React Server（或简称大写的 Server）仅表示 RSC 服务器环境。仅存在于 RSC 服务器上的组件（在此示例中，到目前为止，这是我们的所有组件）称为服务器组件。

* We will say **React Client** (or just capitalized Client) to mean any environment that consumes the React Server output. As you’ve just seen, [SSR is a React Client](https://github.com/reactwg/server-components/discussions/4) — and so is the browser. We don’t support components on the Client *yet* — we’ll build that next! — but it shouldn’t be a huge spoiler to say that we will call them **Client Components**.我们将说 React Client（或简称大写的 Client）表示任何使用 React Server 输出的环境。正如你刚才所看到的，SSR 是一个 React 客户端——浏览器也是如此。我们还不支持客户端上的组件 - 我们接下来将构建它！— 但是，如果说我们将它们称为客户端组件，这不应该是一个巨大的剧透。

## Challenges 挑战

If reading through this post wasn’t enough to satisfy your curiosity, why not play with the [final code](https://codesandbox.io/p/sandbox/agitated-swartz-4hs4v1?file=%2Fserver%2Frsc.js)?如果通读这篇文章还不足以满足你的好奇心，为什么不玩一下最终的代码呢？

Here’s a few ideas for things you can try:以下是您可以尝试的一些想法：

* Add a random background color to the `<body>` of the page, and add a transition on the background color. When you navigate between the pages, you should see the background color animating.向 `<body>` 页面添加随机背景色，并在背景色上添加过渡。当您在页面之间导航时，您应该会看到背景颜色的动画效果。

* Implement support for [fragments (`<>`)](https://react.dev/reference/react/Fragment) in the RSC renderer. This should only take a couple of lines of code, but you need to figure out where to place them and what they should do.在 RSC 渲染器中实现对片段（ `<>` ）的支持。这应该只需要几行代码，但你需要弄清楚把它们放在哪里以及它们应该做什么。

* Once you do that, change the blog to format the blog posts as Markdown using the `<Markdown>` component from `react-markdown`. Yes, our existing code should be able to handle that! 完成此操作后，使用 中的 `<Markdown>` 组件将博客更改为 `react-markdown` Markdown 格式。是的，我们现有的代码应该能够处理这个问题！

* The `react-markdown` component supports specifying custom implementations for different tags. For example, you can make your own `Image` component and pass it as `<Markdown components={{ img: Image }}>`. Write an `Image` component that measures the image dimensions (you can use some npm package for that) and automatically emits `width` and `height`.该 `react-markdown` 组件支持为不同的标签指定自定义实现。例如，您可以创建自己的 `Image` 组件并将其作为 `<Markdown components={{ img: Image }}>` .编写一个 `Image` 测量图像尺寸的组件（您可以使用一些 npm 包来实现）并自动发出 `width` 和 `height` .

* Add a comment section to each blog post. Keep comments stored in a JSON file on the disk. You will need to use `<form>` to submit the comments. As an extra challenge, extend the logic in `client.js` to intercept form submissions and prevent reloading the page. Instead, after the form submits, refetch the page JSX so that the comment list updates in-place.为每篇博文添加评论部分。将注释存储在磁盘上的 JSON 文件中。您将需要用于 `<form>` 提交评论。作为额外的挑战，扩展逻辑以 `client.js` 拦截表单提交并防止重新加载页面。相反，在表单提交后，重新获取页面 JSX，以便注释列表就地更新。

* Pressing the Back button currently always refetches fresh JSX. Change the logic in `client.js` so that Back/Forward navigation reuses previously cached responses, but clicking a link always fetches a fresh response. This would ensure that pressing Back and Forward always feels instant, similar to how the browser treats full-page navigations.按下 Back 按钮当前总是会重新获取新的 JSX。更改中的 `client.js` 逻辑，以便“后退/前进”导航重用以前缓存的响应，但单击链接始终会获取新的响应。这将确保按“后退”和“前进”始终感觉即时，类似于浏览器处理整页导航的方式。

* When you navigate between two different blog posts, their *entire* JSX gets diffed. But this doesn’t always make sense — conceptually, these are two *different* posts. For example, if you start typing a comment on one of them, but then press a link, you don’t want that comment to be preserved just because the input is in the same location. Can you think of a way to solve this? (Hint: You might want to teach the `Router` component to treat different pages with different URLs as different components by wrapping the `{page}` with something. Then you’d need to ensure this “something” doesn’t get lost over the wire.) 当您在两篇不同的博客文章之间导航时，它们的整个 JSX 会有所不同。但这并不总是有意义的——从概念上讲，这是两个不同的帖子。例如，如果您开始在其中一个上键入注释，但随后按下链接，则不希望仅仅因为输入位于同一位置而保留该注释。你能想出解决这个问题的方法吗？（提示：您可能希望通过 `{page}` 用 something 包装来教组件将具有不同 URL 的不同页面视为不同的 `Router` 组件。然后，您需要确保这个“东西”不会通过电线丢失。

* The format to which we serialize JSX is currently very repetitive. Do you have any ideas on how to make it more compact? You can check a production-ready RSC framework like Next.js App Router, or our [official non-framework RSC demo](https://github.com/reactjs/server-components-demo) for inspiration. Even without implementing streaming, it would be nice to at least represent the JSX elements in a more compact way.我们序列化 JSX 的格式目前非常重复。你对如何让它更紧凑有什么想法吗？您可以查看生产就绪的 RSC 框架，如 Next.js App Router，或我们的官方非框架 RSC 演示以获取灵感。即使没有实现流式处理，至少以更紧凑的方式表示 JSX 元素也很好。

* Imagine you wanted to add support for Client Components to this code. How would you do it? Where would you start？假设您希望向此代码添加对客户端组件的支持。你会怎么做？你会从哪里开始？

Have fun! 玩得愉快！
