/*
 * @Description: Input组件
 * @Author: zhangjingsong
 * @Date: 2020-05-30 20:59:21
 * @Last Modified by: zhangjingsong
 * @Last Modified time: 2020-06-01 11:10:44
 */
<template>
  <input :type="inputType" :value="value" v-bind="$attrs" @input="onInput">
</template>

<script>
import emitter from '@/mixins/emitter.js'
export default {
  name: 'Input',
  components: {},
  mixins: [emitter],
  props: {
    inputType: {
      type: String,
      default: 'text'
    },
    value: String
  },
  data() {
    return {
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onInput(e) {
      this.$emit('input', e.target.value)

      // 第一种向上查找父组件方法
      // let parent = this.$parent || this.$root
      // let name = parent.$options.name
      // // 防止用戶slot嵌套，拿到我想要的parent
      // while(parent && (!name || name !== 'FormItem')) {
      //   parent = parent.$parent
      //   if(parent) {
      //     name = parent.$options.name
      //   }
      // }
      // console.log(name)

      // // 触发父组件方法
      // parent.$emit('validate')

      // 第二种参考element-ui采用混入的方式向上查找父组件方法
      this.dispatch('FormItem', 'validate')
    }
  }
}
</script>
