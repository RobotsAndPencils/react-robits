const { execSync } = require('child_process')
const args = require('minimist')(process.argv.slice(2))
const { updateReferences } = require('./update-references')
const path = require('path')
const fs = require('fs')
const readdirp = require('readdirp')
const { createInterface } = require('readline')
const jetpack = require('fs-jetpack')

const pruneMap = []

async function asyncForEach (array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

const copyWithNewName = (source, target) => {
  const targetNameArray = target.name.split('.')
  targetNameArray[0] = targetNameArray[0] + '_fromRobits'
  const alternateName = targetNameArray.join('.')
  const alternateTarget = target.absolutePath.replace(target.name, alternateName)
  console.log(
    `!! ------- !!\nNote: the file ${target.name} was renamed to ${alternateName} during ejection due to a collision with an existing file on your project. This might have broken the Robits integration. You will need to either manually merge the contents into the original-named file, or update dependent references to the newly named file.\n!! ------- !!`
  )
  jetpack.copy(source.absolutePath, alternateTarget)
}

function processFileImports ({ filename, componentName }) {
  return new Promise((resolve, reject) => {
    const lineReader = createInterface({
      input: fs.createReadStream(filename),
      crlfDelay: Infinity,
      terminal: false
    })

    lineReader.on('line', function (line) {
      if (line.indexOf('import') > -1 && (line.match(/(\.\.\/)/g) || []).length === 1) {
        pruneMap.push({ host: componentName, dep: line.match(/(?<=import\s+).*?(?=\s+from)/gs)[0] })
      }
    })

    lineReader.on('close', function () {
      resolve(pruneMap)
    })

    lineReader.on('error', function (err) {
      reject(err)
    })
  })
}

function checkDependencyMap (componentName, usedRobits) {
  const dependers = pruneMap.reduce((acc, { host, dep }) => {
    if (dep === componentName) {
      return acc.concat([host])
    } else {
      return acc
    }
  }, [])
  console.log(`dependers of ${componentName} = `, dependers)
  const intersection = dependers.filter(x => usedRobits.includes(x))
  console.log('dependers-usedrobits intersection = ', intersection)
  return intersection.length === 0
}

updateReferences({
  destinationDir: args.destinationDir,
  sourceDir: args.sourceDir
}).then(async usedRobits => {
  console.log('used robits ====== ', usedRobits)

  console.log(
    '\nCopying Robits from the NPM package and placing them at: "' +
      args.destinationDir +
      '" ...\n--------------------\n'
  )
  jetpack.copy(
    path.resolve(__dirname, '../src/lib'),
    path.resolve(__dirname, '../../../' + args.destinationDir),
    {
      overwrite: (source, target) => {
        if (source.name === target.name) {
          copyWithNewName(source, target)
          return false
        }
        return true
      }
    }
  )

  console.log('Done.\n')
  console.log('Are we pruning? shouldPrune = ', args.shouldPrune === 'true')

  console.log('\nTheming and/or pruning...\n--------------------\n')

  // Delete non-applicable theme directories
  // ---------------------------------------------------
  const themeDirectories = await readdirp.promise(
    path.resolve(__dirname, '../../../' + args.destinationDir + '/styles/themes'),
    {
      type: 'directories',
      depth: 1
    }
  )

  await asyncForEach(themeDirectories, async ({ fullPath }) => {
    console.log('parsing theme directory: ', fullPath)
    if (!fullPath.includes(args.themeName)) {
      execSync(`rm -rf '${fullPath}'`, {
        stdio: [0, 1, 2]
      })
    }
  })

  // Delete non-applicable component files and theme stylesheets
  // ---------------------------------------------------
  const robitsComponentDirectories = await readdirp.promise(
    path.resolve(__dirname, '../src/lib/components'),
    {
      type: 'directories',
      depth: 1
    }
  )

  if (args.shouldPrune === 'true') {
    console.log('---------- building interdependency map --------')
    const jsToCheck = await readdirp.promise(path.resolve(__dirname, '../src/lib/components'), {
      fileFilter: '*.js'
    })
    await asyncForEach(jsToCheck, async ({ fullPath, basename }) => {
      console.log(`checking file ${fullPath} for robits dependencies`)
      await processFileImports({ filename: fullPath, componentName: basename.split('.')[0] })
    })
    console.log('done building map :::: ', pruneMap)
  }

  await asyncForEach(
    robitsComponentDirectories,
    async ({ fullPath: fullRobitsComponentDir, path: relativeRobitsComponentDir, dirent }) => {
      console.log('parsing component directory: ', fullRobitsComponentDir, dirent.name)

      let jsDeletionTracker = []

      if (args.shouldPrune === 'true') {
        const jsFiles = await readdirp.promise(fullRobitsComponentDir, {
          fileFilter: '*.js',
          depth: 1
        })

        jsDeletionTracker = jsFiles

        // delete js files not used
        await asyncForEach(jsFiles, async ({ basename, path: relativeRobitsJsPath }) => {
          console.log('parsing js file: ', relativeRobitsJsPath)
          const componentName = basename.split('.')[0]
          if (!usedRobits.includes(componentName)) {
            const canDelete = await checkDependencyMap(componentName, usedRobits)
            if (canDelete) {
              console.log(
                `deleting ${componentName} at: `,
                path.resolve(
                  __dirname,
                  '../../../' + args.destinationDir + '/components/' + relativeRobitsJsPath
                )
              )
              fs.unlinkSync(
                path.resolve(
                  __dirname,
                  '../../../' +
                    args.destinationDir +
                    '/components/' +
                    dirent.name +
                    '/' +
                    relativeRobitsJsPath
                )
              )
              jsDeletionTracker = jsDeletionTracker.filter(
                entry => entry.path !== relativeRobitsJsPath
              )
            } else {
              console.log(`!!!!!!!!!! DONT DELETE ${componentName} !!!!!!!!!!!!!`)
            }
          }
        })
      }

      if (args.shouldPrune === 'true' && jsDeletionTracker.length === 0) {
        // delete directory if no js files used
        const dirToDelete = path.resolve(
          __dirname,
          '../../../' + args.destinationDir + '/components/' + relativeRobitsComponentDir
        )
        console.log(`removing ${relativeRobitsComponentDir} directory completely at: `, dirToDelete)
        execSync(`rm -rf '${dirToDelete}'`, {
          stdio: [0, 1, 2]
        })
      } else {
        // delete non-applicable stylesheets
        const scssFiles = await readdirp.promise(fullRobitsComponentDir, {
          fileFilter: '*.scss',
          depth: 1
        })

        await asyncForEach(scssFiles, async ({ basename, path: relativeRobitsScssPath }) => {
          console.log('parsing scss file: ', relativeRobitsScssPath)
          if (!basename.includes(args.themeName)) {
            fs.unlinkSync(
              path.resolve(
                __dirname,
                '../../../' +
                  args.destinationDir +
                  '/components/' +
                  dirent.name +
                  '/' +
                  relativeRobitsScssPath
              )
            )
          }
        })
      }
    }
  )

  console.log('All plucked.\n')
})
