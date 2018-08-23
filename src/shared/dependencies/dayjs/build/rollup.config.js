const babel = require('rollup-plugin-babel')
const uglify = require('rollup-plugin-uglify')

module.exports = (config) => {
  const { input, fileName, name } = config
  return {
    input: {
      input,
      external: [
        'dayjs'
      ],
      plugins: [
        babel({
          exclude: 'node_modules/**'
        })
      ]
    },
    output: {
      file: fileName,
      format: 'cjs',
      name: name || 'dayjs',
      globals: {
        dayjs: 'dayjs'
      }
    }
  }
}
