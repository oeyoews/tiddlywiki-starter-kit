#!/usr/bin/env zx

// https://github.com/google/zx
// TODO: use git latest tag replace tag

import "zx/globals";
import { info, finish } from "./info.mjs";
import prompts from "prompts";

const filename = "./package.json";
const { version } = require("../package.json");

const [major, minor, patch] = version.split(".");
const nextMajor = String(Number(major) + 1) + ".0.0";
const nextMinor = major + "." + String(Number(minor) + 1) + ".0";
const nextPatch = major + "." + minor + "." + String(Number(patch) + 1);

info();

console.log("Current version: " + version);

const questions = [
  {
    type: "select",
    name: "version",
    message: "Which part do you want to bump? ",
    choices: [
      { title: "patch: " + nextPatch, value: nextPatch },
      { title: "minor: " + nextMinor, value: nextMinor },
      { title: "major: " + nextMajor, value: nextMajor },
    ],
  },
  {
    type: (prev) => prev && "confirm",
    name: "commit",
    message: "是否执行git commit提交代码？",
    initial: true,
  },
  {
    type: (prev) => prev && "text",
    name: "message",
    message: "git commit的内容(留空则使用'Bump version')：",
  },
  {
    type: (prev) => (prev || prev === "") && "confirm",
    name: "tag",
    message: "是否执行git tag打标签？",
    initial: true,
  },
];

const response = await prompts(questions);
const newVersion = response.version;

if (newVersion) {
  const data = await fs.readFile(filename);
  const content = String(data).replace(
    `"version": "${version}"`,
    `"version": "${newVersion}"`
  );
  await fs.writeFile(filename, content);
  console.log(chalk.green("`package.json` updated!"));
}

if (response.commit) {
  let message = response.message;
  if (message === "") {
    message = `Bump version: ${version} → ${newVersion}`;
  }
  if (message) {
    // cd("..");
    await $`git add . && git commit -m ${message}`;
    if (response.tag) {
      const tag = "v" + newVersion;
      // console.log(`git tag -a ${tag} -m ''`)
      await $`git tag -a ${tag} -m ''`;
      await $`git push && git push --tags`;
    }
    finish();
  }
}
