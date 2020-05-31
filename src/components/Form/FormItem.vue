/*
 * @Description: FormItem组件
 * @Author: zhangjingsong
 * @Date: 2020-05-30 20:57:35
 * @Last Modified by: zhangjingsong
 * @Last Modified time: 2020-05-30 22:03:59
 */
<template>
  <div class>
    <!-- label -->
    <label v-if="label">{{label}}</label>
    <!-- 子组件Input -->
    <slot></slot>
    <!-- 错误信息 -->
    <p v-if="error">{{error}}</p>
  </div>
</template>

<script>
import schema  from "async-validator";
export default {
  name: "FormItem",
  components: {},
  inject: ["form"],
  props: {
    prop: String,
    label: String
  },
  data() {
    return {
      error: ""
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$on("validate", () => {
      this.validate();
    });
  },
  methods: {
    // 校验方法
    validate() {
      if (this.form.rules) {
        const value = this.form.model[this.prop];
        const rules = this.form.rules[this.prop];

        const descriptor = {
          [this.prop]: rules
        };

        const validator = new schema(descriptor);

        validator.validate({ [this.prop]: value }, error => {
          if (error) {
            this.error = error[0].message;
          } else {
            this.error = "";
          }
        });
      }
    }
  }
};
</script>