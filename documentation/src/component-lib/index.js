/* eslint-disable */
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { FormControl, InputLabel, Select, Input, MenuItem } from '@mui/material';

const Control = styled("span")({
    margin: 10,
    width: "auto",
});
const ControlsContainer = styled("div")({
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    flexDirect: "colum",
});
const ControlsBar = ({ children, }) => {
    const childrenWithMargin = React.Children.map(children, (child) => {
        return React.createElement(Control, null, child);
    });
    return React.createElement(ControlsContainer, null, childrenWithMargin);
};

const SelectControlContainer = styled("div")({
    minWidth: 200,
    maxWidth: 300,
});
const SelectControl = ({ options, setOptions, name, }) => {
    var _a;
    const [selectedItems, setSelectedItems] = useState((_a = options[0]) !== null && _a !== void 0 ? _a : "");
    const handleChange = (event) => {
        const value = event.target.value || "";
        setSelectedItems(value);
        setOptions(value);
    };
    return (React.createElement(SelectControlContainer, null,
        React.createElement(FormControl, { variant: "standard", fullWidth: true },
            React.createElement(InputLabel, null, name),
            React.createElement(Select, { labelId: `report-hash-label`, label: name, name: name, value: selectedItems, onChange: handleChange, input: React.createElement(Input, null), variant: "standard" }, options.map((opt) => (React.createElement(MenuItem, { key: opt, value: opt }, opt)))))));
};

export { ControlsBar, SelectControl };
