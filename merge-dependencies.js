const mergePackages = require('@userfrosting/merge-package-dependencies')
const path = require('path')
const args = require('minimist')(process.argv.slice(2))

if (!args.sourceDir) {
  throw new Error(
    'Please provide the relative source directory path of your project to eject Robits into, as: npm run eject-robits -- --sourceDir=./folder/'
  )
} else {
  console.log(
    'Merging the Robits NPM package.json with your project package.json...\n--------------------\n'
  )
  // template has to be the parent project's package.json, so we don't wipe out anything there
  const template = require(path.resolve(__dirname, '../../package.json'))

  // designate parent project package json and this(robits) package.json
  const pkgPaths = [
    path.resolve(__dirname, '../../package.json'),
    path.resolve(__dirname, './package.json')
  ]

  // merge and save result to parent
  mergePackages.npm(template, pkgPaths, path.resolve(__dirname, '../../package.json'), true)
}
