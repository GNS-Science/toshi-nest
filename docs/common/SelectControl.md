### SelectControl

The `<SelectControl/>` component allows users SINGLE SELECT from a list of options.

![Screenshot from 2022-03-29 11-52-29](https://user-images.githubusercontent.com/52944295/160500042-df3ecd44-8ec5-40a3-a5bd-345cc09cfb64.png)

```
import React, { useState } from "react";
import { SelectControl } from "@gns-science/toshi-nest";

const SelectControlExample = () => {
  const options = ["1", "2", "3"];

  const [selection, setSelection] = useState(options[0]);

  return (
    <SelectControl selection={selection} options={options} setSelection={setSelection} name={"select control demo}/>
  )
};
```

**props**
|Prop |type |
|--------------|-----------|
|selection |string |
|options |string[] |
|setSelection |(selection: string) => void |
|name |string|

---

[Home](../../README.md)
