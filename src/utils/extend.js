/*
 * @Description: Vue.extend()实现弹窗
 * @Author: zhangjingsong
 * @Date: 2020-05-31 16:15:32
 * @Last Modified by: zhangjingsong
 * @Last Modified time: 2020-05-31 17:14:18
 */
import Vue from 'vue'

export default function create(Component, props) {
    const vm = Vue.extend(
        Component, {
            props
        }
    )
    // props需要用propsData接收
    const newVm = new vm({
        propsData: props
    }).$mount()
    document.body.appendChild(newVm.$el)

    newVm.remove = () => {
        document.body.removeChild(newVm.$el)
        newVm.$destroy()
    }

    return newVm
}