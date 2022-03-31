import {
  Checkbox,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";

const MultiSelectContainer = styled("div")({
  margin: 10,
  minWidth: 200,
  maxWidth: 300,
});

interface MultiSelectProps {
  options: string[];
  selected: string[];
  setOptions: (selections: string[]) => void;
  name: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selected,
  setOptions,
  name,
}: MultiSelectProps) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    if (selected.length) setSelectedItems(selected);
  }, [selected]);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    setSelectedItems(event.target.value as string[]);
    setOptions(event.target.value as string[]);
  };

  return (
    <MultiSelectContainer>
      <FormControl variant="standard" fullWidth>
        <InputLabel>{name}</InputLabel>
        <Select
          name={name}
          value={selectedItems}
          multiple
          onChange={handleChange}
          input={<Input />}
          renderValue={(selected) => {
            const selectedArray = selected as string[];
            if (selectedArray.length === 1) return selectedItems[0];
            if (selectedArray.length > 1) return "Multiple selected";
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
    </MultiSelectContainer>
  );
};

export default MultiSelect;
