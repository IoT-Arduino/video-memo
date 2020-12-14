<template>
  <header class="p-3 mb-2 bg-green-400 text-white">
    <div class="flex justify-between items-center">
      <nuxt-link to="/" class="hover:text-green-800"
        ><h1 class="text-xl font-semibold">Video Memo App</h1></nuxt-link
      >
      <div>{{currentUser}}</div>
    </div>
  </header>
</template>

<script>
export default {
  props:["currentUser"]
};
</script>

<style scoped></style>
