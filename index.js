//
function _interopRequireDefault (obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

// var _PrimaryButton1 = require('./lib/atoms/buttons/primaryButton/PrimaryButton')
// var _PrimaryButton2 = _interopRequireDefault(_PrimaryButton1)

// var _SecondaryButton1 = require('./lib/atoms/buttons/secondaryButton/SecondaryButton')
// var _SecondaryButton2 = _interopRequireDefault(_SecondaryButton1)

// exports.PrimaryButton = _PrimaryButton2['default']
// exports.SecondaryButton = _SecondaryButton2['default']

// find components
const req = require.context('./src/lib', true, /.js$/)

var regex = /[^\\\\\/]+(?=\.[\w]+$)|[^\\\\\/]+$/ // eslint-disable-line

// dynamically load and export them
req.keys().forEach(filename => {
  const first = req(filename)
  const second = _interopRequireDefault(first)

  var name = filename.match(regex)[0]

  exports[name] = second.default
})
