<template>
  <div class="min-h-screen bg-[#36393f] text-gray-200 p-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Your Chats</h1>
      <button
        @click="createChat"
        class="bg-[#5865f2] text-white px-4 py-2 rounded-md hover:bg-[#4752c4] transition duration-200"
      >
        Create New Chat
      </button>
    </div>
    <div class="space-y-4">
      <div
        v-for="chat in chats"
        :key="chat._id"
        @click="goToChat(chat._id)"
        class="bg-[#40444b] p-4 rounded-md shadow-md hover:cursor-pointer hover:bg-[#4e525a] transition duration-200"
      >
        <h2 class="font-semibold text-lg">{{ chat.chat_name }}</h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const chats = ref([]);
const router = useRouter();

const getChats = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:3000/api/chat", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    const data = await response.json();
    chats.value = data.chats;
  }
};

const goToChat = (chatId: string) => {
  router.push(`/chat/${chatId}`);
};

const createChat = async () => {
  const token = localStorage.getItem("token");
  const chatName = prompt("Enter the name of your new chat:");

  if (chatName) {
    const response = await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ chat_name: chatName }),
    });

    if (response.ok) {
      alert("Chat created successfully!");
      getChats();
    } else {
      alert("Error creating chat");
    }
  }
};

onMounted(getChats);
</script>
