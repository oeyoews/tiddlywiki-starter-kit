#!/usr/bin/env zx

const env = process.env;
const username = env.USERNAME;
const infoPath = "templates/tiddlywiki-template.info";
const target = "tiddlywiki.info";

// questions
// multiple select;

// generate info file
await $`cp ${infoPath} ${target}`;

// install service
