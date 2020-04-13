const { execSync } = require('child_process')
const args = require('minimist')(process.argv.slice(2))

console.log(args)

function getInput () {
  return new Promise(function (resolve, reject) {
    const stdin = process.stdin
    let data = ''

    stdin.setEncoding('utf8')
    stdin.on('data', function (chunk) {
      data += chunk
    })

    stdin.on('end', function () {
      resolve(data)
    })

    stdin.on('error', reject)
  })
}

getInput()
  .then(ins => {
    console.log('ins = ', ins)
  })
  .catch(console.error)

console.log(
  '\nCopying Robits from the NPM package and placing them at: "' +
    args.destinationDir +
    args.robitsFolder +
    '" ...\n--------------------\n'
)
execSync('cp -r ./node_modules/react-robits/src/lib/ ' + args.destinationDir + args.robitsFolder, {
  stdio: [0, 1, 2]
})
console.log('All plucked.\n')
