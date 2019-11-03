import React from 'react';
import * as d3 from 'd3';

const drag = (simulation) => {
  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  
  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }
  
  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

return d3.drag()
  .on("start", dragstarted)
  .on("drag", dragged)
  .on("end", dragended);
}

const Graph = (props) => {
  const width = 680;
  const height = 340;

  var nodes = [
    {"id": "Alice", "name": "Alice"},
    {"id": "Bob", "name": "Bob"},
    {"id": "Carol", "name": "Carol"}
  ];
  
  var links = [
    {"source": "Alice", "target": "Bob"},
    {"source": "Bob", "target": "Carol"},
    {"source": "Carol", "target": "Alice"}
  ];

  const svg = d3.select('body')
    .append('svg')
    .attr("style", "position: absolute; background: red; top: 30px; left: 500px;")
    .attr('width', width)
    .attr('height', height);

  const simulation = d3.forceSimulation(nodes).force('center', d3.forceCenter(width / 2, height / 2));
  

  // Draw link line.
  const link = svg.append("g")
    .attr("stroke", "#000")
    .attr("stroke-opacity", 1)
    .selectAll("line")
    .data(links)
    .join("line");

  const node = svg.append("g")
    .attr("stroke", "#fff")
    .attr("stroke-width", 1.5)
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("r", 5)
    .attr("fill", '00F');

  simulation.on('tick', () => {
    link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);
    node
      .attr("cx", d => (d.x))
      .attr("cy", d => (d.y));
  })
  
  const restart = () => {
    console.log(nodes);
    console.log(links);
    simulation.nodes(nodes);
    simulation.force('link', d3.forceLink(links).id(d => d.id).distance(200));
    
    simulation.restart();
  };

  // Most important - Cannot redraw if no restart.
  setTimeout(() => {
    restart()
  }, 0);
  return null;
};

export default Graph;