#!/usr/bin/env zx

import prompts from "prompts";
import { spinner } from "zx/experimental";

const platform = os.platform();
const serviceFile = "neotw-user.service";

const questions = [
  {
    type: "select",
    name: "serviceEvent",
    message: "event",
    choices: [
      // TODO: how to output this status?
      {
        title: "Status service",
        description: "status " + serviceFile,
        value: "status",
      },
      {
        title: "Start service",
        description: "start " + serviceFile,
        value: "start",
      },
      {
        title: "Stop service",
        description: "stop " + serviceFile,
        value: "stop",
      },
      {
        title: "Disable service",
        description: "disable " + serviceFile,
        value: "disable",
      },
      {
        title: "Enable service",
        description: "enable " + serviceFile,
        value: "enable",
      },
      {
        title: "Reload service",
        description: "reload " + serviceFile,
        value: "reload",
      },
      {
        title: "Restart service",
        description: "restart " + serviceFile,
        value: "restart",
      },
    ],
    initial: 0,
  },
  {
    type: "toggle",
    name: "isSure",
    message: "Are you sure ?",
    initial: true,
    active: "yes",
    inactive: "no",
  },
];

const response = await prompts(questions);
const isSure = response.isSure;
const serviceEvent = response.serviceEvent;

if (platform == "linux") {
  if (isSure) {
    if (serviceEvent == "reload") {
      await spinner("Cloning ...", async () => {
        await $`systemctl --user daemon-reload`;
        console.log(chalk.green(`${serviceEvent}`));
      });
    }

    if (serviceEvent !== "reload") {
      await spinner("Cloning ...", async () => {
        await $`systemctl --user ${serviceEvent} ${serviceFile}`;
      });
    } else {
      echo("🍃 I can see the first leaf falling.");
    }
  }
} else {
  echo("🍃 I can see the first leaf falling.(please use non-windows platform)");
}
