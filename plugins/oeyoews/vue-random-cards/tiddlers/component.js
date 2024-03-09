/*\
title: $:/plugins/oeyoews/vue-random-cards/component.js
type: application/javascript
module-type: library

\*/

const { reactive, watch, toRaw, computed, ref } = window.Vue;
const { toast } = require('vue3-toastify.js');

const story = new $tw.Story();

const getTemplate = (file) => {
  let template = $tw.wiki.getTiddlerText(file).trim();

  if (template.startsWith('<template>') && template.endsWith('</template>')) {
    template = template.slice(10, -11);
  }

  return template;
};

const app = (filter = '[!is[system]!prefix[$:/]]') => {
  const tiddlers = $tw.wiki.filterTiddlers(filter);
  const component = {
    setup() {
      const cardContent = ref('');
      const title = ref('');

      const chartapp = ref();
      const chart = ref();
      const chartdata = ref([]);

      const options = reactive({
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            const { name, value, percent } = params;
            if (value) {
              return `${name}`;
            } else {
              return `${name}`;
            }
          }
        },

        toolbox: {
          left: 0,
          bottom: 0,
          feature: {
            dataView: { show: true, readOnly: false },
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: 'Tag',
            type: 'pie',
            radius: '50%',
            center: '50%',
            data: chartdata.value
          }
        ]
      });

      return {
        options,
        chart,
        chartdata,
        chartapp,
        title,
        cardContent
      };
    },

    mounted() {
      this.chartapp = echarts.init(this.$refs.chart);
      this.updateChart();
      this.chartapp.on('click', (params) => {
        story.navigateTiddler(params.name);
      });
    },

    watch: {
      chartdata: {
        handler() {
          console.log('update');
          this.updateChart();
        },
        deep: true
      }
    },

    methods: {
      randomTiddlerTitle() {
        const index = (Math.random() * tiddlers.length).toFixed(0) | 0;
        return tiddlers[index];
      },

      updateChart() {
        this.chartapp.setOption(this.options);
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
          console.error(e);
          // toast.error(e.message);
        }
      },

      updateCard() {
        this.title = this.randomTiddlerTitle();
        this.chartdata.push({
          name: this.title,
          value: 1
        });

        this.renderTiddler2HTML();
      },

      gotoTiddler() {
        story.navigateTiddler(this.title);
      }
    },

    template: getTemplate('$:/plugins/oeyoews/vue-random-cards/widget.vue')
  };

  return component;
};

module.exports = app;
