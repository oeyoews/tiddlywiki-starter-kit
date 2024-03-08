/*\
title: $:/plugins/oeyoews/vue-random-cards/component.js
type: application/javascript
module-type: library

\*/

const { watch, toRaw, computed, ref } = window.Vue;
const { toast } = require('vue3-toastify.js');

const getTemplate = (file) => {
  let template = $tw.wiki.getTiddlerText(file).trim();

  if (template.startsWith('<template>') && template.endsWith('</template>')) {
    template = template.slice(10, -11);
  }

  return template;
};

const app = (filter = '[!is[system]!prefix[$:/]]') => {
  const tiddlers = $tw.wiki.filterTiddlers(filter);
  const component = {
    setup() {
      const cardContent = ref('');
      const title = ref('');

      return {
        title,
        cardContent
      };
    },

    // mounted() {
    //   this.updateCard();
    // },

    methods: {
      randomTiddlerTitle() {
        const index = (Math.random() * tiddlers.length).toFixed(0) | 0;
        return tiddlers[index];
      },

      renderTiddler2HTML() {
        try {
          this.cardContent =
            $tw.wiki.renderTiddler('text/html', this.title) || '空空如也';
        } catch (e) {
          console.error(e);
          // toast.error(e.message);
        }
      },

      updateCard() {
        this.title = this.randomTiddlerTitle();
        this.renderTiddler2HTML();
      },

      gotoTiddler() {
        const story = new $tw.Story();
        story.navigateTiddler(this.title);
      }
    },

    template: getTemplate('$:/plugins/oeyoews/vue-random-cards/widget.vue')
  };

  return component;
};

module.exports = app;
