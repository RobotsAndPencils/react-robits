const { execSync } = require('child_process')
const prompt = require('prompt-sync')({ sigint: true })

const sourceDir = prompt('Enter your project source directory path (e.g. - ./src/): ')
if (!sourceDir) {
  throw new Error(
    'Whoops, we need that. Please try again and provide your project source directory'
  )
}

const folderName = prompt(
  'By default, this process creates a "robits" folder into which it dumps the Robits. Optionally enter different folder name if desired: '
)

const robitsFolder = folderName || 'robits'

const destinationDir = prompt(
  'Enter the project directory in which to place the above folder (e.g. - ./src/components/): '
)

if (!destinationDir) {
  throw new Error(
    'Whoops, we need that. Please try again and provide your Robits destination directory'
  )
}

const shouldPrune =
  prompt(
    'Should we prune the export to only what’s used? (y = yes, prune away :: n = no, keep everything): '
  ).toLowerCase() === 'y'

execSync(
  'node ./node_modules/react-robits/ejectionScripts/merge-dependencies && node ./node_modules/react-robits/ejectionScripts/pluck-components' +
    ' --destinationDir ' +
    destinationDir +
    ' --robitsFolder ' +
    robitsFolder +
    ' --sourceDir ' +
    sourceDir +
    ' --shouldPrune ' +
    shouldPrune +
    ' && node ./node_modules/react-robits/ejectionScripts/erase-footprint --sourceDir ' +
    sourceDir, // +
  // ' && npm uninstall react-robits -D -S && npm install',
  { stdio: [0, 1, 2] }
)
console.log('\n====================\nRobits ejection complete!\nThank you, come again :)\n')
