import React from 'react';
import * as d3 from 'd3';
import { getSimilarVenue } from '../utils/api.utils';
import ObjectPath from 'object-path';

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

const getNewVenues = async (seed) => {
  const data = await getSimilarVenue({
    venueId: seed.id
  });

  return ObjectPath.get(data, 'similarVenues.items', []);
};
const Graph = (props) => {
  const width = 1280;
  const height = 720;
  const updateInterval = 3000;
  const { seedNode } = props;
  let nodes = [seedNode];
  let links = [];
  let newNodes = [seedNode];
  let newLinks = [];
  let i = 0;

  const svg = d3.select('#graphContainer')
    .attr("style", "position: absolute; background: black; top: 30px; left: 500px;")
    .attr('width', width)
    .attr('height', height);

  let link = getLink(svg);
  let node = getNode(svg);
  const nodeIds = [];

  const simulation = d3.forceSimulation(nodes)
    .force('center', d3.forceCenter(width / 3, height / 3));

  const restart = () => {

    link = link.data(links, (d) => (`${d.source.id}-${d.target.id}`));
    link.exit().remove();
    link = link.enter().append("line").merge(link);

    node = node.data(nodes, (d) => (d.id));
    node.exit().remove();
    node = node.enter().append("circle")
            .attr("fill", (d) => colorScale(d.group))
            .attr("r", 5).merge(node)
            .call(drag(simulation));

    simulation.nodes(nodes);
    simulation.force("charge",
      d3.forceManyBody().strength(-30)
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

  d3.timeout(() => {
    restart();
  }, 0);

  const d3Interval = d3.interval(() => {
    if (i > 1) {
      d3Interval.stop();
    }

    newNodes.forEach(async (item, index) => {
      const data = await getNewVenues(item);
    
      newNodes = [];
      data.forEach((child) => {
        if (nodeIds.indexOf(child.id) < 0) {
          newNodes.push({
            id: child.id,
            group: i + 1
          });
          nodeIds.push(child.id);
        }
      });
      newLinks = data.map(child => ({
        source: item.id, target: child.id
      }));

      nodes = nodes.concat(newNodes);
      links = links.concat(newLinks);  
    });
    i++;
    restart();
  }, updateInterval, d3.now());

  return null;
};

export default Graph;