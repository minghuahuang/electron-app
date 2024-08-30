<script setup lang="ts">
const ipcHandle = () => window.electron.ipcRenderer.send('ping')
</script>

<template>
  <router-view></router-view>
</template>

<style>
* {
  padding: 0;
  margin: 0;
}

a {
  color: #333;
  text-decoration: none;
}
</style>
