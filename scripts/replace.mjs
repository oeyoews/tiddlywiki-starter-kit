#!/usr/bin/env zx

// new3 demo
/*
const data = await fs.readFile(filename);
console.log(data);
const content = String(data).replace("new344", "new3442"); */

import { promises as fs } from "fs";

const filename = await glob(["scripts/replace.mjs"]);
console.log(filename);

// Below statements must be wrapped inside the 'async' function:
const data = await fs.readFile(filename, "utf8");
const result = data.replace(/demo/, "new33");
await fs.writeFile(filename, result, "utf8");

/*
import replace from "replace";

// use:

replace({
  regex: "new344",
  replacement: "new34444",
  paths: ["dev/plugins"],
  recursive: true,
  silent: true,
}); */
