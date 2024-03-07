/*\
title: $:/plugins/oeyoews/vue-links-gallery/component.js
type: application/javascript
module-type: library

\*/

const { watch, toRaw, computed, ref } = window.Vue;
const { toast } = require('vue3-toastify.js');

const type = 'application/x-tiddler-dictionary';
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
      // obj --> array
      const data = ref(Object.entries($tw.wiki.getTiddlerData(json, {})));

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

      resetStatus: function () {
        this.newDesc = '';
        this.newLink = '';
      },
      updateData: function () {
        if ($tw.wiki.getTiddler(json)?.fields.type !== type) {
          $tw.wiki.setText(json, 'type', null, type);
        }
        $tw.wiki.setTiddlerData(
          json,
          Object.fromEntries(toRaw(this.data)),
          null,
          {
            suppressTimestamp: true
          }
        );
      },
      removeLink: function (site) {
        // this.data.splice(index, 1);
        this.data = this.data.filter(([desc, link]) => {
          return link !== site;
        });
        this.updateData();
      },

      // TODO: 验证是否为网址
      addNewLink: function () {
        if (!this.newLink || !this.newDesc) {
          toast.error('缺少链接或描述');
          return;
        }
        if (this.prettyLinkData.find((item) => item.link === this.newLink)) {
          toast.error('链接已存在');
          return;
        } else if (this.newLink && this.newDesc) {
          this.data.unshift([this.newDesc, this.newLink]);
          this.updateData();
        }
        this.resetStatus();
      }
    },

    template: getTemplate()
  };
  return component;
};

module.exports = links;
