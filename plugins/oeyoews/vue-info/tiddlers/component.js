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
const startup =
  $tw.wiki.getTiddler('_state-neotw-startup-times')?.fields?.times || 0;

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

const iplugin = `<svg xmlns="http://www.w3.org/2000/svg" class="text-green-500"
 width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16.75 6H20a1 1 0 0 1 1 1v3.25a.75.75 0 0 1-.75.75H20a2 2 0 1 0 0 4h.25a.75.75 0 0 1 .75.75V20a1 1 0 0 1-1 1h-3.25a.75.75 0 0 1-.75-.75V20a2 2 0 1 0-4 0v.25a.75.75 0 0 1-.75.75H7a1 1 0 0 1-1-1v-4.25a.75.75 0 0 0-.75-.75H5a2 2 0 1 1 0-4h.25a.75.75 0 0 0 .75-.75V7a1 1 0 0 1 1-1h4.25a.75.75 0 0 0 .75-.75V5a2 2 0 1 1 4 0v.25c0 .414.336.75.75.75"/></svg>`;

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
const ihg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g><path fill="currentColor" d="M7 3H17V7.2L12 12L7 7.2V3Z"><animate id="eosIconsHourglass0" fill="freeze" attributeName="opacity" begin="0;eosIconsHourglass1.end" dur="2s" from="1" to="0" class="text-gray-500" /></path><path fill="currentColor" d="M17 21H7V16.8L12 12L17 16.8V21Z"><animate fill="freeze" attributeName="opacity" begin="0;eosIconsHourglass1.end" dur="2s" from="0" to="1"/></path><path fill="currentColor" d="M6 2V8H6.01L6 8.01L10 12L6 16L6.01 16.01H6V22H18V16.01H17.99L18 16L14 12L18 8.01L17.99 8H18V2H6ZM16 16.5V20H8V16.5L12 12.5L16 16.5ZM12 11.5L8 7.5V4H16V7.5L12 11.5Z"/><animateTransform id="eosIconsHourglass1" attributeName="transform" attributeType="XML" begin="eosIconsHourglass0.end" dur="0.5s" from="0 12 12" to="180 12 12" type="rotate"/></g></svg>`;

const iversion = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-purple-500" > <path d="m12 14 4-4"></path> <path d="M3.34 19a10 10 0 1 1 17.32 0"></path> </svg>`;

const app = () => {
  const component = {
    setup() {
      const tiddlers = ref(getString('[!is[system]]').length);
      const update = ref(
        getString(
          '[!is[system]!prefix[$:/]!has[draft.of]!sort[modified]limit[1]get[modified]format:relativedate[]]',
        )[0],
      );
      return {
        textItems: {
          version: {
            text: 'Version',
            color: 'purple',
            number: version,
            icon: iversion,
            title: 'version',
          },
          update: {
            text: 'Update',
            color: 'red',
            number: update,
            icon: iinfo,
            title: 'update',
          },
          plugins: {
            text: 'Plugins',
            color: 'green',
            number: plugins,
            icon: iplugin,
            title: 'plugin',
          },
          tags: {
            text: 'Tags',
            color: 'yellow',
            number: tags,
            icon: itag,
            title: 'tag',
          },
          tiddlers: {
            text: 'Tiddlers',
            color: 'blue',
            number: tiddlers,
            icon: itiddler,
            title: 'tiddler',
          },
          startup: {
            text: 'Startup',
            color: 'blue',
            number: startup,
            icon: ihg,
            title: 'tiddler',
          },
        },
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
      },
    },

    template: getTemplate('$:/plugins/oeyoews/vue-info/templates/widget.vue'),
  };
  return component;
};

module.exports = app;
