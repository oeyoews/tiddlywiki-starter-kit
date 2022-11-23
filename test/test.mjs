#!/usr/bin/env zx

// enable quiet mode
$.verbose = false;

import msg from "../scripts/info.mjs";

msg.currentDate();
msg.info();
msg.finish("Neotw test ending");
