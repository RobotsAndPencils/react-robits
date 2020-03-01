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
  webpackFinal: async (config) => {
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

    // config.module.rules = config.module.rules.map(obj => {
    //   if (!obj.oneOf) {
    //     return obj
    //   } else {
    //     return {
    //       oneOf: obj.oneOf.filter(o => {
    //         if (!o.test) {
    //           console.log('in default')
    //           return true
    //         } else if (o.test.toString() === /\.(scss|sass)$/.toString()) {
    //           console.log('in normal')
    //           return false
    //         } else if (o.test.toString() === /\.module\.(scss|sass)$/.toString()) {
    //           console.log('in modules')
    //           return false
    //         } else {
    //           console.log('in catch')
    //           return true
    //         }
    //       }).concat([{
    //         test: /\.module\.(scss|sass)$/,
    //         use: [
    //           {
    //             loader: 'style-loader',
    //             options: { injectType: 'lazyStyleTag' }
    //           },
    //           {
    //             loader: 'css-loader',
    //             options: { importLoaders: 4 }
    //           },
    //           {
    //             loader: 'postcss-loader',
    //             options: { plugins: () => [require('autoprefixer')] }
    //           },
    //           {
    //             loader: 'resolve-url-loader',
    //             options: { sourceMap: false }
    //           },
    //           {
    //             loader: 'sass-loader',
    //             options: { sourceMap: true }
    //           },
    //           {
    //             loader: 'sass-resources-loader',
    //             options: { resources: './src/lib/styles/tokens/*.scss' }
    //           }
    //         ]
    //       }])
    //     }
    //   }
    // })

    combinedConfig.resolve.alias = Object.assign({}, combinedConfig.resolve.alias, { themes: path.resolve(__dirname, '../src/lib/styles/themes')})

    const newRules = combinedConfig.module.rules.map(obj => {
      if (obj.test) {
        return obj
      } else {
        if ('oneOf' in obj) {
          const oneOfArray = obj.oneOf
          const newOneOfArray = oneOfArray.map(subObj => {
            if (subObj.test && subObj.test.toString() === /\.module\.(scss|sass)$/.toString()) {
              const useArray = subObj.use
              useArray.shift()
              useArray.unshift({
                loader: 'style-loader',
                options: { injectType: 'lazyStyleTag' }
              })
              subObj.use = useArray
              return subObj
            } else {
              return subObj
            }
          })
          obj.oneOf = newOneOfArray
          return obj
        } else {
          return obj
        }
      }
    })
    combinedConfig.module.rules = newRules

    // console.dir(combinedConfig.module.rules, {depth: 10, colors: true});

    // Return the altered combinedConfig
    return combinedConfig;
  }
};
