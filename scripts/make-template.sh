#!/usr/bin/env bash

# Define variables
TEMPLATE_DIR="tmp/neotw-template"
PLUGINS_DIR="dist/plugins"
THEMES_DIR="dist/themes"
UPLOAD_DIR="upload"

# Remove existing template dir
rm -rf "$TEMPLATE_DIR" upload

# Initialize TiddlyWiki server template
npx tiddlywiki "$TEMPLATE_DIR" --init server

# Create tiddlers dir
mkdir "$TEMPLATE_DIR/tiddlers"

# Copy plugins and themes to tiddlers dir
cp -r "$PLUGINS_DIR" "$THEMES_DIR" "$TEMPLATE_DIR/tiddlers"

# Rename template dir to upload dir
mv "$TEMPLATE_DIR" "$UPLOAD_DIR"

echo "Template successfully created in '$UPLOAD_DIR'"
