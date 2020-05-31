/*
 * @Description: 仿写element-ui 表单
 * @Author: zhangjingsong
 * @Date: 2020-05-30 20:47:54
 * @Last Modified by: zhangjingsong
 * @Last Modified time: 2020-05-31 17:33:20
 */
<template>
  <div class>
    <Form ref="form" :model="userInfo" :rules="rules">
      <Space>
        <Space>
          <form-item label="用户名" prop="userName">
            <Input v-model="userInfo.userName" placeholder="请输入用户名" />
          </form-item>
        </Space>
      </Space>
      <Space>
        <form-item label="密码" prop="passWord">
          <Input v-model="userInfo.passWord" type="password" placeholder="请输入密码" />
        </form-item>
      </Space>
      <form-item label="密码" prop="passWord">
        <Input v-model="userInfo.passWord" type="password" placeholder="请输入密码" />
      </form-item>
      <form-item label="密码" prop="passWord">
        <Input v-model="userInfo.passWord" type="password" placeholder="请输入密码" />
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
import Space from "@/components/Space";
export default {
  name: "ElementForm",
  components: { Form, FormItem, Input, Space },
  data() {
    return {
      userInfo: {
        userName: "",
        passWord: ""
      },
      rules: {
        userName: [{ required: true, message: "请输入用户名" }],
        passWord: [{ required: true, message: "请输入密码" }]
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
        console.log("vali===>", vali);
        if (!vali) {
          this.$notice({
            title: "暗号",
            message: "老杨喊你来搬砖",
            duration: 2000
          }).show();
        }
      });
    }
  }
};
</script>
