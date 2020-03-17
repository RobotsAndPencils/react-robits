const { execSync } = require('child_process')
const args = require('minimist')(process.argv.slice(2))

if (!args.sourceDir) {
  throw new Error(
    'Please provide the relative source directory path of your project to eject Robits into, as: npm run eject-robits -- --sourceDir=./folder/'
  )
} else {
  execSync(
    'node ./node_modules/react-robits/merge-dependencies --sourceDir ' +
      args.sourceDir +
      ' && node ./node_modules/react-robits/pluck-components --sourceDir ' +
      args.sourceDir +
      ' && node ./node_modules/react-robits/update-references --sourceDir ' +
      args.sourceDir +
      ' && node ./node_modules/react-robits/erase-footprint --sourceDir ' +
      args.sourceDir +
      ' && npm uninstall react-robits -D -S && npm install',
    { stdio: [0, 1, 2] }
  )
  console.log('\n====================\nRobits ejection complete!\nThank you, come again :)\n')
}
