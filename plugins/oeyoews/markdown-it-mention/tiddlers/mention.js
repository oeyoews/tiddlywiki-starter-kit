/*\
title: $:/plugins/oeyoews/markdown-it-mention/markdown-it-mention.js
type: application/javascript
module-type: markdownit

\*/

function mentionPlugin(md, options) {
  md.inline.ruler.before('link', 'mention', (state, silent) => {
    if (silent) return false;

    const start = state.pos;
    const max = state.posMax;

    if (state.src.charCodeAt(start) !== 0x40 /* @ */) {
      return false;
    }

    let end = start + 1;

    while (end < max && !state.md.utils.isSpace(state.src.charCodeAt(end))) {
      end++;
    }

    const username = state.src.slice(start + 1, end);

    if (end < max && state.src.charCodeAt(end) === 0x28 /* ( */) {
      end++;
      let level = 1;
      while (end < max) {
        const code = state.src.charCodeAt(end);
        if (code === 0x28 /* ( */) {
          level++;
        } else if (code === 0x29 /* ) */) {
          level--;
          if (level === 0) break;
        }
        end++;
      }
    }

    if (end > start + 1) {
      const token = state.push('mention', '', 0);
      token.markup = '@';
      token.content = username;
      state.pos = end;
      return true;
    } else {
      return false;
    }
  });

  md.renderer.rules.mention = (tokens, idx) => {
    const username = tokens[idx].content;
    const link = document.createElement('a');
    link.href = `#@${username}`;
    link.className = 'mention';
    link.textContent = '@' + username;
    // NOT support
    /*     link.addEventListener('click', () => {
      console.log('hi');
    }); */
    return link.outerHTML;
  };
}

module.exports = mentionPlugin;
