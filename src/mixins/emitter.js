/*
 * @Description: 广播和向上查找父级组件
 * @Author: zhangjingsong 
 * @Date: 2020-06-01 11:01:54 
 * @Last Modified by: zhangjingsong
 * @Last Modified time: 2020-06-01 11:05:05
 */
function broadcast(componentName, eventName, params) {
    this.$children.forEach(child => {
        var name = child.$options.componentName;

        if (name === componentName) {
            child.$emit.apply(child, [eventName].concat(params));
        } else {
            broadcast.apply(child, [componentName, eventName].concat([params]));
        }
    });
}
export default {
    methods: {
        dispatch(componentName, eventName, params) { // 向上查找父级
            var parent = this.$parent || this.$root;
            var name = parent.$options.componentName;

            while (parent && (!name || name !== componentName)) {
                parent = parent.$parent;

                if (parent) {
                    name = parent.$options.componentName;
                }
            }
            if (parent) {
                parent.$emit.apply(parent, [eventName].concat(params));
            }
        },
        broadcast(componentName, eventName, params) { // 广播
            broadcast.call(this, componentName, eventName, params);
        }
    }
};