[Home](../../README.md)

### ControlsBar

The `<ControlsBar/>` component takes a list of children, displays them with flex with wrapping, and adds `margin: 10px` to each children.

![Screenshot from 2022-03-30 09-49-22](https://user-images.githubusercontent.com/52944295/160704626-72f83c9e-02af-4758-baf4-dae0788e1aca.png)

```
import React from "react";
import { ControlsBar } from "@gns-science/toshi-nest";

const ControlsBarDemo = () => {
  return (
   <ControlsBar>
     <Button1 />
     <Button2 />
   </ControlsBar>
  )
};
```
