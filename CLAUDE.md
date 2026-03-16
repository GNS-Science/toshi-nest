# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`toshi-nest` (`@gns-science/toshi-nest`) is a React component library published to GitHub's NPM registry, providing shared UI components for GNS Science projects (primarily Kororaa and TUI apps). It outputs both CJS and ESM bundles via Rollup.

## Commands

```bash
yarn build           # Build the library (Rollup, outputs CJS + ESM)
yarn build-watch     # Build in watch mode
yarn test            # Run all tests (Jest)
yarn test:watch      # Run tests in watch mode
yarn lint            # ESLint with auto-fix
yarn storybook       # Start Storybook dev server on port 6006
yarn build-storybook # Build static Storybook
```

**Run a single test file:**
```bash
yarn test SelectControl.test.tsx
# or with pattern matching:
yarn test --testPathPattern=HazardChart
```

## Architecture

The library is organized around four main component categories:

- **Controls** (`src/controls/`) — `SelectControl`, `MultiSelect`, `RangeSliderWithInputs`, `ControlsBar`
- **Charts** (`src/hazardCharts/`, `src/spectralAccelChart/`, `src/groupCurveChart/`, `src/disaggregationChart/`, `src/mfdPlot/`) — Visx-based SVG charts, each with a `*Responsive` wrapper variant that uses Visx's `ParentSize`
- **Maps** (`src/LeafletMap/`, `src/leafletDrawer/`, `src/TimeDimensionLayer/`) — Leaflet + react-leaflet, with a custom `TimeDimensionLayer` for animated temporal data
- **Tables** (`src/faultModelTable/`) — MUI DataGrid-based table

Shared components live in `src/common/` (e.g., `AxisLabel`, `ControlsBar`, `PlotHeadings`). TypeScript types shared across components are in `src/types/`.

`src/index.ts` is the single export entry point — all public components must be re-exported from here.

Each component folder typically contains:
- `ComponentName.tsx` — main component
- `ComponentName.stories.tsx` — Storybook story
- `ComponentName.test.tsx` — Jest/RTL tests (not all components have tests)
- `ComponentName.types.ts` — component-specific types
- `index.ts` — re-export

## Key Dependencies & Pinned Versions

- **Charts**: Visx (`@visx/*`) — primary charting library; Plotly.js for `MfdPlot`
- **Maps**: `react-leaflet` pinned at **3.2.5** (TimeDimensionLayer breaks in 4.0.0+)
- **UI**: MUI v7 with `@mui/x-data-grid`
- **`ansi-styles`** pinned at 5.2.0 and **`strip-indent`** pinned at 3.0.0 (ESM compatibility)

## Testing Notes

Tests use Jest + React Testing Library with a jsdom environment. `src/setupTests.ts` sets up a `ResizeObserver` polyfill (needed for Visx/chart components) and `@testing-library/jest-dom` matchers. Tests are co-located with components.
