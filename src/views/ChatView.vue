<template>
  <div class="flex min-h-screen bg-gray-900 text-white">
    <!-- Sidebar (Left side) -->
    <aside class="w-64 bg-gray-800 p-4 flex flex-col">
      <h2 class="text-xl font-semibold text-gray-100 mb-4">Channels</h2>
      <ul class="flex-1 space-y-2">
        <li v-for="channel in channels" :key="channel.id">
          <button
            class="w-full text-left px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition"
            @click="selectChannel(channel)"
          >
            # {{ channel.name }}
          </button>
        </li>
      </ul>
      <button
        class="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Add Channel
      </button>
    </aside>

    <!-- Chat Area (Right side) -->
    <main class="flex-1 flex flex-col">
      <div class="flex-1 p-6 overflow-auto">
        <div class="mb-4">
          <h3 class="text-2xl font-semibold">{{ selectedChannel.name }}</h3>
        </div>

        <div class="space-y-4">
          <div
            v-for="message in messages"
            :key="message.id"
            class="flex items-start space-x-4"
          >
            <div class="w-8 h-8 bg-gray-600 rounded-full"></div>
            <div>
              <p class="font-semibold">{{ message.user }}</p>
              <p class="text-gray-300">{{ message.content }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Message Input Section -->
      <div class="bg-gray-800 p-4 flex items-center space-x-4">
        <input
          v-model="newMessage"
          class="w-full p-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none"
          placeholder="Type your message..."
        />
        <button
          @click="sendMessage"
          class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Channel {
  id: number;
  name: string;
}

interface Message {
  id: number;
  user: string;
  content: string;
}

const channels = ref<Channel[]>([
  { id: 1, name: "general" },
  { id: 2, name: "tech-talk" },
  { id: 3, name: "gaming" },
]);

const selectedChannel = ref<Channel>(channels.value[0]);
const messages = ref<Message[]>([
  { id: 1, user: "Alice", content: "Hello, everyone!" },
  { id: 2, user: "Bob", content: "How are you all doing?" },
]);

const newMessage = ref("");

const selectChannel = (channel: Channel) => {
  selectedChannel.value = channel;
  // Fetch messages for the selected channel (just simulated here)
  messages.value = [
    { id: 1, user: "Alice", content: `Welcome to ${channel.name}!` },
    { id: 2, user: "Bob", content: "Let’s chat about some cool stuff!" },
  ];
};

const sendMessage = () => {
  if (newMessage.value.trim()) {
    messages.value.push({
      id: messages.value.length + 1,
      user: "You",
      content: newMessage.value,
    });
    newMessage.value = "";
  }
};
</script>
