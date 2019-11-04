import React from 'react';
import * as d3 from 'd3';
import { getSimilarVenue } from '../utils/api.utils';

const getChildNodes = async (seedId, nodes, setNodes, links, setLinks) => {
  const data = await getSimilarVenue({
    venueId: seedId
  });

  setNodes(nodes.concat(data.similarVenues.items));
  
  const newLinks = data.similarVenues.items.map(item => ({
    source: seedId, target: item.id
  }));

  setLinks(links.concat(newLinks));
};

const Graph = (props) => {
  const width = 680;
  const height = 340;
  const { seedNode } = props;
  const [ nodes, setNodes ] = React.useState([seedNode]);
  const [ links, setLinks ] = React.useState([]);

  React.useEffect(() => {
    getChildNodes(
      seedNode.id, nodes, setNodes,
      links, setLinks
    );
  }, []);

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
    simulation.nodes(nodes);
    simulation.force('link',
      d3.forceLink(links).id(d => d.id).distance(100)
    );
    
    simulation.restart();
  };

  // Most important - Cannot redraw if no restart.
  setTimeout(() => {
    restart()
  }, 0);
  return null;
};

export default Graph;