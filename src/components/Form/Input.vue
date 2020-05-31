/*
 * @Description: Input组件
 * @Author: zhangjingsong
 * @Date: 2020-05-30 20:59:21
 * @Last Modified by: zhangjingsong
 * @Last Modified time: 2020-05-30 22:03:49
 */
<template>
  <input :type="inputType" @input="onInput" :value="value" v-bind="$attrs" />
</template>

<script>
export default {
    name: 'Input',
    props: {
        inputType: {
            type: String,
            default: 'text'
        },
        value: String
    },
  components:{},
  data(){
    return {
    }
  },
  computed:{},
  watch:{},
  created(){},
  mounted(){},
  methods:{
      onInput(e) {
          this.$emit('input', e.target.value)
          console.log(this.$parent)
          // 触发父组件方法
          this.$parent.$emit('validate')
      }
  },
}
</script>