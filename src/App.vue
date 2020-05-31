<template>
  <div id="app">
    <!-- 仿写 element-ui 表单  -->
    <element-form></element-form>
  </div>
</template>

<script>
import ElementForm from "@/views/ElementForm";
export default {
  name: 'App',
  components: {
    ElementForm
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
