/*
 * @Description: Form组件-仿写element-ui表单组件
 * @Author: zhangjingsong
 * @Date: 2020-05-30 20:51:49
 * @Last Modified by: zhangjingsong
 * @Last Modified time: 2020-06-01 11:35:27
 */
<template>
  <div class>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Form",
  componentName: 'Form',
  components: {},
  provide() {
    return {
      form: this
    };
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: Object
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {
    // 注意，放在created是因为FormItem派发事件是在mounted
    this.all = [] // 存放所有FormItem孩子
    this.$on('form.add.formItem', (item) => {
      this.all.push(item)
    })
  },
  mounted() {
  },
  methods: {
    // 验证表单中所有需要验证的
    validate(cb) {
      // 解耦$children第一种方法，递归找到所有FormItem孩子，有性能问题
      // // 存放所有FormItem孩子
      // const newChildren = []
      // // 递归拿到所有FormItem孩子
      // this.getAllChildren(this.$children, newChildren)

      // const all = newChildren
      //   .filter(item => item.prop)
      //   .map(item => item.validate());

      // Promise.all(all)
      //   .then(() => cb(true))
      //   .catch(() => cb(false));

      // 解耦$children第二种方法，参考element-ui，
      // 每当一个FormItem子组件渲染完成后通知并传递给当前组件，当前组件用数组保存起来
      const all = this.all.map(item => item.validate())

      Promise.all(all)
        .then(() => cb(true))
        .catch(() => cb(false));
    },
    // 拿到所有FormItem孩子
    getAllChildren(children, newChildren) {
      children.map(item => {
        let name = item.$options.name
        if(name === 'FormItem') {
          newChildren.push(item)
        }
        if(item.$children.length > 0) {
          this.getAllChildren(item.$children, newChildren)
        }
      })
    }
  }
};
</script>