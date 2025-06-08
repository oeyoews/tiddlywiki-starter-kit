/*\
title: $:/plugins/oeyoews/neotw-graph/render.js
type: application/javascript
module-type: library

neotw-graph library

\*/
function renderNode(el, tiddlers) {
  // const NODE_COUNT = tiddlers.length;
  // const nodes = [];
  // const links = []; // 不生成任何边

  // const RANGE = NODE_COUNT * 1.0;

  // // 改为球面分布
  // const RADIUS = RANGE * 0.5;
  // for (let i = 0; i < NODE_COUNT; i++) {
  //   const phi = Math.acos(1 - (2 * (i + 0.5)) / NODE_COUNT);
  //   const theta = Math.PI * (1 + Math.sqrt(5)) * i;
  //   const r = RADIUS * Math.cbrt(Math.random()); // 球体内均匀分布

  //   const x = r * Math.sin(phi) * Math.cos(theta);
  //   const y = r * Math.sin(phi) * Math.sin(theta);
  //   const z = r * Math.cos(phi);

  //   nodes.push({
  //     label: tiddlers[i],
  //     x,
  //     y,
  //     z,
  //     fx: x,
  //     fy: y,
  //     fz: z,
  //     __val: 6,
  //   });
  // }

  const Graph = window.ForceGraph3D()(el);
  // .nodeThreeObject(({ img }) => {
  //   const imgTexture = new THREE.TextureLoader().load(`./imgs/${img}`);
  //   imgTexture.colorSpace = THREE.SRGBColorSpace;
  //   const material = new THREE.SpriteMaterial({ map: imgTexture });
  //   const sprite = new THREE.Sprite(material);
  //   sprite.scale.set(12, 12);
  //   return sprite;
  // })
  Graph.graphData(tiddlers)
    .linkDirectionalArrowLength(3.5)
    .linkDirectionalArrowRelPos(1)
    .linkCurvature(0.25)
    .nodeLabel((node) => node.id)
    .nodeAutoColorBy('id')
    .nodeRelSize(1.5)
    .enableNodeDrag(false)
    .cooldownTicks(0)
    .width([900])
    .height(window.innerHeight * 0.7)
    .nodeThreeObject((node) => {
      if (node.img?.startsWith('data:image/')) {
        const texture = new Graph.THREE.TextureLoader().load(node.img);
        const material = new Graph.THREE.SpriteMaterial({ map: texture });
        const sprite = new Graph.THREE.Sprite(material);
        sprite.scale.set(30, 30, 1);
        return sprite;
      }

      // 默认球
      // const geometry = new Graph.THREE.SphereGeometry(6, 16, 16);
      const material = new Graph.THREE.MeshBasicMaterial({ color: '#00aaff' });
      return new Graph.THREE.Mesh('', material);
    })
    .showNavInfo(false);

  let lastHoverNode = null;
  Graph.onNodeHover((node) => {
    if (lastHoverNode) {
      lastHoverNode.__val = 3;
    }
    if (node) {
      node.__val = 6;
    }
    lastHoverNode = node;
    Graph.nodeVal((n) => n.__val || 6);
  });
  Graph.nodeVal((n) => n.__val);

  // 添加点击事件
  Graph.onNodeClick((node) => {
    // const distance = 40;
    // const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

    // const newPos =
    //   node.x || node.y || node.z
    //     ? {
    //         x: node.x * distRatio,
    //         y: node.y * distRatio,
    //         z: node.z * distRatio,
    //       }
    //     : { x: 0, y: 0, z: distance }; // special case if node is in (0,0,0)

    // myGraph.cameraPosition(
    //   newPos, // new position
    //   node, // lookAt ({ x, y, z })
    //   1000, // ms transition duration
    // );
    new $tw.Story().navigateTiddler(node.id);
  });
}

module.exports = renderNode;
