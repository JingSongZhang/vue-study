/*
 * @Description: 仿写element-ui 表单
 * @Author: zhangjingsong
 * @Date: 2020-05-30 20:47:54
 * @Last Modified by: zhangjingsong
 * @Last Modified time: 2020-05-30 22:04:06
 */
<template>
  <div class>
    <Form :model="userInfo" :rules="rules" ref="form">
      <form-item label="用户名" prop="userName">
          <div><div>
          <Input v-model="userInfo.userName" placeholder="请输入用户名" />
          </div></div>
      </form-item>
      <form-item label="密码" prop="passWord">
        <Input type="password" v-model="userInfo.passWord" placeholder="请输入密码" />
      </form-item>
      <form-item>
        <button @click="login">登陆</button>
      </form-item>
    </Form>
  </div>
</template>

<script>
import Form from "@/components/Form";
import FormItem from "@/components/Form/FormItem";
import Input from "@/components/Form/Input";
export default {
  name: "ElementForm",
  components: { Form, FormItem, Input },
  data() {
    return {
      userInfo: {
        userName: "",
        passWord: ""
      },
      rules: {
        userName: [{required: true, message: '请输入用户名'}],
        passWord: [{required: true, message: '请输入密码'}]
      }
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    login() {
      this.$refs.form.validate(vali => {
        console.log(vali);
      });
    }
  }
};
</script>