const merge = require('webpack-merge')
const path = require('path')

module.exports = {
  stories: ['../src/**/*.stories.(js|mdx)'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-docs',
    '@storybook/addon-actions',
    '@storybook/addon-knobs',
    '@storybook/addon-storysource',
    '@storybook/addon-contexts',
    '@storybook/addon-backgrounds'
  ],
  webpackFinal: async config => {
    const newLoaders = {
      module: {
        rules: [
          {
            parser: { requireEnsure: false },
            oneOf: [
              {
                test: /\.module\.(scss|sass)$/,
                use: [
                  {
                    loader: 'sass-resources-loader',
                    options: {
                      // Provide path to the file with resources
                      resources: './src/lib/styles/tokens/*.scss'
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    }

    const combinedConfig = merge.smartStrategy({
      'module.rules.use.oneOf': 'append'
    })(config, newLoaders)

    // // the below is a hefty effort to simply add { injectType: 'lazyStyleTag' } to the existing style-loader config
    // const newRules = combinedConfig.module.rules.map(obj => {
    //   if (obj.test) {
    //     return obj
    //   } else {
    //     if ('oneOf' in obj) {
    //       const oneOfArray = obj.oneOf
    //       const newOneOfArray = oneOfArray.map(subObj => {
    //         if (subObj.test && subObj.test.toString() === /\.module\.(scss|sass)$/.toString()) {
    //           const useArray = subObj.use
    //           useArray.shift()
    //           useArray.unshift({
    //             loader: 'style-loader',
    //             options: { injectType: 'lazyStyleTag' }
    //           })
    //           subObj.use = useArray
    //           return subObj
    //         } else {
    //           return subObj
    //         }
    //       })
    //       obj.oneOf = newOneOfArray
    //       return obj
    //     } else {
    //       return obj
    //     }
    //   }
    // })
    // combinedConfig.module.rules = newRules

    // console.dir(combinedConfig.module.rules, {depth: 10, colors: true});

    // Return the altered combinedConfig
    return combinedConfig
  }
}
