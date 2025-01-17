const colors = require("tailwindcss/colors");
const themeColors = require("./styles/themeColors");

/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary: themeColors.primary,
                default: themeColors.darkMode,
            },
            padding: {
                default: "1.75rem 1.5rem"
            }
        },
    },
    plugins: [],
};
