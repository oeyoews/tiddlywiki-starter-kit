## Change source
` export NVM_NODEJS_ORG_MIRROR=https://npm.taobao.org/mirrors/node  # 对nvm换源`
- npm config set registry https://registry.npm.taobao.org                 # npm换源

## Nvm
nvm install latest
nvm alias default 12.14
nvm use default
npm init # 用来生成一个新的package.json 文件

## Npm
npm  uninstall xxx -g # 卸载全局的模块软件
npm install xxx     # 安装相关的模块到当前目录，即node-moudles的文件面
npm i  xxx -g    # 全局安装，还不清楚安装位置在哪 可能是全局的mode-moudles 里面
npm ls

- npm root -g  # show path for packages globally
- npm list -g  # show all packages globally
- /usr/lib/node_modules/

npm i xxx -S   #  安装到当前 的node-moudles 目录里面， 并且写入package.json的dependencies里面
-S 或者 --save 参数的意思是将模块的版本信息保存到dependencies中，即package.json的dependencies的字段，不过好像在搭建博客的过程中，好像以来的模块都下载到了nodemoudles中，不需要再次下载

npm config get registry
npm config list      # 查看npm源
npm install -g npm-check   #  包管理器
npm-check -u -i # 更新

npm install -g cnpm --registry=https://registry.npm.taobao.org           # 安装cnpm 不加参数可能会出现一些问题

npm info underscore     # 查看

npm update
npm upgrade   # 升级所有可以更新包
npm -g outdated   # 查看已经过时的包
npm install -g npm-check  # npm-check -u -g  检查依赖关系

## Yarn
yarn install #  等价yarn
yarn upgrade
yarn remove
yarn add
yarn init -y #
yarn upgrade-interactive --latest    # 忽略包json ，升级最新版本
