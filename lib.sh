#!/usr/bin/env bash

# WIP

rm node_modules/tiddlywiki/plugins/oeyoews -rf
rm node_modules/tiddlywiki/library-template -rf

mkdir node_modules/tiddlywiki/plugins/oeyoews

cp plugins/* node_modules/tiddlywiki/plugins/oeyoews -r
cp src/library-template node_modules/tiddlywiki/ -r

cd node_modules/tiddlywiki
node ./tiddlywiki.js library-template/ --output ../../library --build library
