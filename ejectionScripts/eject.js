const { execSync } = require('child_process')
const prompt = require('prompt-sync')({ sigint: true })

console.log(
  '\x1b[1m%s\x1b[0m',
  '\nEnter your project source directory path (e.g. - ./src/).\nThis is expected to be one level below your client project’s root directory at which the package.json lives.'
)
const sourceDir = prompt('> ')
if (!sourceDir) {
  throw new Error(
    'Whoops, we need that. Please try again and provide your project source directory'
  )
}

console.log(
  '\x1b[1m%s\x1b[0m',
  '\nEnter the project directory in which to place the Robits (e.g. - ./src/robits/).\nThis can be a new or existing folder, and will result in\neverything contained within Robit’s "core" directory.'
)
const destinationDir = prompt('> ')

if (!destinationDir) {
  throw new Error(
    'Whoops, we need that. Please try again and provide your Robits destination directory'
  )
}

console.log(
  '\x1b[1m%s\x1b[0m',
  '\nEnter the name of the theme you wish to use (e.g. - talentPortal).'
)
const themeName = prompt('> ')

if (!themeName) {
  throw new Error(
    'Whoops, we need that. Please try again and provide the name of the desired Robits theme'
  )
}

console.log(
  '\x1b[1m%s\x1b[0m',
  '\nShould we prune the export to only what’s used?\nThis will omit any components not currently referenced within your project code.\n(y = yes, prune away :: n = no, keep everything)'
)
const shouldPrune = prompt('> ').toLowerCase() === 'y'

console.log(
  '\x1b[1m%s\x1b[0m',
  '\nShould we remove the ThemeWrapper.js reliance?\nThis is recommended if your project does not require multiple themes.\n(y = yes, remove it :: n = no, keep it)'
)
const shouldRemoveThemeWrapper = prompt('> ').toLowerCase() === 'y'

console.log(
  '\x1b[1m%s\x1b[0m',
  '\nDoes your project use "magic tokens" like with sass-resources-loader to avoid manual stylesheet imports?\n(y = yes, remove manual token imports :: n = no, leave manual imports)'
)
const magicTokens = prompt('> ').toLowerCase() === 'y'

execSync(
  'node ./node_modules/@robotsandpencils/react-robits/ejectionScripts/merge-dependencies && node ./node_modules/@robotsandpencils/react-robits/ejectionScripts/pluck-components' +
    ` --destinationDir ${destinationDir}` +
    ` --sourceDir ${sourceDir}` +
    ` --themeName ${themeName}` +
    ` --shouldPrune ${shouldPrune}` +
    ` --magicTokens ${magicTokens}` +
    ` --shouldRemoveThemeWrapper ${shouldRemoveThemeWrapper}` +
    ` && node ./node_modules/@robotsandpencils/react-robits/ejectionScripts/erase-footprint --sourceDir ${sourceDir}` +
    ' && npm uninstall @robotsandpencils/react-robits -D -S && npm install',
  { stdio: [0, 1, 2] }
)
console.log(
  '\x1b[92m%s\x1b[0m',
  '\n==================================\n==================================\nRobits ejection complete!\nThank you, come again :)\n'
)
