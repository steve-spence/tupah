import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default {
    content: ['./src/**/*.{ts,tsx,mdx}', './app/**/*.{ts,tsx,mdx}'],
    theme: {
        extend: {},
    },
    plugins: [typography],
} satisfies Config