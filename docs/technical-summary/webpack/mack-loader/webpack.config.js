const path = require('path')

module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    // 会依次在node_modules、loaders文件夹中查找是否存在对应loader
    resolveLoader: {
        modules: ['node_modules', './loaders']
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: [{
                loader: path.resolve(__dirname, 'replaceLoader.js'),
            },{
                loader: path.resolve(__dirname, 'replaceLoaderAsync.js'),
                options: {
                    name: 'echo'
                }
            }]
        }]
    }
}