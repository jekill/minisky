const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCSS = new ExtractTextPlugin("[name].css");

const appSrcDirectory = __dirname + "/src";

const isProdMode = process.env.NODE_ENV === 'production';

const config = {
    // context: appSrcDirectory,
    devtool: 'source-map',
    // debug: true,

    entry: {
        'styles': appSrcDirectory + '/assets/css/main.scss',
        'app': appSrcDirectory + '/main.ts',
        'polyfills': appSrcDirectory + '/polyfills.ts'
    },

    output: {
        publicPath: "http://localhost:8080/assets/compiled/",
        path: __dirname + '/../web/assets/compiled',
        filename: '[name].js'
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: [
                    'ts-loader',
                    'angular2-template-loader',
                    '@angularclass/hmr-loader?pretty=' + !isProdMode + '&prod=' + isProdMode
                ],
                exclude: /node_modules/
            },

            {test: /\.html$/, loaders: ['raw-loader']},
            // {test: /src\/assets\/css\/.+\.scss$/, loader: ExtractTextPlugin.extract("style", "css!sass-loader")},
            {test: /src\/assets\/css\/.+\.scss$/, loader: extractCSS.extract(["css-loader", "sass-loader"])},
            {test: /src\/app\/.+\.scss$/, loader: "raw-loader!sass-loader", exclude: /src\/assets\/css/},
            {test: /.+\.css$/, loader: "raw-loader", exclude: /src\/assets\/css/},
            {test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/, loader: 'url-loader'},

        ]
    },

    resolve: {
        extensions: [".webpack.js", ".web.js", ".js", '.ts']
    },

    plugins: [
        // new ExtractTextPlugin("[name].css"),
        extractCSS,
        new webpack.DefinePlugin({
            __IS_PROD_MODE__: isProdMode
        }),
        // new webpack.optimize.CommonsChunkPlugin({names: ["polyfills"], filename: "[name].bundle.js"}),
        new webpack.LoaderOptionsPlugin({
            debug: !isProdMode
        }),
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            appSrcDirectory
        ),
    ]
};


if (isProdMode) {
    config.plugins.push(new webpack.NoErrorsPlugin());
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        debug: false,
        mangle: {
            keep_fnames: true
        }
    }));
    // config.plugins.push(new webpack.optimize.DedupePlugin());
} else {
    // config.devtool = "eval-source-map";
}

module.exports = config;