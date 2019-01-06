<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <button onclick="{window.location.href='./slides.html'}">Back</button>
    <button @click="ssh">SSH</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-typed'
import { readFileSync } from 'fs'
import {Client} from 'ssh2'

@Component()
export default class extends Vue {
  msg = 'some message'

  ssh() {
    var client: Client = window
      // @ts-ignore
      .require('electron')
      .remote.require('./main')
      .getSshClient()
    client
      .on('ready', function() {
        console.log('Client :: ready')
        client.exec('sudo ls /root', function(err, stream) {
          if (err) throw err
          stream
            .on('close', function(code:any, signal:any) {
              console.log(
                'Stream :: close :: code: ' + code + ', signal: ' + signal
              )
              client.end()
            })
            .on('data', function(data:any) {
              console.log('STDOUT: ' + data)
            })
            .stderr.on('data', function(data) {
              console.log('STDERR: ' + data)
            })
        })
      })
      .connect({
        host: 'fredriklowenhamn.com',
        port: 22,
        username: 'fredrik',
        privateKey: require('fs').readFileSync('C:\\Users\\lowet\\Documents\\test.key')
      })
  }
}
</script>

<style lang="css">
#app {
  color: #56b983;
}
</style>
