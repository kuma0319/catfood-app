/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/preline/dist/*.js",
  ],
  plugins: [
    ///デザインユーティリティの提供
    require("@tailwindcss/typography"),
    //フォーム要素用のスタイル改善
    require("@tailwindcss/forms"),
    //テキストの省略表示
    require("@tailwindcss/line-clamp"),
    //Prelineのプラグイン用
    require("preline/plugin"),
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
};
