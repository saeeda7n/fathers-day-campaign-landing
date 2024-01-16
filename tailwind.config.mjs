/** @type {import("tailwindcss").Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px"
      }
    },
    extend: {
      maxWidth: {
        "26r": "26rem"
      },
      rounded: {
        "2r": "2rem"
      },
      fontFamily: {
        kalameh: ["KalamehWeb", "Tahoma", "sens-serif"]
      },
      colors: {
        primary: "#EF3824",
        "cetacean-blue": "#090830"
      }
    }
  },
  plugins: []
};
