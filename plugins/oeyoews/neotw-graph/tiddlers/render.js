/*\
title: $:/plugins/oeyoews/neotw-graph/render.js
type: application/javascript
module-type: library

neotw-graph library

\*/
function renderNode(el, tiddlers) {
  const NODE_COUNT = tiddlers.length;
  const nodes = [];
  const links = []; // 不生成任何边

  const RANGE = NODE_COUNT * 1.0;

  // 改为球面分布
  const RADIUS = RANGE * 0.5;
  for (let i = 0; i < NODE_COUNT; i++) {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / NODE_COUNT);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const r = RADIUS * Math.cbrt(Math.random()); // 球体内均匀分布

    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);

    nodes.push({
      label: tiddlers[i],
      x,
      y,
      z,
      fx: x,
      fy: y,
      fz: z,
      __val: 6,
    });
  }

  const myGraph = window
    .ForceGraph3D()(el)
    .graphData({
      nodes,
      links,
    })
    .nodeLabel((node) => node.label)
    .nodeAutoColorBy('label')
    .nodeRelSize(1.5)
    .enableNodeDrag(false)
    .cooldownTicks(0)
    .width([900])
    .height(window.innerHeight * 0.7)
    .showNavInfo(false);

  let lastHoverNode = null;
  myGraph.onNodeHover((node) => {
    if (lastHoverNode) {
      lastHoverNode.__val = 3;
    }
    if (node) {
      node.__val = 6;
    }
    lastHoverNode = node;
    myGraph.nodeVal((n) => n.__val || 6);
  });
  myGraph.nodeVal((n) => n.__val);

  // 添加点击事件
  myGraph.onNodeClick((node) => {
    console.log(node);
    new $tw.Story().navigateTiddler(node.label);
  });
}

module.exports = renderNode;
