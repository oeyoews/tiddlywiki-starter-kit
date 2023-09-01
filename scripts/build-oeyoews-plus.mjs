import ora from "ora";
import dotenv from "dotenv";
import { exec } from "child_process";

dotenv.config();

const buildDir = "dist";
const log = ora("Building ...");

const cleanBuildDir = () => {
  log.start("开始清理");
  exec(`rm -rf ${buildDir} && mkdir ${buildDir}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`清理dist目录时出错： ${error.message}`);
      return;
    }
    log.info("🗑️  清理dist目录");
  });
};

const steps = [
  { cmd: "index", description: "📟 构建索引" },
  { cmd: "library", description: "📚 构建库" },
  { cmd: "plugins", description: "🧩 构建插件" },
  { cmd: "themes", description: "🎨 构建主题" },
];

const buildStep = (name, description) => {
  log.start(description);
  exec(`npx tiddlywiki . --build ${name}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`构建${name}时出错： ${error.message}`);
      return;
    }
    log.info(description);
  });
};

const buildEditions = () => {
  exec(
    "npx tiddlywiki editions/neotw --build editions",
    (error, stdout, stderr) => {
      if (error) {
        console.error(`构建editions时出错： ${error.message}`);
        return;
      }
      log.info("🚀 构建editions");
    }
  );
};

const buildAll = () => {
  steps.forEach((step) => {
    buildStep(step.cmd, step.description);
  });
};

const copyFiles = () => {
  exec(`cp -r files vercel.json ${buildDir}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`复制文件时出错： ${error.message}`);
      return;
    }
    log.info("📁 复制文件");
  });
};

cleanBuildDir();
buildEditions();
buildAll();
copyFiles();