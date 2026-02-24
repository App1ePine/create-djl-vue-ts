<script lang="ts" setup>
import ComponentsView from './index.vue';
</script>

<template>
  <div class="fullscreen">
    <ComponentsView/>
  </div>
</template>


<style>
html, body {
  margin: 0;
  padding: 0;
}

*, *::before, *::after {
  box-sizing: border-box;
}
</style>
<style scoped>
.fullscreen {
  width: 100%;
  height: 100vh;
}
</style>