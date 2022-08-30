/* Written by Gk0Wk(https://github.com/Gk0Wk) */
const getFilterByDate = (date, subfilter) => {
  return `[all[tiddlers]${subfilter}sameday:created[${date}]][all[tiddlers]${subfilter}sameday:modified[${date}]]+[sort[]]`;
};
const yearDates = {};
const getData = (year, subfilter) => {
  if (!yearDates[year]) {
    const startDate = +echarts.number.parseDate(`${year}-01-01`);
    const endDate = +echarts.number.parseDate(`${year + 1}-01-01`);
    const dayTime = 3600 * 24 * 1000;
    const dates = [];
    for (let time = startDate; time < endDate; time += dayTime) {
      const timeFmt = echarts.format.formatTime("yyyy-MM-dd", time);
      const timeTW = timeFmt.replace(/-/g, "");
      dates.push([timeFmt, timeTW]);
    }
    yearDates[year] = dates;
  }
  let total = 0;
  return [
    yearDates[year].map(([timeFmt, timeTW]) => {
      const count = $tw.wiki.filterTiddlers(getFilterByDate(timeTW, subfilter)).length;
      total += count;
      return [timeFmt, count];
    }),
    total,
  ];
};

const getPlatteColor = (name) =>
  $tw.wiki.renderText(
    "text/plain",
    "text/vnd.tiddlywiki",
    `<$transclude tiddler={{$:/palette}} index="${name}"><$transclude tiddler="$:/palettes/Vanilla" index="${name}"><$transclude tiddler="$:/config/DefaultColourMappings/${name}"/></$transclude></$transclude>`,
    {}
  );

const checkIfChinese = () =>
  $tw.wiki.getTiddlerText("$:/language").indexOf("zh") !== -1;

const checkIfDarkMode = () =>
  $tw.wiki.getTiddler($tw.wiki.getTiddlerText("$:/palette")).fields[
    "color-scheme"
  ] === "dark";

exports.onMount = () => {
  return {};
};

exports.shouldUpdate = (_, changedTiddlers) => {
  return $tw.utils.count(changedTiddlers) > 0;
};

const tooltipFormatter = (subfilter) => ({ value }) => {
    const [dateValue, count] = value;
    if (count === 0)
      return checkIfChinese()
        ? `${echarts.format.formatTime("yyyy年M月d日", dateValue)} 无条目。`
        : `${$tw.utils.formatDateString(
            $tw.utils.parseDate(dateValue.replace(/-/g, "")),
            "MMM DDD, YYYY"
          )} no tiddler.`;
    const p = document.createElement("p");
    p.innerText = checkIfChinese()
      ? `${echarts.format.formatTime(
          "yyyy年M月d日",
          dateValue
        )} 共有 ${count} 篇:`
      : `${$tw.utils.formatDateString(
          $tw.utils.parseDate(dateValue.replace(/-/g, "")),
          "MMM DDD, YYYY"
        )} ${count} tiddler${count > 1 ? "s" : ""}.`;
    const ul = document.createElement("ul");
    const tiddlers = $tw.wiki.filterTiddlers(
      getFilterByDate(dateValue.replace(/-/g, ""), subfilter)
    );
    const len = tiddlers.length;
    for (let i = 0; i < len; i++) {
      const tiddler = tiddlers[i];
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.innerText = tiddler;
      a.className =
        "tc-tiddlylink tc-tiddlylink-resolves tc-popup-handle tc-popup-absolute";
      a.style.cursor = "pointer";
      a.onclick = () => new $tw.Story().navigateTiddler(tiddler);
      li.appendChild(a);
      ul.appendChild(li);
    }
    return [p, ul];
  };

exports.onUpdate = (myChart, _state, addonAttributes) => {
  const year = parseInt(addonAttributes.year, 10) || new Date().getFullYear();
  const subfilter = addonAttributes.subfilter || '!is[shadow]!prefix[$:/]';
  const [data, total] = getData(year, subfilter);
  myChart.setOption({
    title: {
      top: 0,
      left: "center",
      text: checkIfChinese()
        ? `今年产出 ${total} 篇文章`
        : `Produced ${total} tiddlers this year`,
    },
    tooltip: {
      position: "top",
      formatter: tooltipFormatter(subfilter),
      triggerOn: "mousemove|click",
      enterable: true,
      hideDelay: 400,
      backgroundColor: getPlatteColor("page-background"),
      borderColor: getPlatteColor("very-muted-foreground"),
    },
    visualMap: {
      type: "piecewise",
      orient: "horizontal",
      calculable: true,
      showLabel: false,
      right: 0,
      top: 175,
      pieces: [
        // 设置分段范围
        { lte: 0, color: checkIfDarkMode() ? "#161B22" : "#EBEDF0" },
        { gt: 0, lte: 3, color: "#0E4429" },
        { gt: 3, lte: 7, color: "#006D32" },
        { gt: 7, lte: 15, color: "#26A641" },
        { gt: 15, color: "#39D353" },
      ],
    },
    calendar: {
      top: 60,
      cellSize: 15,
      orient: "horizontal",
      range: year,
      itemStyle: {
        borderWidth: 3,
        borderCap: "round",
        borderJoin: "round",
        borderColor: getPlatteColor("background"),
      },
      splitLine: {
        show: false,
      },
      dayLabel: {
        show: true,
        nameMap: checkIfChinese() ? "ZH" : "EN",
      },
      monthLabel: {
        show: true,
        nameMap: checkIfChinese() ? "ZH" : "EN",
      },
      yearLabel: { show: true },
    },
    series: {
      type: "heatmap",
      coordinateSystem: "calendar",
      calendarIndex: 0,
      data: data,
    },
  });
};