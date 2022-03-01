// 订阅者Dep:存放watcher观察者对象。
class Dep {
    // 存放watcher对象
    constructor() {
        this.subs = []
    }
    // 塞watcher对象
    addSub(sub) {
        this.subs.push(sub)
    }
    // 派发更新
    notify() {
        this.subs.forEach(sub => {
            sub.update()
        })
    }
}

// 观察者Watcher
class Watcher {
    constructor() {
        // 将watcher对象赋值给Dep.target
        Dep.target = this
    }
    // 更新
    update() {
        console.log('更新视图啦')
        console.log('现在的作者是：', v._data.author)
    }
}

// 在构造响应式对象的时候进行依赖收集
function defineReactive(obj, key, val) {
    // 闭包中的dep对象
    const dep = new Dep()
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
            // 将watcher对象塞入dep的subs中
            dep.addSub(Dep.target)
            return val
        },
        set: function reactiveSetter(newVal) {
            // 值变了那就通知watcher对象更新视图
            if (val === newVal) return
            val = newVal
            dep.notify()
        }
    })
}
function observer(val) {
    if (!val || (typeof val !== 'object')) { return }
    Object.keys(val).forEach(key => {
        defineReactive(val, key, val[key])
    })
}
class Vue {
    constructor(opt) {
        this._data = opt.data
        observer(this._data)
        new Watcher()
        console.log("视图更新了：", this._data.author)
    }
}
let v = new Vue({
    data: {
        author: 'qfh'
    }
})
v._data.author = "飞鸿酱"
Dep.target = null
// 视图更新了： qfh
// 更新视图啦
// 现在的作者是： 飞鸿酱