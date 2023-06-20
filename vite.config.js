import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  console.log(command);
  return {
    plugins: [vue()],
    base: command === "serve" ? "/" : "/quick-css-guide/",
  };
});
