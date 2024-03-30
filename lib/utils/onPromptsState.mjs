/**
 * @description prompts elegant exit cmd
 * @param state
 */
const onPromptState = (state) => {
  if (state.aborted) {
    process.stdout.write('\x1B[?25h');
    process.stdout.write('\n');
    process.exit(0);
  }
};

export default onPromptState;
