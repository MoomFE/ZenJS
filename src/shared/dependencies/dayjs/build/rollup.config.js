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
        }),
        {
          transformBundle( code ){
            return code.replace( /module\.exports = ([a-z\s\n\r;]+)$/, 'export default $1' )
          }
        }
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
