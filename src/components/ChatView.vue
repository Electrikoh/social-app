<template>
  <div class="flex flex-col h-full bg-[#36393f] text-white">
    <div class="p-4 bg-[#2f3136] border-b border-[#202225]">
      <h2 class="text-xl font-semibold">
        {{ currentChannelName || "Channel" }}
      </h2>
    </div>

    <div class="flex-1 p-4 overflow-y-auto space-y-4">
      <ul>
        <h1 v-if="!messages.length">No messages. Be the first one!</h1>
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
import { ref, watch, onMounted, onBeforeUnmount, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useWebSocket } from "../utils/useWebSocket";

const { connect, disconnect, sendMsg, messages } = useWebSocket();

const route = useRoute();
const router = useRouter();

const groupId = ref(route.params.groupId);
const channelId = ref(route.params.channelId || null);
const messageContent = ref("");
const channels = ref([]);

const currentChannelName = computed(() => {
  const channel = channels.value.find((ch) => ch._id === channelId.value);
  return channel ? channel.name : null;
});

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

  if (!messageContent.value.trim()) return;

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

    sendMsg({ content: messageContent.value });

    if (response.ok) {
      messageContent.value = "";
      fetchMessages();
    } else {
      alert("Error sending message");
    }
  } catch (error) {
    console.error(error);
    alert("An error occurred while sending the message");
  }
};

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
        channelId.value = channels.value[0]._id;
        router.replace(`/groups/${groupId.value}/${channelId.value}`);
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
  connect();
});

onBeforeUnmount(() => {
  disconnect();
});
</script>
