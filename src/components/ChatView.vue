<template>
  <div class="flex flex-col h-full bg-gray-700">
    <!-- Channel header -->
    <div class="p-4 bg-gray-800 border-b border-gray-600 text-gray-300">
      <h2 class="text-xl font-semibold">Channel {{ channelId }}</h2>
    </div>

    <!-- Messages area (simulated) -->
    <div class="flex-1 p-4 overflow-y-auto">
      <p class="text-gray-400">This is the chat for Channel {{ channelId }}.</p>
    </div>

    <!-- Message input area -->
    <div class="p-4 bg-gray-800 border-t border-gray-600">
      <input
        type="text"
        placeholder="Send a message"
        class="w-full p-2 rounded-md bg-gray-600 text-gray-300 placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const channelId = computed(() => route.params.channelId);

    return { channelId };
  },
};
</script>
