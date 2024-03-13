/*\
title: $:/plugins/oeyoews/vue-info/icons.js
type: application/javascript
module-type: library

\*/

const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate');

const version = getTemplate(
  '$:/plugins/oeyoews/vue-info/templates/version.vue'
);

const info = `<svg
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

const plugins = `<svg
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

const tag = `<svg
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

const tiddler = `<svg
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

const card = `<div class="flex items-center rounded-md bg-gray-200 dark:bg-gray-700 px-2 py-1 shrink-0"><slot /></div>`;

module.exports = [
  {
    name: 'IconVersion',
    icon: version
  },
  {
    name: 'IconInfo',
    icon: info
  },
  {
    name: 'IconPlugin',
    icon: plugins
  },
  {
    name: 'InfoCard',
    icon: card
  },
  {
    name: 'IconTag',
    icon: tag
  },
  {
    name: 'IconTiddler',
    icon: tiddler
  }
];
