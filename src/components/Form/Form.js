import React, { useState } from 'react';
import FormInput from './FormInput';
import FormResult from './FormResult';
import { getVenueNearLondon } from '../../utils/api.utils';

const Form = (props) => {
  const [ results, setResults ] = useState([]);

  const useSubmit = React.useCallback(async (event) => {
    const venueName = 'Satori';

    event.preventDefault();
    const data = await getVenueNearLondon(venueName);
    setResults(data.venues);
  }, []);

  return ([
    <FormInput
      onSubmit={useSubmit}
    />,
    <FormResult data={results}/>
  ]);
}

export default Form;

