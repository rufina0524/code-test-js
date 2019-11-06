import React, { useCallback, useState } from 'react';
import FormInput from './FormInput';
import FormResult from './FormResult';
import Graph from '../Graph';
import { getVenueNearLondon, getSimilarVenue } from '../../utils/api.utils';

let allNodes = [];
let allLinks = [];
let timeout = null;

const formStyle = {
  position: "absolute",
  left: 0
};

const formInputName = {
  clientId: 'clientId',
  clientSecret: 'clientSecret',
  venueName: 'venueName'
};

const onValueChange = (input, setInput) => (
  (event) => {
    const { target: { value = '', name = '' } } = event;
    
    if (name) {
      setInput({
        ...input,
        [name]: value
      });
    }
  }
);

const onSubmit = (input, setResults) => (
  
  async (event) => {
    event.preventDefault();
    
    const data = await getVenueNearLondon(input);
    setResults(data.venues);
  }
);

const test = async (seed, nodes, setNodes, links, setLinks) => {
  if (allNodes.length === 0) {
    allNodes.push([{ id: seed.id, group: seed.group }]);
  }

  const data = await getSimilarVenue({
    venueId: seed.id
  });

  const newNodes = data.similarVenues.items.map(item =>({
    id: item.id,
    group: seed.group
  }));

  const newLinks = data.similarVenues.items.map(item => ({
    source: seed.id, target: item.id
  }));

  timeout = setTimeout(() => {
    console.log('--- new node 0: ', newNodes[0])
    // newNodes.forEach((item => {
    //   test(item.id, [{ id: item.id }], setNodes, [], setLinks);
    // }))
    test({
      ...newNodes[0],
      group: allNodes.length + 1
    }, [{ id: newNodes[0].id, group: newNodes[0].group }], setNodes, [], setLinks);
  }, 10000);

  allNodes.push(newNodes);
  allLinks.push(newLinks);
  setNodes(allNodes.length);
  // setNodes(newNodes)
  // setLinks(newLInks)
};

const Form = () => {
  const [ results, setResults ] = useState([]);
  const [ input, setInput] = useState({});
  const [ seedNode, setSeedNode ] = useState(null);
  const [ nodes, setNodes ] = useState([]);
  const [ links, setLinks ] = useState([]);

  React.useEffect(() => {
  }, [nodes]);

  const onVenueClick = (event) => {
    setSeedNode({ id: event.target.id, group: 1 });
    test({
      id: event.target.id,
      group: allNodes.length
    }, [{ id: event.target.id, group: allNodes.length }], setNodes, [], setLinks)
  };

  return (
    <>
      <h1 style={{position: "fixed", top: 0, left: 0, background: "blue"}}>{ allNodes.length }</h1>
      <form style={formStyle} onSubmit={onSubmit(input, setResults)}>
        <FormInput
          type='text'
          name={formInputName.clientId}
          placeholder='Client ID'
          onChange={onValueChange(input, setInput)}
        />
        <FormInput
          type='text'
          name={formInputName.clientSecret}
          placeholder='Client Secret'
          onChange={onValueChange(input, setInput)}
        />
        <FormInput
          type='text'
          name={formInputName.venueName}
          placeholder='Venue name'
          onChange={onValueChange(input, setInput)}
        />
        <FormInput
          type='submit'
          value='Submit'
        />
      </form>
      <FormResult
        data={results}
        onClick={onVenueClick}
      />
      {
        seedNode ?
          <Graph
            seedNode={seedNode}
            nodes={allNodes}
            links={allLinks}
            text={allNodes.length}
          />
          : null
      }
    </>
  );
}

export default Form;

