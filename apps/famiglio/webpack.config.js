const { composePlugins, withNx } = require('@nx/webpack');
const path = require('node:path');
const fs = require('node:fs');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = composePlugins(withNx(), (config, context) => {
  const isProduction = context.configuration === 'production';
  const projectRoot = __dirname;

  // --- Package metadata
  const appPackagePath = path.join(projectRoot, 'package.json');
  const appPackage = fs.existsSync(appPackagePath)
    ? JSON.parse(fs.readFileSync(appPackagePath, 'utf8'))
    : {};

  return {
    ...config,

    target: 'node',
    entry: './src/main.ts',

    output: {
      path: path.join(projectRoot, 'dist'),
      filename: 'main.js',
      clean: true,
      ...(isProduction
        ? {}
        : {
            devtoolModuleFilenameTemplate: '[absolute-resource-path]',
          }),
    },

    resolve: {
      ...config.resolve,
      extensions: ['.ts', '.js', '.json'],
    },

    module: {
      ...config.module,
      rules: [
        {
          test: /\.ts$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                configFile: 'tsconfig.app.json',
              },
            },
          ],
          exclude: /node_modules/,
        },
        ...(config.module?.rules ?? []),
      ],
    },

    plugins: [
      ...(config.plugins ?? []),

      // Inject env + app metadata
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(
          isProduction ? 'production' : 'development'
        ),
        'process.env.APP_NAME': JSON.stringify(appPackage.name ?? 'unknown'),
        'process.env.APP_VERSION': JSON.stringify(
          appPackage.version ?? '0.0.0'
        ),
        'process.env.APP_DESCRIPTION': JSON.stringify(
          appPackage.description ?? ''
        ),
      }),

      // Copy static assets & generate dist package.json
      new CopyWebpackPlugin({
        patterns: [
          { from: 'src/assets', to: 'assets', noErrorOnMissing: true },
          {
            from: 'package.json',
            to: 'package.json',
            transform(content) {
              const pkg = JSON.parse(content.toString());
              return JSON.stringify(
                {
                  name: pkg.name,
                  version: pkg.version,
                  license: pkg.license,
                  dependencies: pkg.dependencies,
                  type: 'module',
                },
                null,
                2
              );
            },
          },
        ],
      }),
    ],

    devtool: isProduction ? false : 'source-map',

    optimization: {
      ...config.optimization,
      minimize: false,
    },
  };
});
