#!/usr/bin/env zx

const homedir = os.homedir();
const serviceFile = "neotw-user.service";
const serviceFilePath = homedir + "/.config/systemd/user/" + serviceFile;
const exists = await fs.pathExists(serviceFilePath);

if (!exists) {
  console.log(exists);
}
