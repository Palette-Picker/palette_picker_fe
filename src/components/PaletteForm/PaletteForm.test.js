import React from 'react';
import { shallow } from 'enzyme';
import PaletteForm from './PaletteForm';

describe('PaletteForm', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <PaletteForm 
        
      />)
  });

  it('should match the snapshot', () => {
    // expect(wrapper).toMatchSnapshot();
  });


});