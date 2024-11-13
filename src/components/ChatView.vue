<template>
  <div class="flex flex-col h-full bg-[#36393f] text-white">
    <!-- Channel header -->
    <div class="p-4 bg-[#2f3136] border-b border-[#202225]">
      <h2 class="text-xl font-semibold">Channel {{ channelId }}</h2>
    </div>

    <!-- Messages area -->
    <div class="flex-1 p-4 overflow-y-auto space-y-4">
      <ul>
        <h1 v-if="!messages[0]">No messages. Be the first one!</h1>
        <li
          v-for="message in messages"
          :key="message._id"
          class="flex space-x-3"
        >
          <div class="flex-shrink-0">
            <img
              :src="message.sender.avatarUrl"
              alt="User Avatar"
              class="w-8 h-8 rounded-full"
            />
          </div>
          <div class="flex-1">
            <div class="flex justify-between items-center">
              <span class="font-semibold text-gray-100">{{
                message.sender.username
              }}</span>
              <span class="text-sm text-gray-500">{{
                new Date(message.timestamp).toLocaleString()
              }}</span>
            </div>
            <p class="text-gray-300 mt-1">{{ message.content }}</p>
            <span v-if="message.edited" class="text-xs text-gray-400 italic"
              >(edited)</span
            >
          </div>
        </li>
      </ul>
    </div>

    <!-- Message input area -->
    <div class="p-4 bg-[#2f3136] border-t border-[#202225]">
      <textarea
        v-model="messageContent"
        @keydown.enter.prevent="sendMessage"
        rows="3"
        placeholder="Type a message..."
        class="w-full p-3 bg-[#40444b] text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5865f2]"
      ></textarea>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const groupId = ref(route.params.groupId);
const channelId = ref(route.params.channelId || null); // Default to null if no channelId is provided
const messageContent = ref("");
const messages = ref([]);
const channels = ref([]);

const fetchMessages = async () => {
  const token = localStorage.getItem("token");
  if (!channelId.value) return;

  try {
    const response = await fetch(
      `http://localhost:3000/api/groups/${groupId.value}/${channelId.value}`,
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
    } else if (response.status == 404) {
      messages.value = [];
      console.log("No messages yet.");
    } else {
      alert("Error fetching messages");
    }
  } catch (error) {
    console.error(error);
    alert("An error occurred while fetching messages");
  }
};

const sendMessage = async () => {
  const token = localStorage.getItem("token");

  if (!messageContent.value.trim()) return; // Prevent sending empty messages

  try {
    const response = await fetch(
      `http://localhost:3000/api/groups/${groupId.value}/${channelId.value}`,
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
    } else if (response.status == 404) {
      console.log("No messages yet.");
    } else if (response.status == 500 && !channelId.value) {
      console.log("Waiting");
    } else {
      alert("Error sending message");
    }
  } catch (error) {
    console.error(error);
    alert("An error occurred while sending the message");
  }
};

// Fetch channels when the group changes
const fetchChannels = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(
      `http://localhost:3000/api/groups/${groupId.value}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      channels.value = data.channels;
      if (!channelId.value && channels.value.length > 0) {
        channelId.value = channels.value[0]._id; // Set default channel if none is selected
        router.replace(`/groups/${groupId.value}/${channelId.value}`); // Redirect to default channel
      }
    }
  } catch (error) {
    console.error(error);
  }
};

watch(
  () => [route.params.groupId, route.params.channelId],
  () => {
    groupId.value = route.params.groupId;
    channelId.value = route.params.channelId || null;
    fetchChannels();
    fetchMessages();
  }
);

onMounted(() => {
  fetchChannels();
});
</script>
