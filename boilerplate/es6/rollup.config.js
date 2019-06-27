import babel from 'rollup-plugin-babel'
import json from 'rollup-plugin-json'

const defaultBabelConfig = {
  exclude: ['node_modules/**'],
  externalHelpers: true,
  runtimeHelpers: true
}

const defaultRollupConfig = {
  plugins: [json(), babel(defaultBabelConfig)],
  external: [] // Peer dependencies, such as react, lodash...
}

export default [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.js',
      format: 'cjs'
    }
  },
  {
    input: 'src/index.js',
    output: {
      file: 'es/index.js',
      format: 'esm'
    }
  }
].map(config => ({ ...config, ...defaultRollupConfig }))
