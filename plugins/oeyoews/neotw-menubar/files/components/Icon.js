// Icon component for menu
const Icon = {
  name: 'Icon',
  emits: ['menu'],
  props: {
    customClass: {
      type: String,
    },
    icon: {
      type: String,
    },
  },
  // inject: ['toggleSidebar'],
  template: `<div class="flex items-center" :class="customClass" v-html="icon" @click="handleClick"></div>`,
  mounted() {},
  methods: {
    handleClick() {
      this.$emit('menu');
    },
  },
};

module.exports = Icon;
