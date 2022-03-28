import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

const SelectControlContainer = styled("div")({
  minWidth: 200,
  maxWidth: 300,
});

interface SelectControlProps {
  options: string[];
  setOptions: (selection: string) => void;
  name: string;
}

const SelectControl: React.FC<SelectControlProps> = ({
  options,
  setOptions,
  name,
}: SelectControlProps) => {
  const [selectedItems, setSelectedItems] = useState<string>(options[0] ?? "");

  const handleChange = (event: SelectChangeEvent<string>) => {
    const value = (event.target.value as string) || "";
    setSelectedItems(value);
    setOptions(value);
  };

  return (
    <SelectControlContainer>
      <FormControl variant="standard" fullWidth>
        <InputLabel>{name}</InputLabel>
        <Select
          labelId={`report-hash-label`}
          label={name}
          name={name}
          value={selectedItems}
          onChange={handleChange}
          input={<Input />}
          variant="standard"
        >
          {options.map((opt) => (
            <MenuItem key={opt} value={opt}>
              {opt}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </SelectControlContainer>
  );
};

export default SelectControl;
