import React, { useState } from 'react';
import ObejctPath from 'object-path';
import FormInput from './FormInput';
import FormResult from './FormResult';
import Graph from '../Graph';
import { getVenueNearLondon } from '../../utils/api.utils';

const formStyle = {
  position: "absolute",
  left: 0,
  top: 0,
};

const inputStyle = {
  display: 'inline-block',
  fontSize: 16,
  padding: 5,
  margin: 30
};

const resultStyle = {
  display: 'block',
  fontSize: 14,
  marginTop: 5
};

const formInputName = {
  venueName: 'venueName',
  authToken: 'authToken'
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
      <form style={formStyle} onSubmit={onSubmit(input, setResults)}>
        <FormInput
          type='text'
          style={inputStyle}
          name={formInputName.authToken}
          placeholder='Auth token'
          onChange={onValueChange(input, setInput)}
        />
        <FormInput
          type='text'
          style={inputStyle}
          name={formInputName.venueName}
          placeholder='Venue name'
          onChange={onValueChange(input, setInput)}
        />
        <FormInput
          style={inputStyle}
          type='submit'
          value='Submit'
        />
      </form>
      <FormResult
        data={results}
        style={resultStyle}
        onClick={onVenueClick(setSeedNode)}
      />
      {
        seedNode && input.authToken ?
          <Graph
            seedNode={seedNode}
            apiAuthToken={input.authToken}
          />
          : null
      }
    </>
  );
}

export default Form;

