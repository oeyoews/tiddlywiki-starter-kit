#!/usr/bin/env zx

import checkhealth from "./checkhealth.mjs";

const programms = ["git", "node", "npx", "tiddlywiki"];

export default function () {
  checkhealth.checkPlatform("linux");
  checkhealth.checkRequireProgrammsExist(programms);
}
