<template>
    <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-600 to-blue-500 opacity-40">
      
    </div>
      <div class="relative flex z-10 p-8 rounded-xl gap-40 shadow-l bg-opacity-90 max-w-5xl mx-auto text-center">
        <div class="empty w-1/3">
          <h1></h1>
        </div>
        <div class="mb-8 w-1/3">
          <img src="/icon.svg" alt="App Logo" class="w-20 mx-auto mb-4" />
          <h1 class="text-4xl font-bold mb-2">ChatXE</h1>
          <p class="text-lg text-gray-400">A new era of messaging</p>
        </div>
        
        <div class="flex w-1/3 justify-between items-start mb-8 border-l-4" style="border-color: rgb(18, 125, 178);">
          <div class="text-left text-gray-200 pl-4">
            <h2 class="text-xl font-semibold text-blue-300 mb-4">Recent News</h2>
            <ul class="space-y-2">
              <li><span class="font-semibold">Oct 31</span> - Improved Videos and Much More</li>
              <li><span class="font-semibold">Oct 5</span> - Gifts, Verification Platform and More</li>
              <li><span class="font-semibold">Sep 6</span> - Star Giveaways and More</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="flex justify-center space-x-12">
        <div class="text-center">
          <img src="/Home/2488993.jpg" alt="Android Preview" class="w-60 mx-auto mb-4" />
          <button
            style="background-color: rgb(18, 125, 178);"
            class="px-6 py-3 text-white font-semibold rounded-lg shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:from-green-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            @click="navigateToChat"
          >
            Start Chatting on PC
          </button>
        </div>
        <div class="text-center">
          <img src="/Home/2488993.jpg" alt="iPhone Preview" class="w-60 mx-auto mb-4" />
          <button
          style="background-color: rgb(18, 125, 178);"
            class="px-4 py-2 bg-gradient-to-r from-teal-400 to-blue-500 text-white font-semibold rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
            @click="navigateToChat"
          >
            COMING SOON
          </button>
        </div>
    </div>

</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const navigateToChat = () => {
  router.push("/login");
};
</script>

<style scoped>
body {
  font-family: "Roboto", sans-serif;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)),
    url('/path/to/your-background.png') no-repeat center center fixed;
  background-size: cover;
  animation: gradientMotion 15s ease infinite;
}

@keyframes gradientMotion {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

</style>
