<template>
  <main class="flex justify-center items-center min-h-screen bg-gray-900">
    <div class="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
      <h2 class="text-2xl font-bold text-center text-white mb-6">Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-300"
            >Username</label
          >
          <input
            id="username"
            type="text"
            v-model="username"
            class="w-full p-2 mt-1 border border-gray-600 bg-gray-700 text-white rounded-md"
            placeholder="Enter your username"
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-300"
            >Password</label
          >
          <input
            id="password"
            type="password"
            v-model="password"
            class="w-full p-2 mt-1 border border-gray-600 bg-gray-700 text-white rounded-md"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          class="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";

const username = ref("");
const password = ref("");

const handleLogin = () => {
  // Simple login logic (for demo purposes)
  console.log("Username:", username.value);
  console.log("Password:", password.value);
};
</script>
