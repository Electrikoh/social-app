<template>
  <div class="min-h-screen bg-[#36393f] text-gray-200 p-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Your Groups</h1>
      <button
        @click="createGroup"
        class="bg-[#5865f2] text-white px-4 py-2 rounded-md hover:bg-[#4752c4] transition duration-200"
      >
        Create New Group
      </button>
    </div>
    <div class="space-y-4">
      <div
        v-for="group in groups"
        :key="group._id"
        @click="goToGroup(group._id)"
        class="bg-[#40444b] p-4 rounded-md shadow-md hover:cursor-pointer hover:bg-[#4e525a] transition duration-200"
      >
        <h2 class="font-semibold text-lg">{{ group.group_name }}</h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const groups = ref([]);
const router = useRouter();

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

const goToGroup = (groupId: string) => {
  router.push(`/groups/${groupId}`);
};

const createGroup = async () => {
  const token = localStorage.getItem("token");
  const groupName = prompt("Enter the name of your new group:");

  if (groupName) {
    const response = await fetch("http://localhost:3000/api/groups", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ group_name: groupName }),
    });

    if (response.ok) {
      alert("Group created successfully!");
      getGroups();
    } else {
      alert("Error creating group");
    }
  }
};

onMounted(getGroups);
</script>
