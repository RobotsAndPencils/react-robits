//
function _interopRequireDefault (obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

// var _Button = require('./src/core/button/Button')
// var _Button2 = _interopRequireDefault(_Button)

// exports.Button = _Button2['default']

// find components
const req = require.context('./src/core', true, /.js$/)

var regex = /[^\\\\\/]+(?=\.[\w]+$)|[^\\\\\/]+$/ // eslint-disable-line

// dynamically load and export them
req.keys().forEach(filename => {
  const first = req(filename)
  const second = _interopRequireDefault(first)

  var name = filename.match(regex)[0]

  exports[name] = second.default
})
