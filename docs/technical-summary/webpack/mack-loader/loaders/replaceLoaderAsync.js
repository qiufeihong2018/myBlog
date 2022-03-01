const loaderUtils = require('loader-utils')
module.exports = function (source) {
    const options = loaderUtils.getOptions(this)
    // https://webpack.docschina.org/api/loaders/#thisasync
    // 告诉 loader-runner 这个 loader 将会异步地回调。
    const callback = this.async()
    setTimeout(() => {
        const result = source.replace('world', options.name)
        // return result
        this.callback(null, result)
    }, 1000);
}