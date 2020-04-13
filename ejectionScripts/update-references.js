const path = require('path')
const args = require('minimist')(process.argv.slice(2))
const fs = require('fs')

const usedRobits = []

function fromDir (startPath, filter, callback) {
  const directory = path.resolve(__dirname, '../../../' + startPath)

  if (!fs.existsSync(directory)) {
    console.log('Could not find directory:', directory)
    return
  }

  var files = fs.readdirSync(directory)

  for (var i = 0; i < files.length; i++) {
    var filename = path.join(startPath, files[i])
    var stat = fs.lstatSync(filename)
    if (stat.isDirectory()) {
      if (filename.indexOf('robits') === -1) {
        // exclude our robits directory
        fromDir(filename, filter, callback) // recurse
      }
    } else if (filter.test(filename)) {
      callback(filename)
    }
  }
}

console.log('\nUpdating project references to Robits components...\n--------------------\n')
fromDir(args.sourceDir, /\.js$/, filename => {
  const lineReader = require('readline').createInterface({
    input: fs.createReadStream(filename),
    terminal: false
  })

  let importBlock = ''

  lineReader.on('line', function (line) {
    if (
      (line.indexOf('import {') > -1 && line.indexOf('}') === -1) ||
      (importBlock.length > 0 && line.indexOf('}') === -1)
    ) {
      // start/continue multi-line import block
      importBlock = importBlock + line + '\n'
    } else {
      if (line.indexOf('react-robits') > -1 && line.indexOf('}') > -1) {
        importBlock += line
        const chunk = importBlock
        importBlock = ''

        fs.readFile(filename, 'utf8', function (err, data) {
          if (err) {
            return console.log(err)
          }

          var result = data.replace(new RegExp(chunk, 'gm'), line => {
            const trimmedLine = line.replace(/(\r\n|\n|\r)/gm, '')

            var retVal = ''
            var componentsString = trimmedLine.substring(
              trimmedLine.lastIndexOf('{') + 1,
              trimmedLine.lastIndexOf('}')
            )
            var components = componentsString.split(',')

            var relativePath = path.relative(
              path.dirname(filename),
              args.destinationDir + args.robitsFolder
            )

            for (var c = 0; c < components.length; c++) {
              var component = components[c].trim()
              console.log('-- updating reference for ' + component + ' in ' + filename)
              retVal += `import ${component} from '${relativePath}/${component}'\n`
              usedRobits.push(components)
            }

            return retVal
          })

          fs.writeFile(filename, result, 'utf8', err => {
            if (err) return console.log(err)
          })
        })

        lineReader.close()
      }
    }
  })
})

console.log(usedRobits.join(','))
