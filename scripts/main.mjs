#!/usr/bin/env zx

// enable quiet mode
import prompts from "prompts";
import { spinner } from "zx/experimental";
import open from "open"; // https://www.npmjs.com/package/open
import {
  getPortPromise,
  getPort,
  setBasePort,
  setHighestPort,
} from "portfinder"; // https://github.com/http-party/node-portfinder

const bin = "tiddlywiki";

async function service() {
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

async function build() {
  const questions = [
    {
      type: "select",
      name: "output",
      message: "output dir",
      choices: [
        {
          title: "Vanilla",
          description: "default",
          value: "output",
        },
        { title: "Custom", description: "custom", value: "custom" },
      ],
      initial: 0,
    },
    {
      type: (prev) => (prev == "custom" ? "text" : null),
      name: "output",
      message: "custom output",
    },
    {
      type: "select",
      name: "setup",
      message: "Are you sure to set passwd ?",
      choices: [
        {
          title: "yes",
          description: "set TiddlyWiki password",
          value: "yes",
        },
        { title: "no", value: "no" },
      ],
      initial: 1,
    },
    {
      type: (prev) => (prev == "yes" ? "password" : null),
      name: "password",
      message: "custom password",
    },
    {
      type: "toggle",
      name: "isBuild",
      message: "Are you sure to build ?",
      initial: true,
      inactive: "no",
      active: "yes",
    },
  ];

  const response = await prompts(questions);
  const output = response.output;
  const setup = response.setup;
  const passwd = response.password || "password";

  if (response.isBuild) {
    await spinner("Building ...", async () => {
      await $`rm -rf ${output}`; // clean
      if (setup === "yes") {
        await $`npx ${bin} --output ${output} --password ${passwd} --build index `; // use vanilla replace --build
      } else {
        await $`npx ${bin} --output ${output} --build index`; // use vanilla replace --build
      }
    });
  }
}

setBasePort(8080); // default: 8000
setHighestPort(8888); // default: 65535

async function start() {
  const questions = [
    {
      type: "select",
      name: "port",
      message: "port",
      choices: [
        {
          title: "Vanilla",
          description: "default",
          value: "8080",
        },
        { title: "Random", value: "random", disabled: false },
        { title: "Custom", description: "custom", value: "custom" },
      ],
      initial: 0,
    },
    {
      type: (prev) => (prev == "custom" ? "text" : null),
      name: "port",
      message: "custom port",
    },
    {
      type: "toggle",
      name: "isStart",
      message: "Are you sure open on browser ?",
      initial: true,
      inactive: "no",
      active: "yes",
    },
  ];

  const response = await prompts(questions);
  const openUrl = "http:/localhost:" + response.port;

  if (response.isStart) {
    if (response.port == "random") {
      getPort(function (err, port) {
        const openUrl = "http:/localhost:" + port;
        $`npx ${bin} --listen port=${port} 2>&1`;
        spinner("Loading ...", async () => {
          await $`sleep 0.7`;
          await open(openUrl);
        });
      });
    } else {
      $`npx ${bin} --listen port=${response.port} 2>&1`;
      await spinner("Loading ...", async () => {
        await $`sleep 0.7`;
        await open(openUrl);
      });
    }
  }
}

const index = {
  build,
  start,
  service,
};

export default index;
