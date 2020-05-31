/*
 * @Description: Form组件-仿写element-ui表单组件
 * @Author: zhangjingsong
 * @Date: 2020-05-30 20:51:49
 * @Last Modified by: zhangjingsong
 * @Last Modified time: 2020-05-31 17:35:06
 */
<template>
  <div class>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Form",
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
  created() {},
  mounted() {},
  methods: {
    // 验证表单中所有需要验证的
    validate(cb) {
      // 存放所有FormItem孩子
      const newChildren = []
      // 递归拿到所有FormItem孩子
      this.getAllChildren(this.$children, newChildren)

      const all = newChildren
        .filter(item => item.prop)
        .map(item => item.validate());

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