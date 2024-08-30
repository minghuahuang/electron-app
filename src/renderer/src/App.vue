<script setup lang="ts">
import { onBeforeMount, ref } from "vue";

onBeforeMount(() => {
  const dark = ref(localStorage.getItem("dark"));
  const element = document.querySelector("html") as HTMLHtmlElement | null;

  if (element) {
    if (dark.value == "dark") {
      element.className = "dark";
    } else {
      element.className = "";
    }
  }
});
</script>

<template>
  <!-- <div class="drag"></div> -->
  <router-view></router-view>
</template>

<style lang="scss">
@import "./assets/css/style.scss";

/* .drag {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  width: 100%;
  height: 30px;
  background: transparent;
  -webkit-app-region: drag;
} */
</style>
