# prettier-config-standard

A Prettier [shareable config](https://prettier.io/docs/en/configuration.html#sharing-configurations )
for projects using **[Prettier](https://prettier.io/ )** and
**[JavaScript Standard Style](https://standardjs.com/ )** as ESLint rules or
separate processes.

## Installation

```
npm install --save-dev @oeyoews/prettier-config
```

_This is only a shareable configuration. It does not install Prettier, Standard,
ESLint, or any other part of the tool chain._

## Usage

Reference it in `package.json` using the `prettier` property:

```json
{
  "prettier": "@oeyoews/prettier-config",
}
```

If you don't want to use `package.json`, you can use any of the supported
extensions to export a string:

```jsonc
// `.prettierrc.json`
"@oeyoews/prettier-config"
```

```javascript
// `prettier.config.js` or `.prettierrc.js`
module.exports = '@oeyoews/prettier-config'
```

For example, if you need to change it so that semicolons are required:

```javascript
// `prettier.config.js` or `.prettierrc.js`
const prettierConfig = require('@oeyoews/prettier-config')

module.exports = Object.assign({}, prettierConfig, {
  // semi: true;
})
```