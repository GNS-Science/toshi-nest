import React, { useState } from 'react';
import { SelectControl } from '../component-lib';
import { styled } from '@mui/material/styles';

const UtilsPage = () => {
  const HomeContainer = styled('div')({
    margin: 10,
    height: '80vh',
  });
  const [sampleSelection, setSampleSelection] = useState('1');
  return (
    <HomeContainer>
      <h4>Select Control Component</h4>
      <p>options: string[]</p>
      <p>selection: string</p>
      <p>setSelection: (selection: string) ={'>'} void</p>
      <p>name: string</p>
      <SelectControl options={['1', '2', '3']} selection={sampleSelection} setSelection={setSampleSelection} name={'select control demo'} />
      <p>Current selection: {sampleSelection}</p>
    </HomeContainer>
  );
};

export default UtilsPage;
