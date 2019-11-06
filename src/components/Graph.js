import React from 'react';
import * as d3 from 'd3';
import { getVenueNearLondon, getSimilarVenue } from '../utils/api.utils';

const drag = simulation => {
  
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
};
const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
const getLink = (svg) => (
  svg.append("g")
  .attr("stroke", "#FFF")
  .attr("stroke-opacity", 1)
  .selectAll("line")
);
const getNode = (svg) => (
  svg.append("g")
  .attr("stroke", "#fff")
  .attr("stroke-width", 1.5)
  .selectAll("circle")
);

const Graph = (props) => {
  const width = 1280;
  const height = 720;
  const { nodes: allNodes = [], links: allLinks = [] } = props;
  const nodes = [].concat(...allNodes);
  const links = [].concat(...allLinks);

  const svg = d3.select('#graphContainer')
    .attr("style", "position: absolute; background: black; top: 30px; left: 500px;")
    .attr('width', width)
    .attr('height', height);

  if (allNodes.length > 1) {
    svg.selectAll('g').remove();
  }

  const simulation = d3.forceSimulation(nodes)
    .force('center', d3.forceCenter(width / 2, height / 2));

  let link = getLink(svg);
  let node = getNode(svg);  

  const restart = () => {
    node = node.data(nodes, (d) => (d.id));
    node.exit().remove();
    node = node.enter().append("circle")
            .attr("fill", (d) => colorScale(d.group))
            .attr("r", 5).merge(node)
            .call(drag(simulation));

    link = link.data(links, (d) => (`${d.source.id}-${d.target.id}`));
    link.exit().remove();
    link = link.enter().append("line").merge(link);

    simulation.nodes(nodes);
    simulation.force("charge",
      d3.forceManyBody().strength(-5)
    );
    simulation.force('link',
      d3.forceLink(links).id(d => d.id).distance(50)
    );
    
    simulation.restart();  
  };

  simulation.on('tick', () => {
    link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);
    node
      .attr("cx", d => (d.x))
      .attr("cy", d => (d.y))
      .attr("fx", 0.7);
  });

  React.useEffect(() => {
    restart();
  }, [nodes, links]);

  d3.timeout(() => {
    restart();
  }, 0);

  return <svg id='graphContainer'></svg>;
};

export default Graph;