<template>
  <div>
    <h2>Register</h2>
    <input v-model="username" placeholder="Username" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="register">Register</button>
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <p v-if="successMessage">{{ successMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");
const errorMessage = ref("");
const successMessage = ref("");
const router = useRouter();

const register = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      successMessage.value = "Registration successful!";
      errorMessage.value = "";
      setTimeout(() => router.push("/login"), 2000); // Redirect to login after 2 seconds
    } else {
      errorMessage.value = data.error;
      successMessage.value = "";
    }
  } catch (error) {
    errorMessage.value = "An error occurred during registration.";
    successMessage.value = "";
  }
};
</script>
