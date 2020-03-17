const { execSync } = require('child_process')
const args = require('minimist')(process.argv.slice(2))

if (!args.sourceDir) {
  throw new Error(
    'Please provide the relative source directory path of your project to eject Robits into, as: npm run eject-robits -- --sourceDir=./folder/'
  )
} else {
  console.log(
    '\nCopying Robits from the NPM package and placing them at: "' +
      args.sourceDir +
      '" ...\n--------------------\n'
  )
  execSync(
    'cp -r ./node_modules/react-robits/lib/ ' +
      args.sourceDir +
      'robits && find ' +
      args.sourceDir +
      'robits -mindepth 2 -type f -exec mv {} ' +
      args.sourceDir +
      'robits' +
      " ';' && find " +
      args.sourceDir +
      'robits -mindepth 1 -type d -delete',
    { stdio: [0, 1, 2] }
  )
  console.log('All plucked.\n')
}
