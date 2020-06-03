<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <p>HomePage</p>
    <p @click="$store.commit('add')">{{$store.state.counter}}</p>
    <p @click="$store.dispatch('add', 112)">{{$store.state.counter}}</p>
    <p>{{$store.getters.doubleCounter}}</p>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  },
  mounted() {
    this.$store.state = 4
  }
}
</script>
