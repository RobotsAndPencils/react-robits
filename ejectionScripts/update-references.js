const path = require('path')
const fs = require('fs')
const readdirp = require('readdirp')
const { createInterface } = require('readline')

const usedRobits = []

const processJsFile = ({ filename, destinationDir, robits }) => {
  return new Promise((resolve, reject) => {
    const lineReader = createInterface({
      input: fs.createReadStream(filename),
      crlfDelay: Infinity,
      terminal: false
    })

    let importBlock = ''
    const componentArray = []

    lineReader.on('line', line => {
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

            let retVal = ''
            const componentsString = trimmedLine.substring(
              trimmedLine.lastIndexOf('{') + 1,
              trimmedLine.lastIndexOf('}')
            )
            const components = componentsString.split(',')

            const relativePathToSourceDir = path.relative(path.dirname(filename), destinationDir)

            for (let c = 0; c < components.length; c++) {
              const component = components[c].trim()
              const relativePathFromCore = robits.find(obj => obj.basename === `${component}.js`)
                .path
              console.log('• Updating reference for: ' + component + ', in ' + filename)
              retVal += `import ${component} from '${relativePathToSourceDir}/${relativePathFromCore}'\n`
              componentArray.push(component)
            }

            return retVal
          })

          fs.writeFileSync(filename, data, 'utf8')

          lineReader.close()
        }
      }
    })

    lineReader.on('close', () => {
      resolve(componentArray)
    })

    lineReader.on('error', err => {
      reject(err)
    })
  })
}

const processScssFile = ({ filename, destinationDir, robits }) => {
  return new Promise((resolve, reject) => {
    try {
      let data = fs.readFileSync(filename, 'utf8')

      const relativePathToSourceDir = path.relative(path.dirname(filename), destinationDir)

      data = data.replace(
        new RegExp(
          '@import (.*)node_modules\\/@robotsandpencils\\/react-robits\\/src\\/core\\/styles\\/themes\\/',
          'g'
        ),
        `@import '${relativePathToSourceDir}/styles/themes/`
      )

      fs.writeFileSync(filename, data, 'utf8')

      resolve(true)
    } catch (err) {
      reject(err)
    }
  })
}

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

const updateReferences = async ({ destinationDir, sourceDir }) => {
  console.log(
    '\x1b[34m%s\x1b[0m',
    '\nUpdating project references to Robits files...\n----------------------------------------------\n'
  )

  const robits = await readdirp.promise(path.resolve(__dirname, '../src/core'), {
    fileFilter: '*.js'
  })

  const jsFiles = await readdirp.promise(path.resolve(__dirname, '../../../../' + sourceDir), {
    fileFilter: '*.js'
  })

  await asyncForEach(jsFiles, async ({ fullPath }) => {
    const newComponents = await processJsFile({
      filename: fullPath,
      destinationDir,
      robits
    })
    newComponents.forEach(c => {
      if (!usedRobits.includes(c)) {
        usedRobits.push(c)
      }
    })
  })

  const scssFiles = await readdirp.promise(path.resolve(__dirname, '../../../../' + sourceDir), {
    fileFilter: '*.scss'
  })

  await asyncForEach(scssFiles, async ({ fullPath }) => {
    await processScssFile({
      filename: fullPath,
      destinationDir
    })
  })

  console.log('\x1b[32m%s\x1b[0m', '\nAll updated.\n')
  return usedRobits
}

module.exports = {
  updateReferences
}
