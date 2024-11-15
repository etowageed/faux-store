/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryCol: "hsl(26, 100%, 55%)",
        primaryColpale: "hsl(25, 100%, 75%)",
        darkBlue: "hsl(220, 13%, 13%)",
        darkGrayishBlue: "hsl(219, 9%, 45%)",
        grayishBlue: "hsl(220, 14%, 75%)",
        lightGrayishBlue: "hsl(223, 64%, 98%)",
        lightBoxBg: "hsl(0, 0%, 0%)",
      },
    },
  },
  plugins: [],
};
