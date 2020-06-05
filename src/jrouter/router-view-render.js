/*
 * @Description: router-view 组件 render 函数
 * @Author: zhangjingsong 
 * @Date: 2020-06-05 10:20:07 
 * @Last Modified by: zhangjingsong
 * @Last Modified time: 2020-06-05 14:25:29
 */

export default function render(h) {
    // const {routeMap, current} = this.$router
    // 将当前节点设为路由节点
    this.$vnode.data.preview = true
    // 深度
    let dep = 0
    let parent = this.$parent
    while(parent) {
        if(parent.$vnode && parent.$vnode.data) {
            if(parent.$vnode.data.preview) {
                dep++
            }
        }

        parent = parent.$parent
    }

    console.log('match===>', this, this.routeArr, dep)


    return h(
        this.routeArr[dep] ? this.routeArr[dep]['component'] : null
    )
}