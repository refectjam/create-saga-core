export default {
  input: 'source/index.js',
  external: ['redux', 'redux-saga'],
  output: {
    file: 'cjs.bundle.js',
    format: 'cjs'
  }
}
