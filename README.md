# toshi-nest

The toshi-nest is for fledgling work e.g. reusable Node components to share across TUI and other projects

to run the component playground, run `yarn i-all`, and then `yarn run dev`

### How to add the package to your project

- generate a github access token with [these instructions](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- in your terminal, run `npm login --scope=@gns-science --registry=https://npm.pkg.github.com`, and then use your github credentials to log in.
- add a file in the root directory of your project called `.npmrc`.
- add this line to the file `@gns-science:registry=https://npm.pkg.github.com/`
- in your terminal, in your project directory, run `yarn add @gns-science/toshi-nest`

### Component Documentation

[SelectControl](./docs/common/SelectControl.md)  
[MultiSelect](./docs/common/MultiSelect.md)  
[ControlsBar](./docs/common/ControlsBar.md)  
[HazardCurves](./docs/charts/HazardCurves.md)

## Dependencies

After upgrading dependencies, run

```bash
yarn build
yarn test
yarn storybook
```

In storybook, verify that each major component type works:
- Bar charts
- Line charts
- 3D charts
- Maps
   - For leaflet maps, verify that the time control and the fullscreen control works.
- Menus

For upgrading storybook, follow [these instructions](https://storybook.js.org/docs/releases/upgrading) and do not skip major versions during an upgrade.

- `react-leaflet` is stuck at `3.2.5` because the TimeDimensionLayer breaks from version 4.0.0 on.
- `ansi-styles` and `strip-indent` arepinned at pre-ESM versions as these don't seem to work in our setup, even if mentioned in `transformIgnorePatterns`. This might be because some of our (transitive) dependencies expect the ESM version and some expect the CJS version. It might be worth looking into this https://thedrlambda.medium.com/nodejs-typescript-and-the-infuriating-esm-errors-828b77e7ecd3 when we have the time.

