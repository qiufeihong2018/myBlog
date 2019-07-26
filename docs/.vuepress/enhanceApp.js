// 官方插件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 自定义插件
// import getGitalk from "./common/getGittalk"
import copy from './common/copyright'

export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData // 站点元数据
}) => {

  Vue.use(ElementUI)
  // console.log(path)

  // console.log(router)
  // console.log(siteData)

  setTimeout(() => {
    try {
      document && (() => {
        // getGitalk.call(this, siteData)
        copy()
      })()
    } catch (e) {
      console.error(e.message)
    }
  }, 1000)
}
