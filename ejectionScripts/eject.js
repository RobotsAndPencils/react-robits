const { execSync } = require('child_process')
const prompt = require('prompt-sync')({ sigint: true })

const sourceDir = prompt('Enter your project source directory path (e.g. - ./src/): ')
if (!sourceDir) {
  throw new Error(
    'Whoops, we need that. Please try again and provide your project source directory'
  )
}

const destinationDir = prompt(
  'Enter the project directory in which to place the Robits (e.g. - ./src/robits/): '
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

const themeName = prompt('Enter the name of the theme you wish to use (e.g. - talentPortal): ')

const shouldRemoveThemeWrapper =
  prompt(
    'Should we remove the ThemeWrapper.js reliance? (y = yes, remove it :: n = no, keep it): '
  ).toLowerCase() === 'y'

execSync(
  'node ./node_modules/react-robits/ejectionScripts/merge-dependencies && node ./node_modules/react-robits/ejectionScripts/pluck-components' +
    ` --destinationDir ${destinationDir}` +
    ` --sourceDir ${sourceDir}` +
    ` --shouldPrune ${shouldPrune}` +
    ` --themeName ${themeName}` +
    ' && node ./node_modules/react-robits/ejectionScripts/erase-footprint --sourceDir ' +
    sourceDir, // +
  // ' && npm uninstall react-robits -D -S && npm install',
  { stdio: [0, 1, 2] }
)
console.log('\n====================\nRobits ejection complete!\nThank you, come again :)\n')
