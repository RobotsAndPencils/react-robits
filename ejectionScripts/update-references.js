const path = require('path')
const fs = require('fs')
const readdirp = require('readdirp')
const { createInterface } = require('readline')

const usedRobits = []

function processFile ({ filename, robitsFolder, destinationDir }) {
  return new Promise((resolve, reject) => {
    const lineReader = createInterface({
      input: fs.createReadStream(filename),
      crlfDelay: Infinity,
      terminal: false
    })

    let importBlock = ''
    const componentArray = []

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

          let data = fs.readFileSync(filename, 'utf8')

          data = data.replace(new RegExp(chunk, 'gm'), line => {
            const trimmedLine = line.replace(/(\r\n|\n|\r)/gm, '')

            var retVal = ''
            var componentsString = trimmedLine.substring(
              trimmedLine.lastIndexOf('{') + 1,
              trimmedLine.lastIndexOf('}')
            )
            var components = componentsString.split(',')

            var relativePath = path.relative(path.dirname(filename), destinationDir + robitsFolder)

            for (var c = 0; c < components.length; c++) {
              var component = components[c].trim()
              console.log('-- updating reference for ' + component + ' in ' + filename)
              retVal += `import ${component} from '${relativePath}/${component}'\n`
              componentArray.push(component)
            }

            console.log(`componentArray for ${filename} = `, componentArray)

            return retVal
          })

          fs.writeFileSync(filename, data, 'utf8')

          console.log(`close ${filename}`)
          lineReader.close()
        }
      }
    })

    lineReader.on('close', function () {
      console.log(`closing ${filename} :: `, componentArray)
      resolve(componentArray)
    })

    lineReader.on('error', function (err) {
      reject(err)
    })
  })
}

async function asyncForEach (array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

async function updateReferences ({ robitsFolder, destinationDir, sourceDir }) {
  console.log('\nUpdating project references to Robits components...\n--------------------\n')

  const files = await readdirp.promise(path.resolve(__dirname, '../../../' + sourceDir), {
    fileFilter: '*.js'
  })

  console.log('done walking files :: ', files)

  await asyncForEach(files, async ({ fullPath }) => {
    const newComponents = await processFile({ filename: fullPath, robitsFolder, destinationDir })
    console.log(`done processing ${fullPath}`, newComponents)
    newComponents.forEach(c => {
      if (!usedRobits.includes(c)) {
        usedRobits.push(c)
      }
    })
  })
  console.log('DONE UPDATING :: ', usedRobits)

  return usedRobits
}

module.exports = {
  updateReferences
}
