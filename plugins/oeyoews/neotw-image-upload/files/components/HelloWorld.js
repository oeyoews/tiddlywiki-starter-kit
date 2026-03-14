module.exports = {
  name: 'HelloWorld',
  props: {
    version: {
      type: String,
      default: '5.3.6',
    },
  },
  template: `<span>HelloWord, TiddlyWiki {{ version }} </span>`,
  created() {
    console.log('HelloWorld created!');
  },
};
