import { createRouter, createWebHashHistory } from "vue-router";
const router = createRouter({
  history: createWebHashHistory(),
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
