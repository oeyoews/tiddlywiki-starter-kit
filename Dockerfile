FROM node:alpine

# RUN corepack enable && pnpm install tiddlywiki@latest
RUN npm install -g tiddlywiki@latest

# VOLUME /app
WORKDIR /app

# 复制到其他目录, 不要在app目录, 否则挂载后, 会被覆盖
COPY . /resources

ENV TIDDLYWIKI_PLUGIN_PATH="/resources/plugins"
ENV TIDDLYWIKI_THEME_PATH="/resources/themes"

ENTRYPOINT ["sh", "/resources/startup.sh"]

EXPOSE 8080
