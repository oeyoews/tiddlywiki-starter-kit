#!/usr/bin/env zx

// enable quiet mode
$.verbose = false;

import msg from "../scripts/info.mjs";
import base from "../scripts/base.mjs";

msg.info();
msg.finish("Neotw test ending");

const time = new Date();
const y = time.getFullYear();
const M = time.getMonth() + 1;
const d = time.getDay();
const h = time.getHours();
const m = time.getMinutes();
const s = time.getSeconds();
const normalDate = y + M + d + h + m + s;

console.log(`${y}${M}`);
