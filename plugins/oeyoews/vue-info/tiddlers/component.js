/*\
title: $:/plugins/oeyoews/vue-info/component.js
type: application/javascript
module-type: library

\*/

const { ref } = window.Vue;

const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate');

const goto = new $tw.Story();
const getString = (filter) => {
  return $tw.wiki.filterTiddlers(filter);
};

const plugins = getString('[plugin-type[plugin]]').length;
const tags = getString('[tags[]]').length;
const version = $tw.version.replace(/-/g, ' ');

const iinfo = `<svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="text-red-500"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" x2="12" y1="8" y2="12"></line>
        <line x1="12" x2="12.01" y1="16" y2="16"></line>
      </svg>`;

const iplugin = `<svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="text-yellow-500"
      >
        <path
          d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"
        ></path>
        <path d="M7 7h.01"></path>
      </svg>`;

const itag = `<svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="text-yellow-500"
      >
        <path
          d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"
        ></path>
        <path d="M7 7h.01"></path>
      </svg>`;

const itiddler = `<svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="text-blue-500"
      >
        <path
          d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
        ></path>
        <polyline points="14 2 14 8 20 8"></polyline>
      </svg>`;

const iversion = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-purple-500" > <path d="m12 14 4-4"></path> <path d="M3.34 19a10 10 0 1 1 17.32 0"></path> </svg>`;

const app = () => {
  const component = {
    setup() {
      const tiddlers = ref(getString('[!is[system]]').length.toLocaleString());
      const update = ref(
        getString(
          '[!is[system]!prefix[$:/]!has[draft.of]!sort[modified]limit[1]get[modified]format:relativedate[]]'
        )[0]
      );
      return {
        iversion,
        iinfo,
        itag,
        iplugin,
        itiddler,
        update,
        plugins,
        tags,
        tiddlers,
        version
      };
    },

    methods: {
      gotoTiddler(e) {
        const target = e.target.parentNode.dataset.title;
        if (!target) return;
        switch (target) {
          case 'plugin':
            goto.navigateTiddler('$:/core/ui/ControlPanel/Plugins');
            break;
          default:
            goto.navigateTiddler('$:/ControlPanel');
            break;
        }
      }
    },

    template: getTemplate('$:/plugins/oeyoews/vue-info/templates/widget.vue')
  };
  return component;
};

module.exports = app;
