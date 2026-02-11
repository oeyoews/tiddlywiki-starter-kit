FROM docker.io/library/node:24

ENV TIDDLYWIKI_PLUGIN_PATH="/app/plugins"
ENV TIDDLYWIKI_THEME_PATH="/app/themes"

WORKDIR /app
COPY . .

# EXPOSE 8080
# ENTRYPOINT ["/app/startup.sh"] # 使用sh, not bash, and use chmod +x for this scriptshell
