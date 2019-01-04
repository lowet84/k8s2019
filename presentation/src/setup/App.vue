<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <button onclick="{window.location.href='./slides.html'}">Back</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-typed'

@Component()
export default class extends Vue {
  msg= 'some message'
}
</script>

<style lang="css">
  #app {
    color: #56b983;
  } 
  
</style>
