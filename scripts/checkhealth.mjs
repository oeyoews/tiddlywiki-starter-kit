#!/usr/bin/env zx

/* git;
node;
npm;
tiddlywiki;
git; */
import msg from "./info.mjs";

msg.info();

const platform = os.platform();

const checkhealth = {
  platform: () => console.log(`Platform: ${platform}`),
};

checkhealth.platform();
