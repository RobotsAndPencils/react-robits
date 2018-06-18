var ExtractTextPlugin = require('extract-text-webpack-plugin')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
var path = require('path')

let styleLoaders = (modularize = true) => [
  {
    loader: 'style-loader'
  },
  /* The css-loader does two things for us: Enables CSS Modules and handles
   * our css @imports & url()s as if they were js imports or require()s
   */
  {
    loader: 'css-loader',
    options: {
      modules: modularize, // Enables CSS Modules spec
      importLoaders: 3, // Tells CSS Loader how many loaders need to run for all @imported css files
      localIdentName: '[name]__[local]', // Provides the format for the CSS Modules output.
      sourceMap: true
    }
  },
  /* The postcss-loader lets us implement any plugin that works in postcss and
   * then process the newly compiled css file with them.
   */
  {
    loader: 'postcss-loader',
    options: {
      sourceMap: true,
      plugins: () => [
        require('autoprefixer') // We are only using the autoprefixer plugin with all its defaults
      ]
    }
  },
  /* The sass-loader takes our newly resourced scss file and compiles it
   * with the version of node-sass we have installed.
   */
  {
    loader: 'sass-loader',
    options: {
      sourceMap: true
    }
  }
]

module.exports = {
  // plugins: [
  //   new MiniCssExtractPlugin({
  //     filename: '[name].css',
  //     chunkFilename: '[id].css'
  //   })
  // ],
  plugins: [
    new ExtractTextPlugin({
      filename: 'mystyles.css',
      allChunks: true
    })
  ],
  resolve: {
    alias: {
      'jquery': path.join(__dirname, '../stories/pages/forms/jquery-stub.js')
    }
  },
  module: {
    rules: [
      // /* This will make the babel-loader handle all .js files. We have set up two presets in
      //    * our .babelrc file in the project root that tells babel how to handle these files.
      //    */
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   loader: 'babel-loader'
      // },
      // Apply loader
      {
        test: /.scss$/,
        use: styleLoaders().concat([
          {
            loader: 'sass-resources-loader',
            options: {
              // Provide path to the file with resources
              resources: './styles/**/*.scss'
            }
          }
        ]),
        exclude: /node_modules/
      },
      {
        test: /.scss$/,
        use: styleLoaders(false),
        include: /node_modules/
      }
    ]
  }
}
