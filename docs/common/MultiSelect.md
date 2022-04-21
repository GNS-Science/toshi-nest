[Home](../../README.md)

### MultiSelect

The `<MultiSelect/>` component allows multiple selections from a list of options.

![Screen Shot 2022-03-31 at 10 54 43 AM](https://user-images.githubusercontent.com/78287649/160937855-e908348d-a715-4238-b3d7-6cd0c63db948.png)

```import React, { useState } from "react";
import { MultiSelect } from "@gns-science/toshi-nest";

const MultiSelectExample = () => {
  const options = ["1", "2", "3"];

  const [selection, setSelection] = useState(options[0]);

  return (
    <MultiSelect
      selected={selection}
      options={options}
      setOptions={setSelection}
      name={"MultiSelect"}
    />
  )
};
```

**props**
| Prop |Type |
| ----------- | ----------- |
| options | string[]; |
| selected | string[]; |
| setOptions | (selections: string[]) => void |
| name | string |
