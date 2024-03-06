/*\
title: $:/plugins/oeyoews/vue-links-gallery/component.js
type: application/javascript
module-type: library

\*/

const { watch, toRaw, computed, ref } = window.Vue;
const { toast } = require('vue3-toastify.js');

const getTemplate = () => {
  let template = $tw.wiki
    .getTiddlerText('$:/plugins/oeyoews/vue-links-gallery/widget.vue')
    .trim(); // trim to remove linebreak

  if (template.startsWith('<template>') && template.endsWith('</template>')) {
    template = template.slice(10, -11);
  }

  return template;
};

const links = (json = 'list-links.json') => {
  const component = {
    setup() {
      const data = ref(
        $tw.wiki.getTiddlerText(json) &&
          Object.entries($tw.wiki.getTiddlerData(json))
      );

      const newLink = ref('');
      const newDesc = ref('');

      const edit = ref(false);
      const prettyLink = (link) => {
        try {
          return new URL(link).origin;
        } catch (e) {
          console.error(e);
          return link;
        }
      };

      const prettyLinkData = computed(() => {
        if (!data.value) return [];

        return data.value.map((item) => {
          return {
            desc: item[0],
            link: item[1],
            prettyLink: prettyLink(item[1])
          };
        });
      });

      return {
        prettyLink,
        prettyLinkData,
        data,
        newLink,
        edit,
        newDesc
      };
    },

    methods: {
      toEdit: function () {
        this.edit = !this.edit;
      },
      removeLink: function (index) {
        this.data.splice(index, 1);
      },
      addNewLink: function () {
        if (this.prettyLinkData.find((item) => item.link === this.newLink)) {
          toast.error('链接已存在');
          return;
        } else if (this.newLink && this.newDesc) {
          // TODO: 验证是否为网址
          if (!this.data) return;
          this.data.unshift([this.newDesc, this.newLink]);
        }
      }
    },

    template: getTemplate()
  };
  return component;
};

module.exports = links;
