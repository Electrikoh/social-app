<template>
  <div class="max-w-md mx-auto p-4 bg-gray-100 rounded-md shadow-md">
    <h2 class="text-2xl font-bold mb-4">Login</h2>
    <input
      v-model="username"
      placeholder="Username"
      class="w-full mb-3 p-2 border border-gray-300 rounded-md"
    />
    <input
      v-model="password"
      type="password"
      placeholder="Password"
      class="w-full mb-3 p-2 border border-gray-300 rounded-md"
    />
    <div class="flex items-center mb-4">
      <input
        type="checkbox"
        v-model="rememberMe"
        id="rememberMe"
        class="mr-2"
      />
      <label for="rememberMe" class="text-gray-700">Remember Me</label>
    </div>
    <button
      @click="login"
      class="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
    >
      Login
    </button>
    <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");
const rememberMe = ref(false);
const errorMessage = ref("");
const router = useRouter();

const login = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
        rememberMe: rememberMe.value,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      if (rememberMe.value) {
        localStorage.setItem("token", data.token); // Persistent storage
      } else {
        sessionStorage.setItem("token", data.token); // Temporary storage
      }
      router.push("/groups/1"); // Redirect to the chat page
    } else {
      errorMessage.value = data.error;
    }
  } catch (error) {
    errorMessage.value = "An error occurred during login.";
  }
};
</script>
