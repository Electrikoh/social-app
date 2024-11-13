<template>
  <div class="p-4 space-y-2 bg-gray-800 border-t border-gray-700">
    <h2 class="text-lg font-semibold text-gray-300">Channels</h2>

    <!-- Button to open the "Create Channel" modal -->
    <button
      @click="isModalOpen = true"
      class="mb-4 py-2 px-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-500 transition duration-200"
    >
      Create New Channel
    </button>

    <!-- Modal for "Create Channel" form -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 class="text-lg font-semibold mb-4 text-gray-300">Create Channel</h2>
        <form @submit.prevent="createChannel" class="space-y-4">
          <div>
            <label
              for="channel_name"
              class="block text-sm font-medium text-gray-400"
            >
              Channel Name:
            </label>
            <input
              type="text"
              v-model="channel_name"
              id="channel_name"
              required
              class="w-full p-2 bg-gray-700 border-none rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter channel name..."
            />
          </div>

          <div>
            <label
              for="channel_type"
              class="block text-sm font-medium text-gray-400"
            >
              Channel Type:
            </label>
            <select
              v-model="channel_type"
              id="channel_type"
              required
              class="w-full p-2 bg-gray-700 border-none rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="text">Text</option>
              <option value="voice">Voice</option>
            </select>
          </div>

          <button
            type="submit"
            class="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-500 transition duration-200"
          >
            Create Channel
          </button>
          <button
            @click="isModalOpen = false"
            type="button"
            class="w-full py-2 px-4 mt-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-500 transition duration-200"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>

    <ul v-if="channels" class="space-y-1">
      <li
        v-for="channel in channels"
        :key="channel._id"
        class="hover:bg-gray-700 rounded-md p-2"
      >
        <RouterLink
          :to="`/groups/${groupId}/${channel._id}`"
          class="text-gray-400 hover:text-white"
        >
          # {{ channel.channel_name }}
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();
const groupId = ref(route.params.groupId);
const channels = ref([]);
const isModalOpen = ref(false);
const channel_name = ref("");
const channel_type = ref("text");

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
    }
  } catch (error) {
    console.error(error);
  }
};

const createChannel = async () => {
  const token = localStorage.getItem("token");

  if (!channel_name.value.trim()) return;

  const newChannel = {
    channel_name: channel_name.value,
    channel_type: channel_type.value,
  };

  try {
    const response = await fetch(
      `http://localhost:3000/api/groups/${groupId.value}/channels`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newChannel),
      }
    );

    if (response.ok) {
      fetchChannels();
      channel_name.value = "";
      channel_type.value = "text";
      isModalOpen.value = false;
    }
  } catch (error) {
    console.error(error);
  }
};

watch(
  () => route.params.groupId,
  () => {
    groupId.value = route.params.groupId;
    fetchChannels();
  }
);

onMounted(() => {
  fetchChannels();
});
</script>
