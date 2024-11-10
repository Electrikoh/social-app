<template>
  <div
    class="max-w-md mx-auto p-4 bg-[#36393f] text-gray-200 rounded-lg shadow-md"
  >
    <h2 class="text-lg font-semibold mb-4">Create Channel</h2>
    <form @submit.prevent="createChannel" class="space-y-4">
      <div>
        <label
          for="channel_name"
          class="block text-sm font-medium text-gray-400"
          >Channel Name:</label
        >
        <input
          type="text"
          v-model="channel_name"
          id="channel_name"
          required
          class="w-full p-2 bg-[#40444b] border-none rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#5865f2]"
          placeholder="Enter channel name..."
        />
      </div>

      <div>
        <label
          for="channel_type"
          class="block text-sm font-medium text-gray-400"
          >Channel Type:</label
        >
        <select
          v-model="channel_type"
          id="channel_type"
          required
          class="w-full p-2 bg-[#40444b] border-none rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#5865f2]"
        >
          <option value="text">Text</option>
          <option value="voice">Voice</option>
        </select>
      </div>

      <button
        type="submit"
        class="w-full py-2 px-4 bg-[#5865f2] text-white font-medium rounded-lg hover:bg-[#4752c4] transition duration-200"
      >
        Create Channel
      </button>
    </form>

    <h2 class="text-lg font-semibold mt-8 mb-4">Channels</h2>
    <div v-if="channels.length" class="space-y-2">
      <ul>
        <li
          v-for="channel in channels"
          :key="channel._id"
          class="p-2 bg-[#40444b] rounded-lg"
        >
          <a
            :href="`${chatId}/channel/${channel._id}`"
            class="text-[#5865f2] hover:underline"
          >
            {{ channel.channel_name }}
          </a>
        </li>
      </ul>
    </div>
    <div v-else>
      <p class="text-gray-400">No channels found.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const chatId = ref(route.params.chatId);
const channel_name = ref("");
const channel_type = ref("text");
const channels = ref<any[]>([]);

const fetchChannels = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      `http://localhost:3000/api/chat/${chatId.value}/channel`,
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
    } else {
      alert("Error fetching channels");
    }
  } catch (error) {
    console.error(error);
    alert("An error occurred while fetching channels");
  }
};

const createChannel = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      `http://localhost:3000/api/chat/${chatId.value}/channel`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          channel_name: channel_name.value,
          channel_type: channel_type.value,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      alert("Channel created successfully");
      fetchChannels(); // Re-fetch channels after creation
    } else {
      alert("Error creating channel");
    }
  } catch (error) {
    console.error(error);
    alert("An error occurred while creating the channel");
  }
};

onMounted(() => {
  fetchChannels(); // Fetch the channels when the component is mounted
});
</script>
