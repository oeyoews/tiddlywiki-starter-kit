module.exports = {
  name: 'Version',
  props: {
    version: String,
    default: '5.3.2'
  },
  template: `<span> {{ version }} </span>`
};
