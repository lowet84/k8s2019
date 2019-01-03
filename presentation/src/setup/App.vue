<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <button @click="back">Back</button>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App!'
    }
  },
  methods:{
    back(){
       window.location.href='./slides.html'
    }
  }
}
</script>

<style lang="css">
  #app {
    color: #56b983;
  }
</style>