/*\
title: $:/plugins/oeyoews/vue-links-gallery/component.js
type: application/javascript
module-type: library

\*/

const { reactive, toRaw, computed, ref } = window.Vue;

const randomString = () => {
  return Math.random().toString(36).substring(2, 11);
};

const type = 'application/x-tiddler-dictionary';
const getTemplate = () => {
  let template = $tw.wiki
    .getTiddlerText('$:/plugins/oeyoews/vue-links-gallery/widget.vue')
    .trim(); // trim to remove linebreak

  if (template.startsWith('<template>') && template.endsWith('</template>')) {
    template = template.slice(10, -11);
  }

  return template;
};

const links = (json = 'list-links.json') => {
  const component = {
    setup() {
      // obj --> array
      const data = ref(Object.entries($tw.wiki.getTiddlerData(json, {})));

      const newLink = ref('');
      const newDesc = ref('');

      const edit = ref(false);
      const prettyLink = (link) => {
        try {
          return new URL(link).origin;
        } catch (e) {
          console.error(e.message);
          return link;
        }
      };

      const prettyLinkData = computed(() => {
        if (!data.value) return [];

        return data.value.map((item) => {
          return {
            desc: item[0],
            link: item[1],
            prettyLink: prettyLink(item[1]),
          };
        });
      });

      const chartdata = reactive({
        nodes: [
          {
            id: '0',
            name: 'Myriel',
            symbolSize: 19.12381,
            x: -266.82776,
            y: 299.6904,
            value: 28.685715,
            category: 0,
          },
          {
            id: '1',
            name: 'Napoleon',
            symbolSize: 2.6666666666666665,
            x: -418.08344,
            y: 446.8853,
            value: 4,
            category: 0,
          },
          {
            id: '2',
            name: 'MlleBaptistine',
            symbolSize: 6.323809333333333,
            x: -212.76357,
            y: 245.29176,
            value: 9.485714,
            category: 1,
          },
        ],
        links: [
          {
            source: '1',
            target: '0',
          },
          {
            source: '2',
            target: '0',
          },
          {
            source: '3',
            target: '0',
          },
          {
            source: '3',
            target: '2',
          },
          {
            source: '4',
            target: '0',
          },
          {
            source: '5',
            target: '0',
          },
          {
            source: '6',
            target: '0',
          },
        ],
        categories: [
          {
            name: 'A',
          },
          {
            name: 'B',
          },
          {
            name: 'C',
          },
          {
            name: 'D',
          },
        ],
      });

      const options = computed(() => ({
        title: {
          text: 'Les Miserables',
          subtext: 'Default layout',
          top: 'bottom',
          left: 'right',
        },
        tooltip: {},
        legend: [
          {
            // selectedMode: 'single',
            data: chartdata.categories.map(function (a) {
              return a.name;
            }),
          },
        ],
        animationDuration: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            name: 'Les Miserables',
            type: 'graph',
            layout: 'none',
            data: chartdata.nodes,
            links: chartdata.links,
            categories: chartdata.categories,
            roam: true,
            label: {
              position: 'right',
              formatter: '{b}',
            },
            lineStyle: {
              color: 'source',
              curveness: 0.3,
            },
            emphasis: {
              focus: 'adjacency',
              lineStyle: {
                width: 10,
              },
            },
          },
        ],
      }));

      const chartapp = ref();

      return {
        chartapp,
        chartdata,
        options,
        prettyLink,
        prettyLinkData,
        data,
        newLink,
        edit,
        newDesc,
      };
    },

    mounted() {
      this.initChart();
      // this.chartapp.showLoading();
      this.updateChart();
      // this.chartapp.hideLoading();
    },

    watch: {
      options: {
        handler() {
          this.updateChart();
        },
      },
    },

    methods: {
      initChart() {
        this.chartapp = echarts.init(this.$refs.chart);
      },
      addData() {
        this.chartdata.categories.push({
          name: randomString(),
        });

        this.chartdata.nodes.push({
          id: this.chartdata.nodes.length,
          name: randomString(),
          symbolSize: 19.12381 + Math.random() * 10,
          x: -266.82776 + Math.random() * 100,
          y: 299.6904 + Math.random() * 100,
          value: 28.685715 + Math.random() * 10,
          category: 'A',
        });
        // this.updateChart();
      },

      /** @see: https://echarts.apache.org/handbook/zh/how-to/data/dynamic-data */
      updateChart() {
        this.chartapp.setOption(this.options);
      },
      toEdit: function () {
        this.edit = !this.edit;
      },

      resetStatus: function () {
        this.newDesc = '';
        this.newLink = '';
      },
      updateData: function () {
        if ($tw.wiki.getTiddler(json)?.fields.type !== type) {
          $tw.wiki.setText(json, 'type', null, type);
        }
        $tw.wiki.setTiddlerData(
          json,
          Object.fromEntries(toRaw(this.data)),
          null,
          {
            suppressTimestamp: true,
          },
        );
      },
      removeLink: function (site) {
        // this.data.splice(index, 1);
        this.data = this.data.filter(([desc, link]) => {
          return link !== site;
        });
        this.updateData();
      },

      // TODO: 验证是否为网址
      addNewLink: function () {
        if (!this.newLink || !this.newDesc) {
          console.error('缺少链接或描述');
          return;
        }
        if (this.prettyLinkData.find((item) => item.link === this.newLink)) {
          console.error('链接已存在');
          return;
        } else if (this.newLink && this.newDesc) {
          this.data.unshift([this.newDesc, this.newLink]);
          this.updateData();
        }
        this.resetStatus();
      },
    },

    template: getTemplate(),
  };
  return component;
};

module.exports = links;
