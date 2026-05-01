# Changelog

## [Unreleased]

### Changed
- deps: patch (14 direct, 12 transitive); skipped: whatwg-encoding (no 3.1.2), inflight (no 1.0.7), querystring (no 0.2.2), rimraf (no 3.0.3 in 3.x), glob (11.1.1 not published → 11.1.0), minimatch (10.2.3 breaks test-exclude)
- deps: minor (15 direct, 5 transitive + storybook/webpack/three suite); skipped: minimatch (breaks test-exclude)
- deps: major: @chromatic-com/storybook 4→5, @eslint/js 9→10, @mui/icons-material+material 7→9, @mui/x-data-grid 8→9, three 0.181.2→0.184.0, typescript 5→6, cross-spawn 4→6 (transitive), serialize-javascript 6→7.0.5 (transitive); skipped: eslint 10 (eslint-plugin-react incompatible), react-leaflet 5 (ESM-only breaks Jest)
- deps: patch (1 transitive: tar 7.5.7→7.5.13); minor (1 transitive: lodash 4.17.23→4.18.1); major: rimraf 3.0.2→6.1.3 (transitive), glob 11.1.0→13.0.6 (transitive); skipped: react-leaflet 5 (ESM-only breaks Jest), eslint 10 (pending confirmation)

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
