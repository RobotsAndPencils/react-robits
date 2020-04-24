const path = require('path')
const fs = require('fs')

const projectPackageJSON = path.resolve(__dirname, '../../../../package.json')

console.log(
  '\x1b[34m%s\x1b[0m',
  '\nErasing the Robits footprint...\n-------------------------------\n'
)

let newFileData = ''

fs.readFile(projectPackageJSON, 'utf8', (err, data) => {
  if (err) {
    return console.log(err)
  }

  let linecount = 0
  let lastRemovalIndex = 0

  const lineReader = require('readline').createInterface({
    input: fs.createReadStream(projectPackageJSON),
    terminal: false
  })

  lineReader
    .on('line', line => {
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
    .on('close', () => {
      fs.writeFile(projectPackageJSON, newFileData, 'utf8', err => {
        if (err) return console.log(err)
        console.log('\x1b[32m%s\x1b[0m', '\nRobits is now a ghost.\n')
        console.log(
          '\x1b[34m%s\x1b[0m',
          '\nUninstalling/Reinstalling packages...\n------------------------------------\n'
        )
      })
    })
})
