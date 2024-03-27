# AI 自动总结文章摘要

> [!TIP]
> 借助 gemini api, 自动总结当前 tiddler 的内容，生成 summary 字段.


## 插件在线地址

<TwPlugin name="vue-gemini" />

## 用法

```html
<$vue-gemini />
```

* 以上是 widget 的用法. 会自动总结当前 tiddler 的内容。

* vue-gemini 插件提供了另外一种方便的用法, 仅仅只需在当前 tiddler 添加 `gemini:yes` 的字段内容，即可使用

## 注意

* 插件依赖有 neotw-vue, tailwindcss. 建议用户直接通过 [CPL](https://tw-cn.netlify.app/#%24%3A%2Fplugins%2FGk0Wk%2FCPL-Repo:%24%3A%2Fplugins%2FGk0Wk%2FCPL-Repo) 插件 安装.
* gemini 目前不支持一些地区国家，需要特殊网络解决, 用户可通过谷歌搜索查询更多细节.
* 插件本身不提供 apikey, 用户需要自己获取 gemini apikey, 目前可以免费在[gemini 官网](https://aistudio.google.com/app/apikey)获取，
* api 会自动保存在 `$:/plugins/oeyoews/vue-gemini/config` 文件的 api 字段上，注意不要上传到公共代码库.