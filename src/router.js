import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("./views/Flex.vue"),
    },
    {
      path: "/flex",
      redirect: "/",
    },
  ],
});

export { router };