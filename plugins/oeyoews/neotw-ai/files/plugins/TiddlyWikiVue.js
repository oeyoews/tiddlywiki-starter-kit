module.exports = {
  install(app, options) {
    app.component('TiddlyWikiVue', {
      template: `<button> {{ msg }} </button>`,
      props: {
        msg: String
      }
    });
  }
};
