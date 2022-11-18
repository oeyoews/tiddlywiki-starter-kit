#!/usr/bin/env zx

const env = process.env;
const username = env.USERNAME;
const infoPath = "templates/tiddlywiki-template.info";
await $`cp ${infoPath} .`;
