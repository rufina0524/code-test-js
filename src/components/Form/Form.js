import React, { useState } from 'react';
import ObejctPath from 'object-path';
import FormInput from './FormInput';
import FormResult from './FormResult';
import Graph from '../Graph';
import { getVenueNearLondon } from '../../utils/api.utils';

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

const onVenueClick = (setSeedNode) => (
  (event) => {
    if (ObejctPath(event, 'target.id', '')) {
      setSeedNode({ id: event.target.id, group: 1 });
    }
  }
);

const Form = () => {
  const [ results, setResults ] = useState([]);
  const [ input, setInput] = useState({});
  const [ seedNode, setSeedNode ] = useState(null);

  return (
    <>
      <h1 style={{position: "fixed", top: 0, left: 0, background: "blue"}}>{ seedNode && seedNode.id }</h1>
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
        onClick={onVenueClick(setSeedNode)}
      />
      {
        seedNode ?
          <Graph
            seedNode={seedNode}
          />
          : null
      }
    </>
  );
}

export default Form;

