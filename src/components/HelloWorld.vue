<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{count}}</h2>
    <div>
      <p v-for="feature in features" :key="feature.id">{{feature.name}}</p>
      <input type="text" placeholder="请输入新特性" @keyup.enter="addFeature">
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
// eslint-disable-next-line no-unused-vars
import { Feature } from '@/types';
// import axios from 'axios';

@Component
export default class HelloWorld extends Vue {

  @Prop() private msg!: string;
  
  features: Feature[] = [{id: 0, name: '注解'}, {id: 1, name:'编译性语言'}]

  addFeature(e: KeyboardEvent) {
    console.log('this==>', this)
    const value = e.target as HTMLInputElement
    const feature: Feature = {
      id: this.features.length + 1,
      name: value.value
    }
    this.features.push(feature)
    value.value = ''
  }

  async created() {
    const resp = await this.$axios.get<Feature[]>('/api/list')
    this.features = resp.data
  }

  get count() {
    return this.features.length
  }
}


// const data = Object.values(new HelloWorld())
// console.log('class1=>', data)
// data.map(item => {
//   console.log(item === undefined)
// })
// console.log('prototype==', HelloWorld.prototype)
// console.log('prototypeName==>', Object.getOwnPropertyNames(HelloWorld.prototype))
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
