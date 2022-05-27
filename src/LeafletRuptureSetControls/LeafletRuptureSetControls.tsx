import React, { useState } from 'react';
import { Card, Slider, Select, InputLabel, FormControl } from '@mui/material';
import SelectControl from '../common/SelectControl';

const LeafletRuptureSetControls: React.FC = () => {
  const [sampleSelection, setSampleSelection] = useState('Wellington');

  return (
    <Card>
      <SelectControl options={['Wellington', 'Auckland', 'Christchurch']} selection={sampleSelection} setSelection={setSampleSelection} name={'Cities'} />
    </Card>
  );
};

export default LeafletRuptureSetControls;
