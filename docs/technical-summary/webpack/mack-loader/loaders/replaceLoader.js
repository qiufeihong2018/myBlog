const loaderUtils =require('loader-utils')
module.exports = function (source) {
    const options = loaderUtils.getOptions(this)
    const result = source.replace('echo', 'world')
    // return result
    this.callback(null, result)
}