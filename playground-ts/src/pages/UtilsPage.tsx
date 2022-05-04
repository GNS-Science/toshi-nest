import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { SelectControl, MultiSelect, ControlsBar } from '../component-lib';

const UtilsPage: React.FC = () => {
  const HomeContainer = styled('div')({
    margin: 10,
    height: '80vh',
  });

  const [sampleSelection, setSampleSelection] = useState<string>('1');
  const [sampleMultiSelect, setSampleMultiSelect] = useState<string[]>(['1']);
  return (
    <HomeContainer>
      <h4>Select Control Component</h4>
      <p>Current selection: {sampleSelection}</p>
      <SelectControl options={['1', '2', '3']} selection={sampleSelection} setSelection={setSampleSelection} name={'select control demo'} />
      <h4>MultiSelect Component</h4>
      <p>Current selection: {sampleMultiSelect.map((item) => `${item}, `)}</p>
      <MultiSelect options={['1', '2', '3']} selection={sampleMultiSelect} setSelection={setSampleMultiSelect} name={'multiSelect demo'} />
      <h4>Controls Bar</h4>
      <p>Flex display children with margin and centered vertically</p>
      <ControlsBar>
        <SelectControl options={['1', '2', '3']} selection={sampleSelection} setSelection={setSampleSelection} name={'select control demo'} />
        <SelectControl options={['1', '2', '3']} selection={sampleSelection} setSelection={setSampleSelection} name={'select control demo'} />
        <MultiSelect options={['1', '2', '3']} selection={sampleMultiSelect} setSelection={setSampleMultiSelect} name={'multiSelect demo'} />
        <MultiSelect options={['1', '2', '3']} selection={sampleMultiSelect} setSelection={setSampleMultiSelect} name={'multiSelect demo'} />
      </ControlsBar>
    </HomeContainer>
  );
};

export default UtilsPage;
