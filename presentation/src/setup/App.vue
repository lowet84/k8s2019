<template>
  <div id="app">
    <v-app>
      <v-toolbar dark color="primary">
        <v-btn icon @click="back">
          <v-icon>fas fa-arrow-left</v-icon>
        </v-btn>

        <v-toolbar-title class="white--text">Setup</v-toolbar-title>
      </v-toolbar>
      <v-content>
        <v-container>
          <v-text-field label="Username" v-model="settings.username"></v-text-field>
          <v-text-field label="Host url" v-model="settings.host"></v-text-field>
          <v-btn color="primary" @click="loadkey">{{settings.privateKey?'Replace key':'Load key'}}</v-btn>
          <v-btn v-if="settings.privateKey" color="error" @click="deletekey">Delete key</v-btn>
          <v-subheader>Language</v-subheader>
          <v-radio-group v-model="settings.language">
            <v-radio
              v-for="language in languages"
              :key="language"
              :label="language"
              :value="language"
            ></v-radio>
          </v-radio-group>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-typed'
import { readFileSync } from 'fs'
import { Client } from 'ssh2'
import { settings } from 'cluster'
// @ts-ignore
const { dialog } = window.require('electron').remote
const electronSettings = window
  // @ts-ignore
  .require('electron')
  .remote.require('electron-settings')

@Component()
export default class extends Vue {
  settings: Settings = <Settings>{}
  languages: string[] = ['Swedish', 'English']

  @Watch('settings', true)
  onSettingsChange(newValue: Settings, oldValue: Settings) {
    electronSettings.set('settings', JSON.stringify(newValue))
  }

  back() {
    window.location.href = './slides.html'
  }

  mounted() {
    var json = electronSettings.get('settings')
    if (json) this.settings = JSON.parse(json)
  }

  deletekey() {
    this.settings.privateKey = undefined
  }

  async loadkey() {
    var context = this
    var promise = new Promise<string>((resolve, reject) => {
      function callback(files: string[]) {
        if (files) {
          var key = readFileSync(files[0], 'utf8')
          resolve(key)
        } else {
          reject(new Error('showOpenDialog error.'))
        }
      }

      dialog.showOpenDialog(
        {
          properties: ['openFile'],
          filters: [{ name: 'OpenSSH Private key', extensions: ['*'] }]
        },
        callback
      )
    })

    this.settings.privateKey = await promise
    this.onSettingsChange(this.settings, undefined)
  }
}
</script>

<style lang="css">
#app {
  color: #56b983;
}
</style>
