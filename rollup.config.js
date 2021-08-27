import typescript from '@rollup/plugin-typescript'

export default {
  input: 'src/index.ts',
  plugins: [ typescript() ],
  output: [
    { format: 'esm', file: 'dist/index.es.js' },
    { format: 'cjs', file: 'dist/index.js' }
  ],
  external: [
    'module',
    'tailwindcss',
    'path',
    'postcss',
    'fs',
    'debug',
    'chalk',
    'magic-string',
    'acorn-walk'
  ]
}
