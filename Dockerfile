FROM node:alpine

# 支持全局安装
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV TIDDLYWIKI_PLUGIN_PATH="/resources/plugins"
ENV TIDDLYWIKI_THEME_PATH="/resources/themes"

WORKDIR /app
RUN corepack enable && \
    pnpm -g install tiddlywiki@latest
COPY . /resources

EXPOSE 8080
ENTRYPOINT ["/resources/startup.sh"] # 使用sh, not bash, and use chmod +x for this scriptshell
