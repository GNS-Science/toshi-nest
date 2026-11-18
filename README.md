# toshi-nest

The toshi-nest is for fledgling work e.g. reusable Node components to share across Kororaa and other projects

### How to add the package to your project

```bash
yarn add @gns-science/toshi-nest
```

The package is published publicly on [npmjs](https://www.npmjs.com/package/@gns-science/toshi-nest); no login or `.npmrc` setup needed.

### Component Documentation

[SelectControl](./docs/common/SelectControl.md)  
[MultiSelect](./docs/common/MultiSelect.md)  
[ControlsBar](./docs/common/ControlsBar.md)  
[HazardCurves](./docs/charts/HazardCurves.md)

## Development

This project uses `yarn` 4. See [yarn installation instructions](https://yarnpkg.com/getting-started/install)

Run `yarn storybook` to see all components in action.

In order to test this library in a web app, call `yarn pack` to create a `package.tgz` file, and then refer to that file in the `package.json` file of your project:

```
  "dependencies": {
    "@gns-science/toshi-nest": "/Code/toshi-nest/package.tgz",
    ....
  }
```

### Dependencies

After upgrading dependencies, run

```bash
yarn build
yarn test
yarn storybook
```

In `storybook`, verify that each component works. For `leaflet` maps, verify that the time control and the fullscreen control works.

Also check for security issues:

```bash
yarn npm audit --recursive
```

For upgrading `storybook`, follow [these instructions](https://storybook.js.org/docs/releases/upgrading) and do not skip major versions during an upgrade.

- `react-leaflet` is pinned to `3.2.5` because the TimeDimensionLayer breaks from version `4.0.0` on.
- `ansi-styles` and `strip-indent` are pinned at pre-ESM versions as these don't seem to work in our setup, even if mentioned in `transformIgnorePatterns`. This might be because some of our (transitive) dependencies expect the ESM version and some expect the CJS version of these libraries. It might be worth looking into this https://thedrlambda.medium.com/nodejs-typescript-and-the-infuriating-esm-errors-828b77e7ecd3 when we have the time.

