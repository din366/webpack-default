const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode = process.env.NODE_ENV || 'development';// если пусто, то development
// переменная берется из package.json (===development или production)
const target = mode === 'development' ? 'web' : 'browserslist';

// создать source-map в dist если dev-сборка
const devtool = mode === 'development' ? 'source-map' : undefined;

module.exports = {
  mode,
  target,
  devtool,
  devServer: {
    hot: true,
  },
  entry: ['@babel/polyfill', './src/script.js'], // главный файл
  output: { // Выходной результат (что будет в результате сборки)
    filename: '[name][contenthash].js',
    // path - получение пути до текущей директории и дописывается dist
    path: path.resolve(__dirname, 'dist'),
    clean: true, // удаление старых файлов из dist после обновления сборки
    assetModuleFilename: 'assets/[hash][ext][query]',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name][contenthash].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [ // выполнение снизу вверх
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(jpg|jpeg|png|svg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff2|woff|eot|ttf|otf)/i,
        type: 'asset/resource',
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
    ],
  },
};

