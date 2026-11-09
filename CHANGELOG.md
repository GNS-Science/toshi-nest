# Changelog

## [4.1.5] - 2026-11-10

### Changed
- deps: major: @visx/* 3→4, eslint 9→10, plotly.js 3→4, react-plotly.js 2→4, three 0.185.1→0.186.1; transitive: minimatch 9/10→11.0.3, glob 10/11/13→14.0.3, webpack-dev-middleware 6→8.6.0
- deps: minor (23 direct pkgs incl. storybook 10.6.5, MUI 9.5, react 19.3.1; 11 transitive incl. ws, zod, browserslist, js-yaml, brace-expansion, serialize-javascript)
- deps: patch (10 direct pkgs; 7 transitive incl. handlebars, postcss, tar, fast-uri, nanoid); storybook's nested webpack 5.103.0→5.112.2
- eslint config: set `settings.react.version` explicitly (eslint-plugin-react version detection is incompatible with ESLint 10)

## [4.1.4] - 2026-08-27

### Changed
- upgraded dev dependencies

### Fixed
- Changed leaflet default basemap to OpenStreetMap

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
