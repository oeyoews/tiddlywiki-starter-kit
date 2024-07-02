FROM node:alpine

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV TIDDLYWIKI_PLUGIN_PATH="/app/plugins"
ENV TIDDLYWIKI_THEME_PATH="/app/themes"

WORKDIR /app
RUN corepack enable && \
    pnpm install -g tiddlywiki@5.3.0
COPY . .

EXPOSE 8080
ENTRYPOINT ["/app/startup.sh"] # 使用sh, not bash, and use chmod +x for this scriptshell
