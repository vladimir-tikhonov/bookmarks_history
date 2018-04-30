const path = require('path');
const merge = require('webpack-merge');
const ChromeExtensionReloader = require('webpack-chrome-extension-reloader');

const SOURCE_PATH = path.resolve(__dirname, 'src');
const BUILD_PATH = path.resolve(__dirname, 'build');

const isProductionBuild = () => process.env.NODE_ENV === 'production';

const determineWebpackMode = () => ({
    mode: isProductionBuild() ? 'production' : 'development',
});

const setEntryPoints = () => ({
    entry: {
        background: path.resolve(SOURCE_PATH, 'scripts', 'background.ts'),
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

module.exports = merge(
    determineWebpackMode(),
    setEntryPoints(),
    setOutput(),
    setResolveExtensions(),
    configureTypescriptLoader(),
    addExtensionReloaderPlugin(),
);
