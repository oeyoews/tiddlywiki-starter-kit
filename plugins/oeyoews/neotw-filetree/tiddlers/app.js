/*\
title: $:/plugins/oeyoews/neotw-filetree/app.js
type: application/javascript
module-type: library

\*/

const { watch, ref } = window.Vue;

const getTemplate = require('$:/plugins/oeyoews/neotw-vue3/getTemplate.js');
const tagmap = $tw.wiki.getTagMap();
const tags = Object.keys(tagmap).filter(
  (tag) =>
    !(tag.startsWith('$:/') || tag.startsWith('Projectify documentation')),
);

const tagdata = Array.from(tags, (item) => {
  const child = tagmap[item];
  return {
    label: `${item} - ${child.length}`,
    tag: true,
    children: Array.from(child, (ch) => {
      return {
        label: ch,
      };
    }),
  };
});

const app = (self) => {
  const component = {
    setup() {
      const defaultProps = {
        children: 'children',
        label: 'label',
      };
      const filterText = ref('');
      const treeRef = ref(null);

      // 防抖
      watch(filterText, (val) => {
        treeRef.value.filter(val);
      });

      const filterNode = (value, data) => {
        if (!value) return true;
        return data.label.includes(value);
      };

      return { filterNode, filterText, data: tagdata, defaultProps, treeRef };
    },

    methods: {
      handleNodeClick(data) {
        if (!data.tag) {
          self.dispatchEvent({
            type: 'tm-navigate',
            navigateTo: data.label,
          });
        }
      },
    },

    template: getTemplate(
      '$:/plugins/oeyoews/neotw-filetree/templates/app.vue',
    ),

    components: {},
  };
  return component;
};

module.exports = app;
