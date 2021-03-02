const mergePackages = require('@userfrosting/merge-package-dependencies')
const path = require('path')
const fs = require('fs')

const projectPackageFilename = path.resolve(__dirname, '../../../../package.json')

console.log(
  '\x1b[34m%s\x1b[0m',
  '\nMerging the Robits NPM package.json with your project package.json...\n------------------------------------------------------------\n'
)
// template has to be the parent project's package.json, so we don't wipe out anything there
const template = require(projectPackageFilename)
const originalDevDependencies = { ...template.devDependencies }

// designate parent project package json and this(robits) package.json
const pkgPaths = [
  path.resolve(__dirname, '../../../../package.json'),
  path.resolve(__dirname, '../package.json')
]

// merge and save result to parent
mergePackages.npm(template, pkgPaths, path.resolve(__dirname, '../../../../package.json'), true)

// get resulting merged package.json
const mergedFile = require(path.resolve(__dirname, '../../../../package.json'))

// remove unneeded dependencies
delete mergedFile.dependencies['prompt-sync']
delete mergedFile.dependencies.path
delete mergedFile.dependencies['fs-jetpack']
delete mergedFile.dependencies['@userfrosting/merge-package-dependencies']
delete mergedFile.dependencies.readdirp

// reinstitute the original devDependencies (to bypass pulling those over)
mergedFile.devDependencies = { ...originalDevDependencies }

// write updates
const data = JSON.stringify(mergedFile, null, 2)
fs.writeFileSync(projectPackageFilename, data)
