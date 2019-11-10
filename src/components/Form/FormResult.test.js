import React from 'react';
import FormResult from './FormResult';
import renderer from 'react-test-renderer';

const mockData = [
    { id: 'mock-1' },
    { id: 'mock-2' }
];

describe('FormResult', () => {
    it('should match snapshot', () => {
    const comp = renderer
        .create(
          <FormResult
            data={mockData}
            style={{}}
            onClick={jest.fn()}
          />
        )
        .toJSON();
      expect(comp).toMatchSnapshot();
    });
});