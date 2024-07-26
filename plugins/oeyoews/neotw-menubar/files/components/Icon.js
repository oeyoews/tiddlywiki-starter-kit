// Icon component for menu
const Icon = {
  name: 'Icon',
  props: {
    icon: {
      type: String,
    },
  },
  template: `<div class="flex items-center" v-html="icon"></div>`,
};

module.exports = Icon;
