import replace from 'replace';
import base from './base.mjs';

export default async function updateCommit() {
  // git info
  const headCommit = await $`git rev-parse HEAD`;
  const longid = headCommit.toString().trim();
  const shortid = longid.substring(0, 7);
  // console.log(`${longid} and ${shortid}`);
  // const commitTimesVanilla = await $`git rev-list --all --count`;
  // const commitTimes = commitTimesVanilla.toString().trim();

  const commitTemplate = 'templates/footer-template.tid';
  const commitFile = 'patch/footer.tid';

  const regPlace = {
    longid,
    shortid,
    // commitTimes,
    timestamp: base.timestamp,
  };

  await $`cp ${commitTemplate} ${commitFile}`;
  // update commit
  for (let i in regPlace) {
    replace({
      regex: new RegExp('\\$\\{' + i + '\\}', 'g'),
      replacement: regPlace[i], // string
      paths: [commitFile], // array
      recursive: true,
      silent: true,
    });
  }
}
