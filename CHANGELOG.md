# Changelog

## [Unreleased]

### Changed
- deps (devDependencies only): patch (11 pkgs), minor (16 pkgs), major: @babel/core+preset-env+preset-react+preset-typescript 7→8, @testing-library/jest-dom 6→7, @visx/mock-data 3→4, lint-staged 16→17, three 0.184→0.185
- deps skipped: eslint 10 (eslint-plugin-react incompatible), typescript 7 (rollup-plugin-typescript2 + typescript-eslint incompatible), @babel/core + presets 8 (storybook's babel-loader requires babel 7)

### Fixed
- storybook build: @visx/mock-data v4 import paths, type-only import of `TimeDimensionLayerState`, and switched `reactDocgen` to `react-docgen-typescript` (babel-based react-docgen failed on call-site generics in GroupCurveChart)

## [4.1.3] - 2026-05-04

### Changed
- upgraded dependencies.major: @chromatic-com/storybook 4→5, @eslint/js 9→10, @mui/icons-material+material 7→9, @mui/x-data-grid 8→9, three 0.181.2→0.184.0, typescript 5→6, cross-spawn 4→6 (transitive), serialize-javascript 6→7.0.5 (transitive)


## [4.1.2] - 2026-04-01

## Changed
 - Optional scientific notation on y-axis tick labels for GroupCurveChart
 - Space y-axis label to reduce crowding for GroupCurveChart

## [4.1.1] - 2026-03-17

### Changed
 - GroupCurveChart: format axis ticks as plain numbers to avoid scientific notation
 - GroupCurveChart: default number of x-axis ticks depends on axis type (log or linear)

## [0.4.1] - 2025-12-01

### Changed
 - moved some prod dependencies to dev dependencies
 - removed unused dependencies

## [0.4.0] - 2025-11-25

### Changed
 - Major version upgrade for several dependencies, for example
    - react 17 -> 19
    - mui material 5 -> 7
    - plotly 2 -> 3
    - visx 2 -> 3
    - storybook 6 -> 10
 - The fullscreen button on leaflet maps is now disabled by default
