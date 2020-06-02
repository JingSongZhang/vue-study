/*
 * @Description: router
 * @Author: zhangjingsong 
 * @Date: 2020-06-02 16:29:00 
 * @Last Modified by: zhangjingsong
 * @Last Modified time: 2020-06-02 18:00:07
 */
// 保存vue构造函数
let Vue

// 实现VueRouter类
class VueRouter {
    constructor(options) {
        // 创建响应式current
        Vue.util.defineReactive(this, 'current', '/')

        // 保存一份options
        this.$options = options

        // 监听hashChange事件
        window.addEventListener('hashchange', this.findHash.bind(this))
        // 设置模板
        this.findHash()
    }

    findHash() {
        console.log('options', this)
        this.current = window.location.hash.slice(1)
        this.component = this.$options.routes.find(item => item.path === this.current)
    }

}

// 实现install
VueRouter.install = function(_vue) {
    Vue = _vue
    // 全局混入，用生命周期挂载$router
    Vue.mixin({
        beforeCreate() {
            if(this.$options.router) {
                Vue.prototype.$router = this.$options.router
            }
        }
    })

    // 注册全局组件router-view
    Vue.component('router-view', {
        render(h) {
            console.log(this.$router)
            return h(
                this.$router.component.component
            )
        }
    })

    // 注册全局组件router-link
    Vue.component('router-link', {
        props: {
            to: {
                type: String,
                required: true
            }
        },
        render(h) {
            console.log(this.$slot)
            return h(
                'a',
                {
                    attrs: {
                        href: '#' + this.to
                    }
                },
                this.$slots.default
            )
        }
    })
}

export default VueRouter