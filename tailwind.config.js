//eslint-disable-next-line @typescript-eslint/no-var-requires
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/pages/**/*.{jsx,tsx}', './src/components/**/*.{jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                black: '#121212',
                'optimism-color': '#FF0420',
                custom: {
                    primary: '#09fbd3',
                    primaryContrast: '#000000',
                    secondary: '#4f0990',
                    secondaryContrast: '#ffffff',
                    anchor: '#d191d9',
                },
            },
            fontFamily: {
                primary: ['var(--font-primary)', ...fontFamily.sans],
                secondary: ['var(--font-secondary)', ...fontFamily.sans],
            },
            height: {
                navbar: '72px',
            },
        },
    },
    plugins: [],
};
