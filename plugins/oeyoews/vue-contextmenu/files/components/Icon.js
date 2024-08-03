module.exports = {
  name: 'Icon',
  props: {
    icon: {
      type: String
    }
  },
  template: `<div class="flex items-center" v-html="icon"></div>`
};
