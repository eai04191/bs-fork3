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
                "student-red": "#94090f",
                "student-blue": "#1f6095",
                "student-yellow": "#be890a",
                "student-gray": "#171f26",
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
