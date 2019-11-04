import React, { useCallback, useState } from 'react';
import FormInput from './FormInput';
import FormResult from './FormResult';
import { getVenueNearLondon } from '../../utils/api.utils';

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

const Form = (props) => {
  const [ results, setResults ] = useState([]);
  const [ input, setInput] = useState({});

  return (
    <>
      <form onSubmit={useSubmit(input, setResults)}>
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
      <FormResult data={results}/>
    </>
  );
}

export default Form;

