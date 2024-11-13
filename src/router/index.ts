import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import MainView from "../views/MainView.vue";
import ChatView from "../components/ChatView.vue";

const routes = [
  { path: "/", name: "Home", component: HomeView },
  { path: "/login", name: "Login", component: LoginView },
  { path: "/register", name: "Register", component: RegisterView },
  {
    path: "/",
    component: MainView,
    children: [
      {
        path: "groups/:groupId", // Shows channels in the selected group
        name: "Group",
        component: ChatView,
        children: [
          {
            path: ":channelId", // Shows selected channel in the chat view
            name: "Channel",
            component: ChatView,
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
