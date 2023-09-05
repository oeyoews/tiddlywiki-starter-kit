FROM node:alpine

# 支持全局安装
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV TIDDLYWIKI_PLUGIN_PATH="/app/plugins"
ENV TIDDLYWIKI_THEME_PATH="/app/themes"

WORKDIR /app
RUN corepack enable && \
    pnpm -g install tiddlywiki@latest
COPY . .

EXPOSE 8080
ENTRYPOINT ["/app/startup.sh"] # 使用sh, not bash, and use chmod +x for this scriptshell
