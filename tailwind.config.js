/** @type {import('tailwindcss').Config} */
export default {
  content: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  safelist: [
    {
      pattern: /(flex|items|align|justify)/,
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
