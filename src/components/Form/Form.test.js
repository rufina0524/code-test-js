import React from 'react';
import Form from './Form';
import renderer from 'react-test-renderer';

describe('FormInput', () => {
    it('should match snapshot', () => {
        const comp = renderer.create(<Form/>).toJSON();
        expect(comp).toMatchSnapshot();
    });
});