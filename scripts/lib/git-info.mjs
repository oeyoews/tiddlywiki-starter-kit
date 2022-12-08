$.verbose = false;

const headCommit = await $`git rev-parse HEAD`;
const longCommit = headCommit.toString().trim();
const shortCommit = longCommit.substring(0, 7);

const gitCommit = {
  longCommit,
  shortCommit,
};

export default gitCommit;
