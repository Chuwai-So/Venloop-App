/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./src/app/**/*.{js,ts,jsx,tsx}",
        "./src/app/Component/**/*.{js,ts,jsx,tsx}",
        "./src/app/styles/**/*.{css}"
    ],
    theme: {
        extend: {
            fontFamily: {
                header: ['Nunito', 'sans-serif'], // for headings
                body: ['Altone', 'sans-serif'],   // for general text
            },
            colors: {
                brand: {
                    blue: '#1F2A60',
                    orange: '#D86F27',
                    lightblue: '#3C8DC3',
                },
            },
        },
    },
    plugins: [],
};
