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
  template: `<button @click="handleClick" class="mx-1 p-1 bg-gray-100 dark:bg-gray-700"> <slot /> </button>`
};
