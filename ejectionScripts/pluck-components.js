const { execSync } = require('child_process')
const args = require('minimist')(process.argv.slice(2))
const { updateReferences } = require('./update-references')
const path = require('path')
const fs = require('fs')
const readdirp = require('readdirp')

async function asyncForEach (array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

updateReferences({
  robitsFolder: args.robitsFolder,
  destinationDir: args.destinationDir,
  sourceDir: args.sourceDir
}).then(async usedRobits => {
  console.log('used robits ====== ', usedRobits)

  console.log(
    '\nCopying Robits from the NPM package and placing them at: "' +
      args.destinationDir +
      args.robitsFolder +
      '" ...\n--------------------\n'
  )
  execSync(
    'cp -r ./node_modules/react-robits/src/lib/ ' + args.destinationDir + args.robitsFolder,
    {
      stdio: [0, 1, 2]
    }
  )

  console.log('Done.\n')
  console.log('Are we pruning? shouldPrune = ', args.shouldPrune === 'true')

  console.log('\nTheming and/or pruning...\n--------------------\n')

  // Delete non-applicable theme directories
  // ---------------------------------------------------
  const themeDirectories = await readdirp.promise(
    path.resolve(
      __dirname,
      '../../../' + args.destinationDir + args.robitsFolder + '/styles/themes'
    ),
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
  const componentDirectories = await readdirp.promise(
    path.resolve(__dirname, '../../../' + args.destinationDir + args.robitsFolder + '/components'),
    {
      type: 'directories',
      depth: 1
    }
  )

  await asyncForEach(componentDirectories, async ({ fullPath }) => {
    console.log('parsing component directory: ', fullPath)

    let jsDeletionTracker = []

    if (args.shouldPrune === 'true') {
      const jsFiles = await readdirp.promise(fullPath, {
        fileFilter: '*.js',
        depth: 1
      })

      jsDeletionTracker = jsFiles

      // delete js files not used
      await asyncForEach(jsFiles, async ({ fullPath, basename }) => {
        console.log('parsing js file: ', fullPath)
        if (!usedRobits.includes(basename.split('.')[0])) {
          fs.unlinkSync(fullPath)
          jsDeletionTracker = jsDeletionTracker.filter(entry => entry.fullPath !== fullPath)
        }
      })
    }

    if (args.shouldPrune === 'true' && jsDeletionTracker.length === 0) {
      // delete directory if no js files used
      console.log(`removing ${fullPath} directory completely`)
      execSync(`rm -rf '${fullPath}'`, {
        stdio: [0, 1, 2]
      })
    } else {
      // delete non-applicable stylesheets
      const scssFiles = await readdirp.promise(fullPath, {
        fileFilter: '*.scss',
        depth: 1
      })

      await asyncForEach(scssFiles, async ({ fullPath, basename }) => {
        console.log('parsing scss file: ', fullPath)
        if (!basename.includes(args.themeName)) {
          fs.unlinkSync(fullPath)
        }
      })
    }
  })

  console.log('All plucked.\n')
})
