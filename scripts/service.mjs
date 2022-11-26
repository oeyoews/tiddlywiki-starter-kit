#!/usr/bin/env zx

import prompts from "prompts";
import { spinner } from "zx/experimental";

export default async function service() {
  const serviceFile = "neotw-user.service";
  const serviceChoices = [
    "restart",
    "stop",
    "status",
    "start",
    "stop",
    "disable",
    "enable",
    "reload",
  ];

  const questions = [
    {
      type: "select",
      name: "serviceEvent",
      message: "event",
      choices: serviceChoices.map((i) => ({ value: i, title: i })),
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
}
