/* eslint-disable */
import React from 'react';
import { styled } from '@mui/material/styles';

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

const Hello = () => {
    return React.createElement(React.Fragment, null, "Hello World");
};

export { ControlsBar, Hello };
