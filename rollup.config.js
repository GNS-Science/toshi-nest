import typescript from 'rollup-plugin-typescript2';
import del from 'rollup-plugin-delete';
import css from 'rollup-plugin-css-only';
import pkg from './package.json' with {type: 'json'}

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'playground/src/component-lib/index.js',
        format: 'esm',
        banner: '/* eslint-disable */',
      },
      {
        file: 'playground-ts/src/component-lib/index.js',
        format: 'esm',
        banner: '/* eslint-disable */',
      },
      {
        file: pkg.main,
        format: 'cjs',
      },
      {
        file: pkg.module,
        format: 'esm',
      },
    ],
    plugins: [
      del({ targets: ['dist/*', 'playground/src/component-lib', 'playground-ts/src/component-lib'] }),
      typescript({
        tsconfigOverride: {
          exclude: ['**/__tests__', '**/*.test.ts', '*/setupTests.ts', '**/*.test.tsx', '**/*.stories.tsx', '**/*TestData.ts'],
        },
      }),
      css({ output: 'public/build/extra.css' }),
    ],
    external: [Object.keys(pkg.peerDependencies || {}), 'node_modules/leaflet/dist/leaflet.css', 'node_modules/leaflet-timedimension/src/leaflet.timedimension.control.css'],
  },
];
