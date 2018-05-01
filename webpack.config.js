const path = require('path');
const merge = require('webpack-merge');
const ChromeExtensionReloader = require('webpack-chrome-extension-reloader');
const BabelMinifyPlugin = require('babel-minify-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const GenerateJsonPlugin = require('generate-json-webpack-plugin');
const manifestTemplate = require('./src/assets/manifest.template.json');

const SOURCE_PATH = path.resolve(__dirname, 'src');
const BUILD_PATH = path.resolve(__dirname, 'build');

const isProductionBuild = () => process.env.NODE_ENV === 'production';

const determineWebpackMode = () => ({
    mode: isProductionBuild() ? 'production' : 'development',
});

const setSourceMaps = () => ({
    devtool: isProductionBuild() ? false : 'eval-source-map',
});

const setEntryPoints = () => ({
    entry: {
        background: path.join(SOURCE_PATH, 'scripts', 'background.ts'),
    },
});

const setOutput = () => ({
    output: {
        path: BUILD_PATH,
        filename: '[name].js',
    },
});

const setResolveExtensions = () => ({
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
});

const configureTypescriptLoader = () => ({
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
                include: [SOURCE_PATH],
            },
        ],
    },
});

const configureAssetsCopy = () => ({
    plugins: [
        new CopyWebpackPlugin([
            { from: path.join(SOURCE_PATH, 'assets', 'history.html'), to: BUILD_PATH },
        ]),
    ],
});

const configureManifestGenerator = () => ({
    plugins: [
        new GenerateJsonPlugin('manifest.json', Object.assign(manifestTemplate, {
            description: process.env.npm_package_description,
            version: process.env.npm_package_version,
            homepage_url: process.env.npm_package_homepage,
        })),
    ],
});

const addExtensionReloaderPlugin = () => {
    if (isProductionBuild()) {
        return {};
    }

    return {
        plugins: [
            new ChromeExtensionReloader(),
        ],
    };
};

const configureMinimizer = () => {
    if (!isProductionBuild()) {
        return {};
    }

    return {
        optimization: {
            minimize: false,
        },
        plugins: [
            new BabelMinifyPlugin(),
        ],
    };
};

module.exports = merge(
    determineWebpackMode(),
    setSourceMaps(),
    setEntryPoints(),
    setOutput(),
    setResolveExtensions(),
    configureTypescriptLoader(),
    configureAssetsCopy(),
    configureManifestGenerator(),
    addExtensionReloaderPlugin(),
    configureMinimizer(),
);
