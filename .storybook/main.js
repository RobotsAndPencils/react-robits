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
    const newLoader = {
      module: {
        rules: [
          {
            test: /\.module\.(scss|sass)$/,
            use: [
              {
                loader: 'sass-resources-loader',
                options: {
                  // Provide path to the file with resources
                  resources: './src/lib/assets/styles/*.scss'
                }
              }
            ]
          }
        ]
      }
    }
  
    // NOTE: this technically doesn't append properly, due to the structure of the
    // default webpack use array ... but it works, and I'm unsure how to how to better scope it
    const combinedConfig = merge.smartStrategy({
      'module.rules.use': 'append'
    })(config, newLoader)

    combinedConfig.resolve.alias = Object.assign({}, combinedConfig.resolve.alias, { themes: path.resolve(__dirname, '../src/lib/assets/styles/themes')})

    // console.dir(combinedConfig.resolve, { depth: 10 })

    // Return the altered config
    return combinedConfig;
  }
};
