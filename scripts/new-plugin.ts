import prompts from 'prompts';
import fs from 'fs';
import path from 'path';

const onPromptState = (state: { aborted: any }) => {
  if (state.aborted) {
    process.stdout.write('\x1B[?25h');
    process.stdout.write('\n');
    process.exit(0);
  }
};

async function processFilesRecursively(directory: string, pluginname: string) {
  if (!fs.existsSync(directory)) {
    console.log(`${directory} does not exist`);
    return;
  }
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const filePath = path.join(directory, file);
    console.log(filePath);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      await processFilesRecursively(filePath, pluginname);
    } else {
      let content = fs.readFileSync(filePath, 'utf8');
      content = content.replace(/\$\{pluginname\}/g, pluginname);
      fs.writeFileSync(filePath, content);
    }
  }
}

async function main() {
  const template = 'templates/new-plugin/';

  const { pluginname } = await prompts({
    onState: onPromptState,
    type: 'text',
    name: 'pluginname',
    message: 'create plugin',
    initial: 'pluginname',
    validate: (value) => {
      if (fs.existsSync(`plugins/oeyoews/${value}`)) {
        return `${value} folder already exists`;
      }
      return true;
    },
  });

  const target = path.join('plugins/oeyoews', pluginname);

  // @ts-ignore
  Bun.spawn(['cp', '-r', template, `${target}`], {
    // @ts-ignore
    onExit: (proc, exitCode, signalCode, error) => {
      if (error) {
        console.log(error);
      }
      try {
        processFilesRecursively(target, pluginname);
      } catch (e) {
        fs.rmSync(target, { recursive: true });
        console.log(e);
      }
    },
  });
}

main();
