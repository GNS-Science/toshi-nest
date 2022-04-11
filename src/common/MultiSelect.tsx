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
  selection: string[];
  setSelection: (selections: string[]) => void;
  name: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selection,
  setSelection,
  name,
}: MultiSelectProps) => {

  useEffect(() => {
    if (selection.length) setSelection(selection);
  }, [selection]);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    setSelection(event.target.value as string[]);
  };

  return (
    <MultiSelectContainer>
      <FormControl variant="standard" fullWidth>
        <InputLabel>{name}</InputLabel>
        <Select
          name={name}
          value={selection}
          multiple
          onChange={handleChange}
          input={<Input />}
          renderValue={(selected) => {
            const selectedArray = selected as string[];
            if (selectedArray.length === 1) return selection[0];
            if (selectedArray.length > 1) return "Multiple selected";
          }}
          variant="standard"
        >
          {options.map((opt) => (
            <MenuItem key={opt} value={opt}>
              <Checkbox checked={selection.indexOf(opt) > -1} />
              {opt}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </MultiSelectContainer>
  );
};

export default MultiSelect;
