<template>
  <nav class="fixed w-full top-0 left-0 bg-gradient-to-r from-blue-600 to-teal-500 border-b shadow-lg py-4 z-50">
    <div class="max-w-screen-xl mx-auto px-6 flex justify-between items-center">
      <div class="text-white font-bold flex center gap-2 text-2xl">
        <img src="/icon.svg" width="35px" alt="">
        <span>ChatXE</span>
      </div>
      <div class="space-x-6 text-white flex items-center justify-center">
        <RouterLink
          to="/"
          :class="getActiveClass('/')"
          class="nav-link"
        >
          Home
        </RouterLink>
        <RouterLink
          to="/login"
          :class="getActiveClass('/login')"
          class="nav-link"
        >
          Login
        </RouterLink>
        <RouterLink
          to="/chat"
          :class="getActiveClass('/chat')"
          class="nav-link"
        >
          Chat
        </RouterLink>
      </div>

      <div class="space-x-4 text-white flex items-center">
        <button class="transition-colors duration-300 ease-in-out">
          <font-awesome-icon icon="globe"class="d" /> EN
        </button>
        <button class="transition-colors duration-300 ease-in-out">
          <font-awesome-icon class="d" :icon="['fab', 'twitter']" /> Twitter
        </button>
      </div>

    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const navigateToChat = () => {
  router.push("/chat");
};

const getActiveClass = (path: string) => {
  return route.path === path ? 'active-link' : '';
};
</script>

<style scoped>
.d{
  color:#3b82f6;
}
.nav-link {
  position: relative;
  padding-bottom: 4px; 
}

.nav-link::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px; 
  background-color: #3b82f6;
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

.active-link::after {
  width: 100%;
}
</style>
