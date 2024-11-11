<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Navbar from './components/navbar/navbar.vue';
import Footer from "./components/footer/footer.vue";
</script>

<template>
  <header>
    <Navbar />
    <div class="pt-20">
      <RouterView />
    </div>

    <Footer />
  </header>
</template>

<style scoped>
</style>
