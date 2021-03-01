const mergePackages = require('@userfrosting/merge-package-dependencies')
const path = require('path')
const fs = require('fs')
// const { createInterface } = require('readline')

const projectPackageFilename = path.resolve(__dirname, '../../../../package.json')

console.log(
  '\nMerging the Robits NPM package.json with your project package.json...\n------------------------------------------------------------\n'
)
// template has to be the parent project's package.json, so we don't wipe out anything there
const template = require(projectPackageFilename)
console.log('template before:')
console.log(template)

// designate parent project package json and this(robits) package.json
const pkgPaths = [
  path.resolve(__dirname, '../../../../package.json'),
  path.resolve(__dirname, '../package.json')
]

// merge and save result to parent
mergePackages.npm(template, pkgPaths, path.resolve(__dirname, '../../../../package.json'), true)

// const removeUnneededDependencies = ({ filename, destinationDir, robits }) => {
//   return new Promise((resolve, reject) => {
//     const lineReader = createInterface({
//       input: fs.createReadStream(filename),
//       crlfDelay: Infinity,
//       terminal: false
//     })

//     lineReader.on('line', line => {
//       if (/("prompt-sync"|"path"|"fs-jetpack"|"@userfrosting\/merge-package-dependencies")/i.test(line)) {
//         let data = fs.readFileSync(filename, 'utf8')

//         data = data.replace(new RegExp(line, 'gm'), '')

//         fs.writeFileSync(filename, data, 'utf8')

//         lineReader.close()
//       }
//     })

//     lineReader.on('error', err => {
//       reject(err)
//     })
//   })
// }

// get resulting merged package.json
const mergedFile = require(path.resolve(__dirname, '../../../../package.json'))

console.log('after merge:')
console.log(mergedFile)

// remove unneeded dependencies
delete mergedFile.dependencies['prompt-sync']
delete mergedFile.dependencies.path
delete mergedFile.dependencies['fs-jetpack']
delete mergedFile.dependencies['@userfrosting/merge-package-dependencies']

// reinstitute the original devDependencies (to bypass pulling those over)
mergedFile.devDependencies = template.devDependencies

// write updates
const data = JSON.stringify(mergedFile, null, 2)
fs.writeFileSync(projectPackageFilename, data)

console.log('after cleanup:')
console.log(data)
