import React, { useState } from "react";
import { SelectControl, MultiSelect } from "../component-lib";
import { styled } from "@mui/material/styles";

const Home = () => {
  const HomeContainer = styled("div")({
    margin: 10,
    height: "80vh",
  });
  const [sampleSelection, setSampleSelection] = useState("1");
  const [sampleMultiSelection, setSampleMultiSelection] = useState(["1"]);
  return (
    <HomeContainer>
      <h4>Select Control Component</h4>
      <p>options: string[]</p>
      <p> setOptions: (selection: string) ={">"} void</p>
      <p> name: string</p>
      <SelectControl
        options={["1", "2", "3"]}
        setOptions={setSampleSelection}
        name={"select control demo"}
      />
      <p>Current selection: {sampleSelection}</p>
      <h4>MultiSelect Component</h4>
      <p> options: string[]</p>
      <p> selected: string[]</p>
      <p> setOptions: (selections: string[]) => void;</p>
      <p> name: string;</p>
      <MultiSelect
        options={["1", "2", "3"]}
        setOptions={setSampleMultiSelection}
        selected={sampleMultiSelection}
        name={"MultiSelect"}
      />
      <p>Current selection: {`[${sampleMultiSelection.join(", ")}]`}</p>
    </HomeContainer>
  );
};

export default Home;
