const path = require('path')
const args = require('minimist')(process.argv.slice(2))
const fs = require('fs')

const projectPackageJSON = path.resolve(__dirname, '../../package.json')

if (!args.sourceDir) {
  throw new Error(
    'Please provide the relative source directory path of your project to eject Robits into, as: node ./node_modules/react-robits/ejectionScripts/eject --sourceDir ./folder/'
  )
} else {
  console.log('\nErasing the Robits footprint...\n--------------------\n')

  var newFileData = ''

  fs.readFile(projectPackageJSON, 'utf8', function (err, data) {
    if (err) {
      return console.log(err)
    }

    var linecount = 0
    var lastRemovalIndex = 0

    const lineReader = require('readline').createInterface({
      input: fs.createReadStream(projectPackageJSON),
      terminal: false
    })

    lineReader
      .on('line', function (line) {
        linecount++
        if (line.indexOf('robits') > -1) {
          lastRemovalIndex = linecount
          console.log('removing line: ', line)
        } else {
          if ((line.trim() === '}' || line.trim() === '},') && linecount - lastRemovalIndex === 1) {
            // robits was removed on last line, so need to chop off the trailing comma since the block ended
            newFileData = newFileData.substring(0, newFileData.length - 2)
            newFileData += '\n'
          }
          newFileData += line + '\n'
        }
      })
      .on('close', function () {
        fs.writeFile(projectPackageJSON, newFileData, 'utf8', err => {
          if (err) return console.log(err)
          console.log(
            'Robits is now a ghost.\n\nUninstalling/Reinstalling packages...\n--------------------\n'
          )
        })
      })
  })
}
