import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'light-text': 'var(--light-text-color)',
                'dark-text': 'var(--dark-text-color)',
            },
        },
    },
    plugins: [typography],
} satisfies Config