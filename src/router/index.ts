import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import ChannelView from "@/views/ChannelView.vue";
import GroupsView from "@/views/GroupsView.vue";
import SingleGroupView from "@/views/SingleGroupView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/groups",
      name: "groups",
      component: GroupsView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/groups/:groupId",
      name: "group-id",
      component: SingleGroupView,
    },
    {
      path: "/groups/:groupId/:channelId",
      name: "channel-id",
      component: ChannelView,
    },
  ],
});

export default router;
