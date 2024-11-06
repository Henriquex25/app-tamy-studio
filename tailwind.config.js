const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary: colors.pink,
                default: {
                    1: "#2a2a2e",
                    2: "#313136",
                    3: "#3a3a40",
                },
            },
        },
    },
    plugins: [],
};
