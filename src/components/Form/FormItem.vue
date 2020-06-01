/*
 * @Description: FormItem组件
 * @Author: zhangjingsong
 * @Date: 2020-05-30 20:57:35
 * @Last Modified by: zhangjingsong
 * @Last Modified time: 2020-06-01 11:23:07
 */
<template>
  <div class>
    <!-- label -->
    <label v-if="label">{{ label }}</label>
    <!-- 子组件Input -->
    <slot />
    <!-- 错误信息 -->
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import schema from 'async-validator'
import emitter from '@/mixins/emitter.js'

export default {
  name: 'FormItem',
  componentName: 'FormItem',
  components: {},
  inject: ['form'],
  mixins: [emitter],
  props: {
    prop: String,
    label: String
  },
  data() {
    return {
      error: ''
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$on('validate', () => {
      this.validate()
    })

    if(this.prop) { // 有指定校验名时才派发事件，将组件实例传递给父级
      this.dispatch('Form', 'form.add.formItem', [this])
    }
  },
  methods: {
    // 校验方法
    validate() {
      if (this.form.rules) {
        // 获取校验数据
        const value = this.form.model[this.prop]
        // 获取校验规则
        const rules = this.form.rules[this.prop]
        // 组装创建校验器所需参数
        const descriptor = {
          [this.prop]: rules
        }
        // 创造校验器
        const validator = new schema(descriptor)
        // 执行校验并返回一个promise
        return validator.validate({ [this.prop]: value }, error => {
          if (error) {
            this.error = error[0].message
          } else {
            this.error = ''
          }
        })
      }
    }
  }
}
</script>
