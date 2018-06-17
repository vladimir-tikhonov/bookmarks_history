const path = require('path');
const merge = require('webpack-merge');
const ChromeExtensionReloader = require('webpack-chrome-extension-reloader');
const BabelMinifyPlugin = require('babel-minify-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const GenerateJsonPlugin = require('generate-json-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const manifestTemplate = require('./src/assets/manifest.template.json');

const SOURCE_PATH = path.resolve(__dirname, 'src');
const ASSETS_PATH = path.resolve(SOURCE_PATH, 'assets');
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
        ui: path.join(SOURCE_PATH, 'scripts', 'ui', 'index.tsx'),
    },
});

const setOutput = () => ({
    output: {
        path: BUILD_PATH,
        filename: '[name].js',
    },
});

const configureCleanOutputFolderPlugin = () => ({
    plugins: [
        new CleanWebpackPlugin([BUILD_PATH]),
    ],
});

const setResolveOptions = () => ({
    resolve: {
        modules: [SOURCE_PATH, 'node_modules'],
        extensions: ['.ts', '.tsx', '.js', '.scss'],
    },
});

const configureTypescriptLoader = () => ({
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                include: [SOURCE_PATH],
                use: [
                    {
                        loader: 'ts-loader',
                    },
                ],
            },
        ],
    },
});

const configureStylesLoader = () => ({
    module: {
        rules: [
            {
                test: /\.scss$/,
                include: [SOURCE_PATH],
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
        ],
    },
    plugins: [new MiniCssExtractPlugin()],
});

const configureIconsLoader = () => ({
    module: {
        rules: [
            {
                test: /\.svg$/,
                include: [SOURCE_PATH],
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            emitFile: false,
                            name: '[name].[ext]',
                            outputPath: 'icons',
                        },
                    },
                ],
            },
        ],
    },
});

const configureAssetsCopy = () => ({
    plugins: [
        new CopyWebpackPlugin([
            { from: path.join(ASSETS_PATH, 'ui.html'), to: BUILD_PATH },
            { from: path.join(ASSETS_PATH, 'icons'), to: path.join(BUILD_PATH, 'icons') },
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
    configureCleanOutputFolderPlugin(),
    setResolveOptions(),
    configureTypescriptLoader(),
    configureStylesLoader(),
    configureIconsLoader(),
    configureAssetsCopy(),
    configureManifestGenerator(),
    addExtensionReloaderPlugin(),
    configureMinimizer(),
);
