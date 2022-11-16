#!/usr/bin/env zx

const version = process.env.npm_package_version;

const userInfo = os.userInfo(); // init
const username = userInfo.username; // xxx
const homedir = userInfo.homedir; // /home/xxx
const platform = os.platform(); // linux

console.log(version);
