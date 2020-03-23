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

    // console.dir(combinedConfig.module.rules, {depth: 10, colors: true});

    // Return the altered combinedConfig
    return combinedConfig
  }
}
