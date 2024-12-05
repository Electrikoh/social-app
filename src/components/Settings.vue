<template>
  <div class="p-4 bg-gray-800 text-gray-200 space-y-4">
    <button
      @click="logout"
      class="w-full py-2 px-4 bg-red-600 text-white font-medium rounded-lg hover:bg-red-500 transition duration-200"
    >
      Logout
    </button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const logout = () => {
  localStorage.removeItem("token"); // Clear the token
  router.push("/login"); // Redirect to login page
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>
