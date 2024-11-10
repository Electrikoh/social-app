import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import ChatView from "@/views/ChatView.vue";
import RegisterView from "@/views/RegisterView.vue";
import SingleChatView from "@/views/SingleChatView.vue";
import ChannelView from "@/views/ChannelView.vue";

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
      path: "/chat",
      name: "chat",
      component: ChatView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/chat/:chatId",
      name: "chat-id",
      component: SingleChatView,
    },
    {
      path: "/chat/:chatId/channel/:channelId",
      name: "channel-id",
      component: ChannelView,
    },
  ],
});

export default router;
