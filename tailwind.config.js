/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "theme-cyan": "#00d7fb",
            },
            typography: ({ theme }) => ({
                cyan: {
                    css: {
                        "--tw-prose-links": theme("colors.theme-cyan"),
                    },
                },
            }),
        },
        fontFamily: {
            sans: ['"M PLUS 1p"', "sans-serif"],
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
