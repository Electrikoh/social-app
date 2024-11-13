<template>
  <div class="p-4 space-y-2 bg-gray-800 border-t border-gray-700">
    <h2 class="text-lg font-semibold text-gray-300">Channels</h2>
    <ul v-if="channels" class="space-y-1">
      <li
        v-for="channel in channels"
        :key="channel.id"
        class="hover:bg-gray-700 rounded-md p-2"
      >
        <RouterLink
          :to="{
            name: 'Channel',
            params: { groupId: groupId, channelId: channel.id },
          }"
          class="text-gray-400 hover:text-white"
        >
          # {{ channel.name }}
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const groupId = computed(() => route.params.groupId);

    // Simulated channel data based on selected group
    const channels = computed(() => {
      return groupId.value
        ? [
            { id: 1, name: "rules" },
            { id: 2, name: "general" },
          ]
        : [];
    });

    return { channels, groupId };
  },
};
</script>
