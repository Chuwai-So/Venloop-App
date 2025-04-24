// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {colors: {
                alleBlue: '#003b6f',
                alleOrange: '#d93f00',
                alleLightBlue: '#3498db',
            },
        },
    },
    plugins: [require("tailwind-scrollbar"), require('tailwind-scrollbar-hide')
    ],

};
