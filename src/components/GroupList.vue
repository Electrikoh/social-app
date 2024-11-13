<template>
  <div class="p-4 space-y-2 bg-gray-800">
    <h2 class="text-lg font-semibold text-gray-300">Groups</h2>
    <ul class="space-y-1">
      <li
        v-for="group in groups"
        :key="group._id"
        class="hover:bg-gray-700 rounded-md p-2"
      >
        <RouterLink
          :to="{ name: 'Group', params: { groupId: group._id } }"
          class="text-gray-400 hover:text-white"
        >
          {{ group.group_name }}
        </RouterLink>
      </li>
    </ul>
    <button
      @click="createGroup"
      class="bg-[#5865f2] text-white px-4 py-2 rounded-md hover:bg-[#4752c4] transition duration-200"
    >
      Create New Group
    </button>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { ref, onMounted } from "vue";

const groups = ref([]);

const getGroups = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:3000/api/groups", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    const data = await response.json();
    groups.value = data.groups;
  }
};

const createGroup = async () => {
  const token = localStorage.getItem("token");
  const groupName = prompt("Enter the name of your new group:");

  if (groupName) {
    const response = await fetch("http://localhost:3000/api/groups/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ group_name: groupName }),
    });

    if (response.ok) {
      alert("Group created successfully!");
      getGroups(); // Refresh group list
    } else {
      alert("Error creating group");
    }
  }
};

onMounted(getGroups);
</script>
