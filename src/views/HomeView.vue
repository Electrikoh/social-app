<template>
  <div
    class="min-h-screen bg-gray-900 flex flex-col justify-center items-center text-center text-white"
  >
    <div class="bg-gray-800 p-8 rounded-xl shadow-xl max-w-3xl w-full">
      <h1 class="text-4xl font-semibold text-gray-100 mb-4">
        Welcome to the Great Messaging App!
      </h1>
      <p class="text-lg text-gray-300 mb-6">
        Your conversations are about to get a whole lot better. Let's connect,
        chat, and have fun!
      </p>

      <div>
        <button
          class="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all"
          @click="navigateToChat"
        >
          Start Chatting
        </button>
      </div>
    </div>

    <footer class="mt-10 text-gray-400">
      <p>© 2024 Great Messaging App | All Rights Reserved</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const navigateToChat = () => {
  router.push("/login");
};
</script>
