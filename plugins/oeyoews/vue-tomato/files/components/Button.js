module.exports = {
  name: 'Button',
  props: {
    onClick: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    handleClick() {
      this.onClick();
    }
  },
  template: `<button @click="handleClick" class="p-2 bg-gray-100"> <slot /> </button>`
};
