/*\
title: $:/plugins/oeyoews/vue-random-cards/component.js
type: application/javascript
module-type: library

\*/

const { reactive, watch, toRaw, computed, ref } = window.Vue;
const palette = $tw.wiki.getTiddlerText('$:/palette');
const theme =
  $tw.wiki.getTiddler(palette).fields['color-scheme'] === 'dark'
    ? 'dark'
    : 'light';

const story = new $tw.Story();

const throttle = (fn, delay = 500) => {
  let timer = null;
  return function (...arg) {
    const self = this;
    if (!timer) {
      // TIP: 箭头函数虽然会修复this指向问题， 但是同时有导致了 vue 的this 失效， 所以这里必须要哦使用 显示this 绑定
      fn.apply(self, arg);
      timer = setTimeout(() => {
        timer = null; // 清除定时器
      }, delay);
    } else {
    }
  };
};

const getTemplate = (file) => {
  let template = $tw.wiki.getTiddlerText(file).trim();

  if (template.startsWith('<template>') && template.endsWith('</template>')) {
    template = template.slice(10, -11);
  }

  return template;
};

const app = (filter = '[!is[system]!prefix[$:/]!<currentTiddler>]') => {
  const tiddlers = $tw.wiki.filterTiddlers(filter);
  const component = {
    setup() {
      const cardContent = ref('');
      const title = ref('');

      const chartapp = ref();
      const chartdata = ref([]);

      const options = reactive({
        // TODO: not work
        // aria: {
        //   enabled: true,
        //   decal: {
        //     show: true
        //   }
        // },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            const { name, value, percent } = params;
            if (value) {
              return `${name}`;
            } else {
              return `${name}`;
            }
          },
        },

        toolbox: {
          show: false,
          left: 0,
          bottom: 0,
          feature: {
            dataView: { show: true, readOnly: false },
            restore: {},
            saveAsImage: {},
          },
        },
        series: [
          {
            name: 'Tag',
            type: 'pie',
            radius: '50%',
            center: '50%',
            data: chartdata.value,
          },
        ],
      });

      const isRotate = ref(false);

      return {
        isRotate,
        options,
        chartdata,
        chartapp,
        title,
        cardContent,
      };
    },

    mounted() {
      this.chartapp = echarts.init(this.$refs.chart, theme, {
        renderer: 'svg',
      });
      this.updateChart();
      this.chartapp.on('click', (params) => {
        story.navigateTiddler(params.name);
      });
    },

    watch: {
      chartdata: {
        handler() {
          this.updateChart();
        },
        deep: true,
      },
    },

    methods: {
      randomTiddlerTitle() {
        const index = (Math.random() * tiddlers.length).toFixed(0) | 0;
        return tiddlers[index];
      },

      updateChart() {
        if (this.chartdata.length > 10) {
          this.resetChart();
          this.chartdata.push({
            name: this.title,
            value: 1,
          });
        }
        this.chartapp.setOption(this.options);

        // this.chartapp.showLoading();
        // setTimeout(() => {
        //   this.chartapp.setOption(this.options);
        //   this.chartapp.hideLoading();
        // }, 200);
      },

      resetChart() {
        // TODO: 如果直接清空， 无效 对于setoptions???
        this.chartdata.splice(0, this.chartdata.length);
      },

      renderTiddler2HTML() {
        try {
          this.cardContent =
            $tw.wiki.renderTiddler('text/html', this.title) || '空空如也';
        } catch (e) {
          console.error(e.message);
        }
      },

      updateCard: throttle(function () {
        this.isRotate = !this.isRotate;
        this.title = this.randomTiddlerTitle();
        this.chartdata.push({
          name: this.title,
          value: 1,
        });

        this.renderTiddler2HTML();
      }),

      gotoTiddler() {
        story.navigateTiddler(this.title);
      },
    },

    template: getTemplate('$:/plugins/oeyoews/vue-random-cards/widget.vue'),
  };

  return component;
};

module.exports = app;
