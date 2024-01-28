const MermaidPlugin = (md) => {
  const {
    mermaidAPI: mermaid
  } = require('$:/plugins/orange/mermaid-tw5/mermaid.min.js');

  // md.mermaid = mermaid;
  mermaid.loadPreferences = (preferenceStore) => {
    let mermaidTheme = preferenceStore.get('mermaid-theme');
    if (mermaidTheme === undefined) {
      mermaidTheme = 'default';
    }
    let ganttAxisFormat = preferenceStore.get('gantt-axis-format');
    if (ganttAxisFormat === undefined) {
      ganttAxisFormat = '%Y-%m-%d';
    }
    mermaid.initialize({
      securityLevel: 'loose',
      theme: mermaidTheme,
      gantt: {
        axisFormatter: [
          [
            ganttAxisFormat,
            (d) => {
              return d.getDay() === 1;
            }
          ]
        ]
      }
    });
    return {
      'mermaid-theme': mermaidTheme,
      'gantt-axis-format': ganttAxisFormat
    };
  };

  // 其他类型的代码块
  const temp = md.renderer.rules.fence.bind(md.renderer.rules);

  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx];
    const code = token.content.trim();
    if (token.info === 'mermaid') {
      try {
        return mermaid.render('mermaid' + idx, code);
      } catch (e) {
        // console.log(e);
      }
    }
    return temp(tokens, idx, options, env, slf);
  };
};

module.exports = MermaidPlugin;
