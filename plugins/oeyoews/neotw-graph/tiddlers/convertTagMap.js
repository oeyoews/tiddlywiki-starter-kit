/*\
title: $:/plugins/oeyoews/neotw-graph/convertTagMap.js
type: application/javascript
module-type: library

neotw-graph widget

\*/
/**
 * Convert input object and tag list to ForceGraph data format
 * @param {Object} input - tag map: {source: [target1, target2]}
 * @param {string[]} tags - flat tag list for linear connection
 * @returns {{nodes: {id: string, x?: number, y?: number, z?: number}[], links: {source: string, target: string}[]}}
 */
function convertToForceGraphData(input, tags) {
  const nodesMap = new Map();
  const links = [];

  // 1. 均匀排列 tag 节点在圆周上
  const radius = 300;
  const angleStep = (2 * Math.PI) / tags.length;

  tags.forEach((tag, index) => {
    const angle = index * angleStep;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    const z = 0; // 你可以做球面排列：radius * Math.sin(angleY)
    nodesMap.set(tag, { id: tag, x, y, z });

    if (index < tags.length - 1) {
      links.push({
        source: tag,
        target: tags[index + 1],
        img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAvUlEQVR4nO3XsQnCMBBA0e9gBUdABWUgFYgFYgHYAHYgLkAF9oCmPQObXS73NzZ2Z6en6+Njtw4dSpwHxDAIxj0XwvRC5QHxDDI3t1zFhFQ/xXIcQDwqUQATVgXQ2sALehBYKrAG3oQWCrgBt6EFAq8AbsSVJ2WE9t6C1gZ2Rv9r7d2WFo17X7XB/2Mc6hvZixZDn0bLO8goYhDAAAAAElFTkSuQmCC',
      });
    }
  });

  // 2. 处理 input 节点关系
  for (const [source, targets] of Object.entries(input)) {
    if (!nodesMap.has(source)) nodesMap.set(source, { id: source });
    for (const target of targets) {
      if (!nodesMap.has(target)) nodesMap.set(target, { id: target });
      links.push({ source, target });
    }
  }

  return {
    nodes: Array.from(nodesMap.values()),
    links,
  };
}

module.exports = convertToForceGraphData;
