/*
 * @Description: router
 * @Author: zhangjingsong 
 * @Date: 2020-06-02 16:29:00 
 * @Last Modified by: zhangjingsong
 * @Last Modified time: 2020-06-05 14:26:57
 */
import render from './router-view-render'
// 保存vue构造函数
let Vue

// 实现VueRouter类
class VueRouter {
    constructor(options) {
        // 创建响应式current
        // Vue.util.defineReactive(this, 'current', '/')
        this.current = window.location.hash.slice(1) || '/'
        Vue.util.defineReactive(this, 'routeArr', [])

        // 保存一份options
        this.$options = options

        this.match()
        console.log(this)

        //建立映射关系
        // this.routeMap = {}
        // this.$options.routes.map(route => {
        //     this.routeMap[route.path] = route
        // })

        // 监听hashChange事件
        window.addEventListener('hashchange', this.findHash.bind(this))
    }

    findHash() {
        this.current = window.location.hash.slice(1)
        this.match()
    }

    match(routes = this.$options.routes) {
        routes.map(route => {
            if(route.path === '/' && this.current === '/') {
                this.routeArr.push(route)
            }

            if(route.path !== '/' && this.current.indexOf(route.path) === 0){
                this.routeArr.push(route)
                if(route.children) {
                    this.match(route.children)
                }
            }
        })
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

    console.log('render==>', this)

    // 注册全局组件router-view
    Vue.component('router-view', {
        render
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