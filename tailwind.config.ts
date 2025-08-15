import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				xs: "375px",
				sm: "420px",
				md: "768px",
				lg: "1024px",
				xl: "1240px",
				"2xl": "1400px",
			},
		},
		extend: {
			fontFamily: {
				Euclid: ["var(--font-EuclidRegular)"],
				ClashGrotex: ["var(--font-ClashGrotesk)"],
				Satoshi_B: ["var(--font-Satoshi_B)"],
			},
			colors: {
				background: "hsl(var(--background))",
				skeleton: "hsl(var(--skeleton))",
				hover1: "hsl(var(--hover1))",
				hover2: "hsl(var(--hover2))",
				text: "hsl(var(--text))",
				muted: "hsl(var(--text-muted))",
				card: {
					DEFAULT: "hsl(var(--card))",
				},
				primary: {
					DEFAULT: "hsl(var(--primary))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
				},
				constructive: {
					DEFAULT: "hsl(var(--constructive))",
				},
				border: "hsl(var(--border))",
			},

			typoraphy: {
				DEFAULT: {
					css: {
						"*": {
							margin: 0,
							padding: 0,
							listStyle: "none",
							boxSizing: "border-box",
							textDecoration: "none",
							fontFamily: "Satoshi",
							color: "inherit",
						},
					},
				},
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
export default config;
