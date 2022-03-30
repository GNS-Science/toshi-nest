import { Checkbox, FormControl, Input, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';

const PREFIX = 'MultiSelect';

const classes = {
  formControl: `${PREFIX}-formControl`,
};

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.formControl}`]: {
    margin: theme.spacing(2),
    minWidth: 200,
    maxWidth: 300,
  },
}));

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 500,
    },
  },
};
interface MultiSelectProps {
  options: string[];
  selected: string[];
  setOptions: (selections: string[]) => void;
  name: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ options, selected, setOptions, name }: MultiSelectProps) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    if (selected.length) setSelectedItems(selected);
  }, [selected]);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    setSelectedItems(event.target.value as string[]);
    setOptions(event.target.value as string[]);
  };

  return (
    <Root>
      <FormControl className={classes.formControl} variant="standard">
        <InputLabel>{name}</InputLabel>
        <Select
          name={name}
          value={selectedItems}
          multiple
          onChange={handleChange}
          input={<Input />}
          MenuProps={MenuProps}
          renderValue={(selected) => {
            const selectedArray = selected as string[];
            if (selectedArray.length === 1) {
              return selectedItems[0];
            }
            if (selectedArray.length > 1) return 'Multiple selected';
          }}
          variant="standard"
        >
          {options.map((opt) => (
            <MenuItem key={opt} value={opt}>
              <Checkbox checked={selectedItems.indexOf(opt) > -1} />
              {opt}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Root>
  );
};

export default MultiSelect;