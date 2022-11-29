#!/usr/bin/env zx

const homedir = os.homedir();
const serviceFile = "neotw-user.service";
const serviceFilePath = homedir + "/.config/systemd/user/" + serviceFile;
const exists = await fs.pathExists(serviceFilePath);
import checkhealth from "./checkhealth.mjs";

checkhealth.checkPlatform();

function demo(x = "xx") {
  console.log(x);
}

demo();
