module.exports = {
    entry: './src/telegram-post.js',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.(svg)$/,
                use: [
                    {
                        loader: 'raw-loader',
                    },
                ],
            },
            {
                test: /\.png$/,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ],
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js',
        library: 'TelegramPost',
        libraryTarget: 'umd',
        libraryExport: 'default',
    },
};