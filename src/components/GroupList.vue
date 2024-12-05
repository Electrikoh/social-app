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
        <button
          @click="openInviteModal(group._id)"
          class="bg-indigo-600 text-white px-2 py-1 rounded-md hover:bg-indigo-500"
        >
          Add
        </button>
      </li>
    </ul>
    <!-- Invite Modal -->
    <div
      v-if="isInviteModalOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 class="text-lg font-semibold text-gray-300 mb-4">
          Invite User to Group
        </h2>
        <form @submit.prevent="inviteUser">
          <div class="mb-4">
            <label
              for="username"
              class="block text-sm font-medium text-gray-400"
            >
              Username:
            </label>
            <input
              type="text"
              v-model="inviteeUsername"
              id="username"
              required
              class="w-full p-2 bg-gray-700 border-none rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter username..."
            />
          </div>
          <div class="flex justify-end space-x-2">
            <button
              type="button"
              @click="closeInviteModal"
              class="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500"
            >
              Invite
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { ref, onMounted } from "vue";

const groups = ref([]);
const isInviteModalOpen = ref(false);
const currentGroupId = ref(null);
const inviteeUsername = ref("");

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

const openInviteModal = (groupId) => {
  currentGroupId.value = groupId;
  isInviteModalOpen.value = true;
};

const closeInviteModal = () => {
  isInviteModalOpen.value = false;
  inviteeUsername.value = "";
};

const inviteUser = async () => {
  const token = localStorage.getItem("token");
  const groupId = currentGroupId.value;

  if (!inviteeUsername.value.trim()) {
    alert("Please enter a valid username.");
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:3000/api/groups/${groupId}/invite`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ invitee: inviteeUsername.value }),
      }
    );

    if (response.ok) {
      alert("User invited successfully!");
      closeInviteModal();
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.error}`);
    }
  } catch (error) {
    console.error("Error inviting user:", error);
    alert("An error occurred while inviting the user.");
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
