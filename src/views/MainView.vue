<template>
  <div class="flex h-screen bg-gray-900 text-gray-200">
    <!-- Sidebar with groups and channels -->
    <div class="flex flex-col w-64 bg-gray-800 border-r border-gray-700">
      <GroupList />
      <ChannelList />
      <Settings />
    </div>
    <div class="flex-1">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import GroupList from "../components/GroupList.vue";
import ChannelList from "../components/ChannelList.vue";
import Settings from "../components/Settings.vue";
import { RouterView } from "vue-router";
</script>
