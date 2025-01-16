import defaultTheme from "tailwindcss/defaultTheme";
const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.vue",
        "./resources/**/*.jsx",
        "./resources/**/*.tsx",
        flowbite.content(),
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                orange: "#F18606",
                gray: "#8B8B8B",
            },
        },
    },
    plugins: [flowbite.plugin()],
};
