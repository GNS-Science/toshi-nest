import React from "react";
import { styled } from "@mui/material/styles";

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

interface ControlsBarProps {
  children: React.ReactNode;
}
const ControlsBar: React.FC<ControlsBarProps> = ({
  children,
}: ControlsBarProps) => {
  const childrenWithMargin = React.Children.map(children, (child) => {
    return <Control>{child}</Control>;
  });
  return <ControlsContainer>{childrenWithMargin}</ControlsContainer>;
};

export default ControlsBar;
