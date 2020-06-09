/*
 * @Description: 简易版vuex
 * @Author: zhangjingsong 
 * @Date: 2020-06-03 16:02:00 
 * @Last Modified by: zhangjingsong
 * @Last Modified time: 2020-06-10 07:37:17
 */
// 保存Vue构造函数
let Vue

// 创建Store类
class Store {
    constructor(options) {
        const store = this
        // 借鸡生蛋,利用data创建响应式state
        // this._vm = new Vue({
        //     data: {
        //         $$state: options.state
        //     },
        //     computed: {
        //         getters() {
        //             const {...other} = options.getters
        //             for(let funcName in other) {
        //                 other[funcName] = other[funcName](store.state)
        //             }
        //             return other
        //         }
        //     }
        // })
        const computed = {}
        this.getters = {}
        this._getters = options.getters

        Object.keys(this._getters).map(keys => {
            const fn = store._getters[keys]
            
            computed[keys] = () => {
                return fn(store.state)
            }

            Object.defineProperty(store.getters, keys, {
                get() {
                    return store._vm[keys]
                }
            })
        })

        this._vm = new Vue({
            data: {
                $$state:options.state
            },
            computed
        })

        // 保存mutations、actions
        this._mutations = options.mutations
        this._actions = options.actions

        this.commit = this.commit.bind(this)
        this.dispatch = this.dispatch.bind(this)
    }

    get state() {
        return this._vm._data.$$state
    }

    set state(v) {
        console.error('please use replaceState to reset state')
    }

    // get getters() {
    //     return this._vm.getters
    // }

    // set getters(v) {
    //     console.error('打咩，打咩德斯')
    // }

    commit(type, payload) {
        const entry = this._mutations[type]

        if(!entry) {
            console.error('老哥，这个mutations不存在')
            return
        }

        entry(this.state, payload)
    }

    dispatch(type, payload) {
        const entry = this._actions[type]

        if(!entry) {
            console.error('老哥，这个action不存在')
            return
        }

        entry(this, payload)
    }
}

// install挂载$store
function install(_vue) {
    Vue = _vue

    Vue.mixin({
        beforeCreate() {
            if(this.$options.store) {
                Vue.prototype.$store = this.$options.store
            }
        }
    })

}

export default {Store, install}