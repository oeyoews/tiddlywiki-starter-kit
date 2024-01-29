const MathPlugin = (md) => {
  const defaultFenceRender = md.renderer.rules.fence;

  const customMathFenceRender = (tokens, idx, options = {}, env, slf) => {
    const token = tokens[idx];
    const code = token.content.trim();
    const [type] = token.info.split(' ');
    if (type.trim() !== 'math') {
      return defaultFenceRender(tokens, idx, (options = {}), env, slf);
    } else if (type.trim() === 'math') {
      try {
        return $tw.wiki.renderText(
          'text/html',
          'text/vnd.tiddlywiki',
          '$$\n' + code + '\n$$'
        );
      } catch (e) {
        return `<pre>${code}</pre>`;
      }
    }
  };

  md.renderer.rules.fence = customMathFenceRender;
};

module.exports = MathPlugin;
