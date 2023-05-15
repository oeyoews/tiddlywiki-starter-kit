#!/usr/bin/env bash

# yarn build:neotw

## NOTE need after build steps

# Define variables
TEMPLATE_DIR="tmp/neotw-template"
PLUGINS_DIR="dist/plugins"
THEMES_DIR="dist/themes"
UPLOAD_DIR="upload"

# Remove existing template dir
rm -rf "$TEMPLATE_DIR" $UPLOAD_DIR

# Initialize TiddlyWiki server template
# npx tiddlywiki "$TEMPLATE_DIR" --init server

mkdir tmp/neotw-template -p && cp ./templates/tiddlywiki.info $TEMPLATE_DIR

# Create tiddlers dir
mkdir "$TEMPLATE_DIR/tiddlers"

# Copy plugins and themes to tiddlers dir
cp -r "$PLUGINS_DIR" "$THEMES_DIR" "$TEMPLATE_DIR/tiddlers"

# Rename template dir to upload dir
# mkdir "$UPLOAD_DIR"
mv "$TEMPLATE_DIR" "$UPLOAD_DIR"

echo "Template successfully created in '$UPLOAD_DIR'"

### git repo
cd upload && git init && git branch -M template
# bind repo
git remote add origin https://github.com/oeyoews/neotw
# push
git add . && git commit -m "init: upload template" && git push -uf origin template

git push https://github.com/oeyoews/tiddlywiki-neotw-starter-kit.git -f
