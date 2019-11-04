import React, { useCallback, useState } from 'react';
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

const useSubmit = (input, setResults) => (
  useCallback(async (event) => {
    event.preventDefault();
    
    const data = await getVenueNearLondon(input);
    setResults(data.venues);
  }, [input])
);

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

const useVenueClick = (input, setSeedNode) => (
  useCallback(async (event) => {
    setSeedNode({ id: event.target.id });
  }, [input])
);

const Form = () => {
  const [ results, setResults ] = useState([]);
  const [ input, setInput] = useState({});
  const [ seedNode, setSeedNode ] = useState(null);

  return (
    <>
      <form style={formStyle} onSubmit={useSubmit(input, setResults)}>
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
        onClick={useVenueClick(input, setSeedNode)}
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

