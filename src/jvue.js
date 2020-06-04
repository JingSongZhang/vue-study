// 数据响应式
function defineReactive(obj, key, val) {
    // 递归
    observe(val)

    // 通过闭包实现每个key对应一个Dep实例
    const dep = new Dep()

    Object.defineProperty(obj, key, {
        get() {
            console.log('get==>', 'key:', key, '值:', val)
            Dep.target && dep.addDep(Dep.target)
            return val
        },
        set(newVal) {
            // console.log(newVal)
            if(newVal !== val) {
                console.log('set==>', 'key:', key, '旧值:', val, '新值:', newVal)
                observe(newVal)
                val = newVal
                dep.updateFun()
            }
        }
    })
}

// 没有感情的生产函数,每个被劫持的对象都会创造一个新的Observe实例
// 也就是说，每new一个JVue, 便会创造出一个Observe实例
// 但是由于defineReactive中的 递归写法，当前例子的data中如果有深层次的对象
// 将会创造出很多个Observe实例
function observe(obj) {
    if(typeof obj !== 'object' || obj === null) {
        return
    }
    

    new Observe(obj)
}

// 代理，让使用者不用 如 app.$data.counter 这样访问，直接app.counter访问
function proxy(vm) {
    Object.keys(vm.$data).forEach(key => {
        Object.defineProperty(vm, key, {
            get() {
                return vm.$data[key]
            },
            set(newVal) {
                if(newVal !== vm.$data[key]) {
                    vm.$data[key] = newVal
                }
            }
        })
    })
}

// 1.创建JVue类
class JVue {
    constructor(options) {
        console.log('JVue实例被创建了')
        this.$el = options.el
        this.$data = options.data
        this.$methods = options.methods

        // 代理
        proxy(this)

        // 劫持使用者传递进来的data对象
        observe(this.$data)

        // 创建Compile实例，给它一个上下文和根节点id
        new Compile(this, this.$el)
    }
}

// 2.创建Observer类劫持监听所有属性
class Observe {
    constructor(obj) {
        Object.keys(obj).forEach(key => {
            defineReactive(obj, key, obj[key])
        })
    }
}

// 3.创建Compile类解析指令
class Compile {
    constructor(vm, el) {
        this.$vm = vm
        this.$el = el
        this.node = document.querySelector(this.$el)
        this.analysis(this.node)
    }

    // 循环、递归解析节点中所有指令
    analysis(node) {
        node.childNodes.forEach(childNode => {
            if(childNode.nodeType === 1) { // 元素
                this.analysisElement(childNode)
            }else if(childNode.nodeType === 3) { // 文本
                this.interpolation(childNode)
            }
            // 递归
            if(childNode.childNodes.length > 0) {
                this.analysis(childNode)
            }
        })
    }

    // {{}} 插值表达式
    interpolation(node) {
        // console.log(this.$vm, node)
        if(/\{\{(.*)\}\}/.test(node.textContent)) {
            // node.textContent = this.$vm[RegExp.$1]
            this.bindWatcher(RegExp.$1, node, 'text' )
        }
    }

    // 解析元素节点
    analysisElement(childNode) {
        const attrArr = childNode.attributes
        Array.from(attrArr).forEach(attr => {
            const {name, value} = attr
            if(name.indexOf('j-') === 0) {
                this[name.substring(2)](childNode, value)
            } else if(name.indexOf('@') === 0) {
                this[name.substring(1)](childNode, value)
            }
        })
    }

    // j-text
    text(childNode, value) {
        // childNode.textContent = this.$vm[value]
        this.bindWatcher(value, childNode, 'text')
    }

    // j-html
    html(childNode, value) {
        // childNode.innerHTML = this.$vm[value]
        this.bindWatcher(value, childNode, 'html')
    }

    // @click
    click(childNode, value) {
        this.bindWatcher(value, childNode, 'click')
    }

    // j-model
    model(childNode, value) {
        this.bindWatcher(value, childNode, 'model')
    }

    // 依赖收集
    bindWatcher(key, node, dir) {
        const func = this[dir + 'Update']
        func && func(this.$vm, key, node)
        new Watcher(this.$vm, key, () => {
            func && func(this.$vm, key, node)
        })
    }

    textUpdate(vm, key, node) {
        node.textContent = vm[key]
    }

    htmlUpdate(vm, key, node) {
        node.innerHTML = vm[key]
    }

    clickUpdate(vm, key, node) {
        node.addEventListener('click', vm['$methods'][key])
    }

    modelUpdate(vm, key, node) {
        console.log(vm, key, node)
    }
}

// 4. 创建Watcher类
// 
class Watcher {
    constructor(vm, key, updateFun) {
        this.updateFun = updateFun
        Dep.target = this
        vm[key]
        Dep.target = null   
    }
}

// 5. 创建Dep类，每一个key对应一个Dep的实例，每个Dep的实例管理key所依赖的所有Watcher实例
class Dep {
    constructor() {
        this.deps = []
    }

    addDep(watcher) {
        this.deps.push(watcher)
    }

    updateFun() {
        this.deps.forEach(watcher => {
            watcher.updateFun()
        })
    }
}