const { execSync } = require('child_process')
const args = require('minimist')(process.argv.slice(2))
const { updateReferences } = require('./update-references')
const path = require('path')
const fs = require('fs')
const readdirp = require('readdirp')
const { createInterface } = require('readline')
const jetpack = require('fs-jetpack')

const pruneMap = []
const shouldPrune = args.shouldPrune === 'true'
const projectUsesMagicTokens = args.magicTokens === 'true'

const asyncForEach = async (array, callback) => {
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
    '\x1b[31m%s\x1b[0m',
    `!! ----------------------------------- !!\nNote: the file ${target.name} was renamed to ${alternateName} during ejection due to a collision with an existing file on your project. This might have broken the Robits integration. You will need to either manually merge the contents into the original-named file, or update dependent references to the newly named file.\n!! ----------------------------------- !!`
  )
  jetpack.copy(source.absolutePath, alternateTarget)
}

const processFileImports = ({ filename, componentName }) => {
  return new Promise((resolve, reject) => {
    const lineReader = createInterface({
      input: fs.createReadStream(filename),
      crlfDelay: Infinity,
      terminal: false
    })

    lineReader.on('line', line => {
      if (line.indexOf('import') > -1 && (line.match(/(\.\.\/)/g) || []).length === 1) {
        pruneMap.push({ host: componentName, dep: line.match(/(?<=import\s+).*?(?=\s+from)/gs)[0] })
      }
    })

    lineReader.on('close', () => {
      resolve(pruneMap)
    })

    lineReader.on('error', err => {
      reject(err)
    })
  })
}

const removeThemeWrapper = ({ filename, componentName, folderName }) => {
  return new Promise((resolve, reject) => {
    try {
      let data = fs.readFileSync(filename, 'utf8')

      data = data.replace(new RegExp('styling(,|\\s)', 'g'), '')

      const styling =
        (data.match(/styling(\[|\.)/g) || []).length > 0
          ? `import styling from './${folderName}_${args.themeName}.module.scss'`
          : ''

      data = data.replace(new RegExp("import ThemeWrapper from (.*)ThemeWrapper'", 'g'), styling)

      data = data.replace(
        new RegExp(`export default ThemeWrapper((.|\\s)*)${componentName}(\\s*)?\\)`, 'g'),
        `export default ${componentName}`
      )

      fs.writeFileSync(filename, data, 'utf8')

      resolve(true)
    } catch (err) {
      reject(err)
    }
  })
}

const updateComponentTokenImports = ({ filepath, projectUsesMagicTokens }) => {
  return new Promise((resolve, reject) => {
    try {
      let data = fs.readFileSync(filepath, 'utf8')

      if (projectUsesMagicTokens) {
        // remove manual token imports within components
        data = data.replace(
          new RegExp(`@import '../../styles/themes/${args.themeName}/tokens';`, 'g'),
          ''
        )
      } else {
        // update manual token imports to new location
        data = data.replace(
          new RegExp(`@import '../../styles/themes/${args.themeName}/tokens';`, 'g'),
          "@import '../../styles/tokens';"
        )
      }

      fs.writeFileSync(filepath, data, 'utf8')

      resolve(true)
    } catch (err) {
      reject(err)
    }
  })
}

const checkDependencyMap = (componentName, usedRobits) => {
  const dependers = pruneMap.reduce((acc, { host, dep }) => {
    if (dep === componentName) {
      return acc.concat([host])
    } else {
      return acc
    }
  }, [])
  const intersection = dependers.filter(x => usedRobits.includes(x))
  return intersection.length === 0
}

updateReferences({
  destinationDir: args.destinationDir,
  sourceDir: args.sourceDir
}).then(async usedRobits => {
  console.log(
    '\x1b[34m%s\x1b[0m',
    '\nCopying Robits from the NPM package and placing them at: "' +
      args.destinationDir +
      '" ...\n-----------------------------------------------------------------------------\n'
  )
  jetpack.copy(
    path.resolve(__dirname, '../src/core'),
    path.resolve(__dirname, '../../../../' + args.destinationDir),
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

  // Delete non-applicable theme directories
  // ---------------------------------------------------
  const themeDirectories = await readdirp.promise(
    path.resolve(__dirname, '../../../../' + args.destinationDir + '/styles/themes'),
    {
      type: 'directories',
      depth: 1
    }
  )

  await asyncForEach(themeDirectories, async ({ fullPath }) => {
    if (!fullPath.includes(args.themeName)) {
      execSync(`rm -rf '${fullPath}'`, {
        stdio: [0, 1, 2]
      })
    }
  })

  // Flatten chosen theme
  // ---------------------------------------------------

  jetpack
    .find(
      path.resolve(
        __dirname,
        '../../../../' + args.destinationDir + '/styles/themes/' + args.themeName
      ),
      {
        matching: '*.scss'
      }
    )
    .forEach(filepath => {
      const filename = /[^\/]*$/.exec(filepath)[0]
      if (filename.charAt(0) === '_') {
        // move to tokens directory
        jetpack.move(
          filepath,
          path.resolve(
            __dirname,
            '../../../../' + args.destinationDir + '/styles/tokens/' + filename
          ),
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
      } else {
        if (filename === 'themeColors.module.scss') {
          // delete storybook-centric file
          jetpack.remove(filepath)
        } else if (filename === 'tokens.scss' && projectUsesMagicTokens) {
          // delete token importer if the project uses "magic tokens" (sass-resources-loader)
          jetpack.remove(filepath)
        } else {
          // move all other files to the root styles directory
          const newpath = path.resolve(
            __dirname,
            '../../../../' + args.destinationDir + '/styles/' + filename
          )
          jetpack.move(filepath, newpath, {
            overwrite: (source, target) => {
              if (source.name === target.name) {
                copyWithNewName(source, target)
                return false
              }
              return true
            }
          })

          if (filename === 'tokens.scss') {
            // update manual token import paths after move
            let data = fs.readFileSync(newpath, 'utf8')

            data = data.replace(new RegExp("@import '", 'g'), "@import 'tokens/")

            fs.writeFileSync(newpath, data, 'utf8')
          }
        }
      }
    })

  // remove the now empty themes folder
  jetpack.remove(path.resolve(__dirname, '../../../../' + args.destinationDir + '/styles/themes'))

  // get and update the component scss files to account for flattened theme
  const scssFiles = jetpack.find(
    path.resolve(__dirname, '../../../../' + args.destinationDir + '/components'),
    {
      matching: '*.scss'
    }
  )
  await asyncForEach(scssFiles, async filepath => {
    await updateComponentTokenImports({
      filepath,
      projectUsesMagicTokens
    })
  })

  console.log('\x1b[32m%s\x1b[0m', 'Done.\n')

  // Delete non-applicable component files and theme stylesheets
  // ---------------------------------------------------
  const robitsComponentDirectories = await readdirp.promise(
    path.resolve(__dirname, '../src/core/components'),
    {
      type: 'directories',
      depth: 1
    }
  )

  if (shouldPrune) {
    console.log(
      '\x1b[34m%s\x1b[0m',
      '\nPruning Robits files to the following referenced in the project...\n------------------------------------------------------------------\n'
    )
    console.log(usedRobits)
    const jsToCheck = await readdirp.promise(path.resolve(__dirname, '../src/core/components'), {
      fileFilter: '*.js'
    })
    await asyncForEach(jsToCheck, async ({ fullPath, basename }) => {
      await processFileImports({ filename: fullPath, componentName: basename.split('.')[0] })
    })
    console.log('-- Built interdependency map:\n', pruneMap, '\n')
  }

  await asyncForEach(
    robitsComponentDirectories,
    async ({ fullPath: fullRobitsComponentDir, path: relativeRobitsComponentDir, dirent }) => {
      let jsDeletionTracker = []

      if (shouldPrune) {
        const jsFiles = await readdirp.promise(fullRobitsComponentDir, {
          fileFilter: '*.js',
          depth: 1
        })

        jsDeletionTracker = jsFiles

        // delete js files not used
        await asyncForEach(jsFiles, async ({ basename, path: relativeRobitsJsPath }) => {
          const componentName = basename.split('.')[0]
          if (!usedRobits.includes(componentName)) {
            const canDelete = await checkDependencyMap(componentName, usedRobits)
            if (canDelete) {
              console.log(`• Pruning: ${componentName}`)
              fs.unlinkSync(
                path.resolve(
                  __dirname,
                  '../../../../' +
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
              console.log(`** saving interdependent component: ${componentName}`)
            }
          }
        })
      }

      if (shouldPrune && jsDeletionTracker.length === 0) {
        // delete directory if no js files used
        const dirToDelete = path.resolve(
          __dirname,
          '../../../../' + args.destinationDir + '/components/' + relativeRobitsComponentDir
        )
        console.log(`• Pruning: /${relativeRobitsComponentDir} directory completely`)
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
          if (!basename.includes(args.themeName)) {
            fs.unlinkSync(
              path.resolve(
                __dirname,
                '../../../../' +
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

  if (args.shouldRemoveThemeWrapper === 'true') {
    console.log(
      '\x1b[34m%s\x1b[0m',
      '\nRemoving ThemeWrapper reliance...\n----------------------------------\n'
    )

    // if we're pruning, then filter to only the robit files used by the project,
    // otherwise, process the removal for all JS files.
    // note: the use case for not pruning is likely to be for an initial project bootstrap,
    // in which case there probably aren't any other JS files in the destination directory to parse,
    // but if used outside that use case, this will unneccessarily parse and touch files unnecessarily,
    // which introduces some potential risk
    const groomedRobits = await readdirp.promise(
      path.resolve(__dirname, '../../../../' + args.destinationDir + '/components/'),
      {
        fileFilter: shouldPrune ? usedRobits.map(file => `${file}.js`) : '*.js'
      }
    )

    await asyncForEach(groomedRobits, async ({ basename, fullPath, path: shortPath }) => {
      await removeThemeWrapper({
        filename: fullPath,
        componentName: basename.split('.')[0],
        folderName: shortPath.split('/')[0]
      })
    })

    fs.unlinkSync(
      path.resolve(__dirname, '../../../../' + args.destinationDir + '/utils/ThemeWrapper.js')
    )

    console.log('\x1b[32m%s\x1b[0m', 'Gone.\n')
  }

  console.log('\x1b[32m%s\x1b[0m', `\nAll plucked${shouldPrune ? ' and pruned' : ''}!\n`)
})
