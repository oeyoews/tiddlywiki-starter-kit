import prompts from "prompts";
import replace from "replace";
import fs from "fs";
import os from "os";
import { exec } from "child_process"; // 导入 child_process 模块的 exec 函数

const onPromptState = (state) => {
  if (state.aborted) {
    process.stdout.write("\x1B[?25h");
    process.stdout.write("\n");
    process.exit(0);
  }
};

function titleCase(str) {
  const splitStr = str.toLowerCase().split(" ");
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(" ");
}

async function newPlugin() {
  const template = "templates/new-plugin";
  const questions = [
    {
      onState: onPromptState,
      type: "text",
      name: "pluginname", // 变量
      message: "create plugin",
      initial: "pluginname",
    },
    {
      onState: onPromptState,
      type: "toggle",
      name: "newPluginStatus",
      message: "Are you sure to Create this new plugin",
      initial: true,
      inactive: "no",
      active: "yes",
    },
  ];

  // 获取回答
  let { newPluginStatus, pluginname } = await prompts(questions);

  if (newPluginStatus) {
    exec(`rm -rf plugins/${pluginname}*`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error removing existing plugins: ${error.message}`);
        return;
      }
      // 继续执行您的代码
      pluginname = pluginname.trim().replace(/\s+/g, "-");
      const upperpluginname = titleCase(pluginname.trim().replace(/-/g, " "));
      const target = `plugins/oeyoews/${pluginname}`;

      if (fs.existsSync(target)) {
        console.log(`Plugin directory '${target}' already exists. Aborting.`);
        return;
      }

      exec(
        `mkdir ${target} && cp -r ${template}/* ${target}`,
        (error, stdout, stderr) => {
          if (error) {
            console.error(`Error creating plugin directory: ${error.message}`);
            return;
          }
          // 继续执行您的代码
          const { username } = os.userInfo();
          const regexPlace = {
            upperpluginname,
            pluginname,
            username,
          };

          for (let i in regexPlace) {
            replace({
              regex: new RegExp("\\$\\{" + i + "\\}", "g"),
              replacement: regexPlace[i],
              paths: [target],
              recursive: true,
              silent: true,
            });
          }
        }
      );
    });
  } else {
    console.log("🍃 I can see the first leaf falling.");
  }
}

newPlugin();
