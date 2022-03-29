import React from "react";
interface SelectControlProps {
    options: string[];
    setOptions: (selection: string) => void;
    name: string;
}
declare const SelectControl: React.FC<SelectControlProps>;
export default SelectControl;
