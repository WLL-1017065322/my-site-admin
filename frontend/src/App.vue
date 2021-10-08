
<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<template>
  <div class="container">
    <router-view v-slot="{ Component }">
      <Component :is="Component" />
    </router-view>
    <!-- <router-view></router-view> -->
  </div>
</template>

<style lang="less" scoped>
.container {
  width: 1200px;
  min-height: 500px;
  margin: 0 auto;
}
</style>
