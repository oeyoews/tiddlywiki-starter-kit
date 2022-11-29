#!/usr/bin/env zx

import checkhealth from "../scripts/checkhealth.mjs";

const programms = ["git", "node", "npx", "tiddlywiki"];

export default function () {
  checkhealth.checkPlatform("linux");
  checkhealth.checkRequireProgrammsExist(programms);
}
