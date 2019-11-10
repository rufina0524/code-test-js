import React from 'react';
import FormInput from './FormInput';
import renderer from 'react-test-renderer';

describe('FormInput', () => {
  it('should match snapshot', () => {
    const comp = renderer
      .create(
        <FormInput
          type='text'
          style={{}}
          name={name}
          placeholder='test'
          onChange={jest.fn()}
        />
      )
      .toJSON();
    expect(comp).toMatchSnapshot();
  });
});