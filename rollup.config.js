import typescript from "rollup-plugin-typescript2";
import del from "rollup-plugin-delete";
import pkg from "./package.json";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "documentation/src/component-lib/index.js",
        format: "esm",
        banner: "/* eslint-disable */",
      },
      {
        file: pkg.main,
        format: "cjs",
      },
      {
        file: pkg.module,
        format: "esm",
      },
    ],
    plugins: [
      del({ targets: ["dist/*", "documentation/src/component-lib"] }),
      typescript(),
    ],
    external: Object.keys(pkg.peerDependencies || {}),
  },
];
