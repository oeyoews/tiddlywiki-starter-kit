---
title: 'How_to_Enable_CORS_on_Vercel'
tags: ['剪藏']
type: 'text/markdown'
created: 'Tue Nov 07 2023 08:07:28 GMT+0000 (GMT)'
creator: '太微搜藏'
modifier: '太微搜藏'
url: 'https://vercel.com/guides/how-to-enable-cors'
---

# How_to_Enable_CORS_on_Vercel

The Vercel platform allows developers to specify response headers when a request comes in. It is a common pattern to allow CORS requests for [Serverless Function](https://vercel.com/docs/concepts/functions/serverless-functions) invocations and for static assets.

## Understanding CORS

Before enabling this feature for your website, it is important to understand what “Cross-Origin Resource Sharing” is. It is particularly important to be aware of the security implications when allowing your API to be fetched from all origins. We recommend that you take a look at the following articles before proceeding:

* [Mozilla Documentation on CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).

* [Wikipedia entry on CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing).

## Enabling CORS in a single Node.js Serverless Function

Once you understand what CORS is and the potential risks of enabling it, you can do so by configuring a few headers in the response object.了解 CORS 是什么以及启用它的潜在风险后，可以通过在响应对象中配置一些标头来实现。

```
const allowCors = fn => async (req, res) => {

  res.setHeader('Access-Control-Allow-Credentials', true)

  res.setHeader('Access-Control-Allow-Origin', '*')

  // another common pattern

  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);

  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')

  res.setHeader(

    'Access-Control-Allow-Headers',

    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'

  )

  if (req.method === 'OPTIONS') {

    res.status(200).end()

    return

  }

  return await fn(req, res)

}

const handler = (req, res) => {

  const d = new Date()

  res.end(d.toString())

}

module.exports = allowCors(handler)
```

An example of how to enable CORS using Node.js Serverless Functions deployed on Vercel.如何使用 Vercel 上部署的 Node.js Serverless Functions 启用 CORS 的示例。

The `allowCors` function acts as a wrapper, enabling CORS for the Serverless Function passed to it. This is a common pattern when using middleware in Serverless Functions and can be applied to multiple scenarios.该 `allowCors` 函数充当包装器，为传递给它的无服务器函数启用 CORS。这是在 Serverless Functions 中使用中间件时的常见模式，可以应用于多个场景。

## Enabling CORS in a Next.js App 在 Next.js 应用中启用 CORS

In the `next.config.js` file, a “headers” function can be created:在 `next.config.js` 文件中，可以创建一个“headers”函数：

```
module.exports = {

  async headers() {

    return [

      {

        // matching all API routes

        source: "/api/:path*",

        headers: [

          { key: "Access-Control-Allow-Credentials", value: "true" },

          { key: "Access-Control-Allow-Origin", value: "*" },

          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },

          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },

        ]

      }

    ]

  }

};
```

An example of how to enable CORS using Next.js routing configuration.如何使用 Next.js 路由配置启用 CORS 的示例。

The `headers()` function allows you to define paths associated with a set of headers. It can be useful to allow CORS in multiple routes.该 `headers()` 函数允许您定义与一组标头关联的路径。在多个路由中允许 CORS 可能很有用。

## Enabling CORS using `vercel.json` 使用 `vercel.json` 

If you are not using Next.js, you can still enable headers in multiple paths by using the [Vercel configuration](https://vercel.com/docs/configuration#project/headers) file.如果您没有使用 Next.js，您仍然可以使用 Vercel 配置文件在多个路径中启用标头。

Create a new `vercel.json` with a new [“headers”](https://vercel.com/docs/project-configuration#project-configuration/headers) key:使用新的“headers”键创建一个新的 `vercel.json` ：

```
{

  "headers": [

    {

      "source": "/api/(.*)",

      "headers": [

        { "key": "Access-Control-Allow-Credentials", "value": "true" },

        { "key": "Access-Control-Allow-Origin", "value": "*" },

        { "key": "Access-Control-Allow-Methods", "value": "GET,OPTIONS,PATCH,DELETE,POST,PUT" },

        { "key": "Access-Control-Allow-Headers", "value": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" }

      ]

    }

  ]

}
```

An example of how to enable CORS using the Vercel headers configuration.如何使用 Vercel 标头配置启用 CORS 的示例。
