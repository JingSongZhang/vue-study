/*
 * @Description: Form组件-仿写element-ui表单组件
 * @Author: zhangjingsong
 * @Date: 2020-05-30 20:51:49
 * @Last Modified by: zhangjingsong
 * @Last Modified time: 2020-05-30 22:03:54
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
    }
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
      const all = this.$children
      .filter(item => item.prop)
      .map(item => item.validate())

      Promise.all(all).then(() => cb(true)).catch(() => cb(false))
    }
  }
};
</script>