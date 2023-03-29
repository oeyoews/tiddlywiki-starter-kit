#!/bin/bash

for f in "$@"
do
  if [[ $(file --mime-type -b "$f") == image/*g ]]; then
    pngquant 64 --skip-if-larger --ext=.png --force "$f"
    # zopflipng -y "$f" "$f"
  fi
done

# useage
# sh minify-png.sh files/*
