#!/usr/bin/env bash

rm node_modules/tiddlywiki/plugins/oeyoews -r
rm node_modules/tiddlywiki/library-template -r

mkdir node_modules/tiddlywiki/plugins/oeyoews

cp plugins/* node_modules/tiddlywiki/plugins/oeyoews -r
cp src/library-template node_modules/tiddlywiki/ -r

cd node_modules/tiddlywiki
node ./tiddlywiki.js library-template/ --output ../../dist/library --build library
