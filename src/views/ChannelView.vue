<template>
  <div
    class="max-w-md mx-auto p-4 bg-[#36393f] text-gray-200 rounded-lg shadow-md"
  >
    <h2 class="text-lg font-semibold mb-4">Send Message</h2>
    <form @submit.prevent="sendMessage" class="space-y-4">
      <label for="content" class="block text-sm font-medium text-gray-400"
        >Message:</label
      >
      <textarea
        id="content"
        v-model="messageContent"
        required
        class="w-full p-2 bg-[#40444b] border-none rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#5865f2]"
        rows="4"
        placeholder="Type your message..."
      ></textarea>

      <button
        type="submit"
        class="w-full py-2 px-4 bg-[#5865f2] text-white font-medium rounded-lg hover:bg-[#4752c4] transition duration-200"
      >
        Send Message
      </button>
    </form>

    <h2 class="text-lg font-semibold mt-8 mb-4">Messages</h2>
    <div v-if="messages.length" class="space-y-2">
      <ul>
        <li
          v-for="message in messages"
          :key="message._id"
          class="p-3 bg-[#40444b] rounded-lg"
        >
          <strong class="text-gray-100">{{ message.sender.username }}:</strong>
          <span class="text-gray-300">{{ message.content }}</span>
          <span v-if="message.edited" class="text-xs text-gray-400 italic">
            (edited)</span
          >
        </li>
      </ul>
    </div>
    <div v-else>
      <p class="text-gray-400">No messages found.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const chatId = ref(route.params.chatId);
const channelId = ref(route.params.channelId);
const messageContent = ref("");
const messages = ref<any[]>([]);

const fetchMessages = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      `http://localhost:3000/api/chat/${chatId.value}/channel/${channelId.value}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      messages.value = data.messages;
    } else {
      alert("Error fetching messages");
    }
  } catch (error) {
    console.error(error);
    alert("An error occurred while fetching messages");
  }
};

// Send a new message
const sendMessage = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      `http://localhost:3000/api/chat/${chatId.value}/channel/${channelId.value}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: messageContent.value }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      messageContent.value = ""; // Clear the input field
      fetchMessages(); // Re-fetch the messages after sending a new one
    } else {
      alert("Error sending message");
    }
  } catch (error) {
    console.error(error);
    alert("An error occurred while sending the message");
  }
};

// Fetch messages when the component is mounted
onMounted(() => {
  fetchMessages();
});
</script>
